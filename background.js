chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "save_code") {
        console.log("코드 저장됨:", message.code);
        uploadToGitHub(message.code);
    }
});

async function uploadToGitHub(code) {
    const repo = "사용자명/레포지토리명";
    const filename = `코딩테스트_${new Date().toISOString()}.js`;
    const token = "YOUR_GITHUB_PERSONAL_ACCESS_TOKEN";

    const response = await fetch(`https://api.github.com/repos/${repo}/contents/${filename}`, {
        method: "PUT",
        headers: {
            Authorization: `token ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: "프로그래머스 문제 풀이 자동 업로드",
            content: btoa(unescape(encodeURIComponent(code))) // Base64 인코딩
        })
    });

    if (response.ok) {
        console.log("✅ GitHub에 코드 업로드 성공!");
    } else {
        console.error("❌ GitHub 업로드 실패:", await response.json());
    }
}
