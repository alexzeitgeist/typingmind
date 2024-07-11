document.addEventListener('DOMContentLoaded', () => {
    // Function to override focus
    function overrideFocus(textarea) {
        if (textarea && !textarea.dataset.focusOverridden) {
            // Mark this textarea as having its focus overridden
            textarea.dataset.focusOverridden = true;

            // Store the original focus method
            const originalFocus = textarea.focus;

            // Override the focus method
            textarea.focus = function() {
                console.log('Focus attempt intercepted.');
                // Add your condition here to allow or prevent focus
                const shouldAllowFocus = false; // Change this condition as needed

                if (shouldAllowFocus) {
                    // Call the original focus method if condition allows
                    originalFocus.call(textarea);
                }
            };

            // Optionally blur the textarea initially to ensure it doesn't have focus
            textarea.blur();
        }
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
            }
        }
    });

    // Start observing the document for added nodes
    observer.observe(document.body, { childList: true, subtree: true });
});
