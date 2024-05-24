function handleButtonClick() {
    const textInput = document.getElementById('textInput').value;
    const fileInput = document.getElementById('fileInput').files[0];
    const result = document.getElementById('result');

    if (textInput && fileInput) {
        // Example function to demonstrate processing
        const reader = new FileReader();
        reader.onload = function(e) {
            const fileContent = e.target.result;
            result.textContent = `Text: ${textInput}, File Content: ${fileContent.slice(0, 100)}...`;
        };
        reader.readAsText(fileInput);
    } else {
        result.textContent = 'Please enter text and select a file.';
    }
}
