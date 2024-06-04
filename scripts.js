function handleEncryptionButtonClick() {
    const key1 = document.getElementById('keyInput').value;
    const key2 = document.getElementById('keyInput2').value;
    const fileInput = document.getElementById('fileInput').files[0];
    const result = document.getElementById('result');

    if (key1 && key2 && fileInput) {
        if (key1 === key2) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const fileContent = event.target.result;
                const wordArray = CryptoJS.lib.WordArray.create(fileContent);
                const encrypted = CryptoJS.AES.encrypt(wordArray, key1, { iv:'1234' });

                const blob = new Blob([encrypted], { type: 'text/plain' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `${fileInput.name}.enc`;
                link.click();

                result.textContent = 'File encrypted successfully and downloaded.';
            };
            reader.readAsArrayBuffer(fileInput);
        } else {
            result.textContent = 'The keys do not match.';
        }
    } else {
        result.textContent = 'Please enter both keys and select a file.';
    }
}

function handleDecryptionButtonClick() {
    const key1 = document.getElementById('keyInput').value;
    const key2 = document.getElementById('keyInput2').value;
    const fileInput = document.getElementById('fileInput').files[0];
    const result = document.getElementById('result');

    if (key1 && key2 && fileInput) {
        if (key1 === key2) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const encryptedContent = event.target.result;
                const encryptedString = new TextDecoder().decode(encryptedContent);
                const decrypted = CryptoJS.AES.decrypt(encryptedString, key1, { iv:'1234' });
                const decryptedWords = decrypted.toString(CryptoJS.enc.Utf8);
                if (decryptedWords==''){
                    result.textContent = 'Key Error.';
                } else {
                    // Convert decrypted string back to ArrayBuffer for file download
                    const decryptedBuffer = new TextEncoder().encode(decryptedWords);

                    const blob = new Blob([decryptedBuffer], { type: 'application/octet-stream' });
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = `${fileInput.name.replace('.enc', '')}`;
                    link.click();

                    result.textContent = 'File decrypted successfully and downloaded.';
                }
            };
            reader.readAsArrayBuffer(fileInput);
        } else {
            result.textContent = 'The keys do not match.';
        }
    } else {
        result.textContent = 'Please enter both keys and select a file.';
    }
}
