document.addEventListener('DOMContentLoaded', () => {
    // Function to override focus
    function overrideFocus(textarea) {
        textarea.removeAttribute('autofocus');
        textarea.autofocus = false;
    }

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Check if node is an element
                        const textarea = node.querySelector('#chat-input-textbox') || (node.id === 'chat-input-textbox' ? node : null);
                        if (textarea) {
                            overrideFocus(textarea);
                        }
                    }
                });
            } else if (mutation.type === 'attributes' && mutation.target.id === 'chat-input-textbox') {
                overrideFocus(mutation.target);
            }
        }
    });

    // Start observing the document for added nodes and attribute changes
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['autofocus'] });

    // Check if the element already exists in the DOM
    const existingTextarea = document.getElementById('chat-input-textbox');
    if (existingTextarea) {
        overrideFocus(existingTextarea);
    }
});
