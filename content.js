// content.js

function extractCode() {
    const codeBlock = document.querySelector(".ace_content");
    if (codeBlock) {
        return codeBlock.innerText;
    }
    return null;
}

function detectSuccess() {
    const successMessage = document.querySelector(".success-message");
    if (successMessage) {
        const extractedCode = extractCode();
        if (extractedCode) {
            chrome.runtime.sendMessage({ action: "save_code", code: extractedCode });
        }
    }
}

// 페이지 변화 감지
const observer = new MutationObserver(detectSuccess);
observer.observe(document.body, { childList: true, subtree: true });
