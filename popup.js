document.getElementById("upload").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "manual_upload" });
    alert("GitHub 업로드를 실행합니다!");
});
