// Get the textarea element
const textarea = document.getElementById('chat-input-textbox');

// Check if the textarea element exists
if (textarea) {
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
