chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "save_code") {
        console.log("📥 코드 저장됨:", message.code);
        uploadToGitHub(message.code);
    }

    if (message.action === "manual_upload") {
        console.log("🔘 [버튼 클릭] GitHub 업로드 실행!");
        uploadToGitHub("테스트 코드입니다!");
    }
});

async function uploadToGitHub(code) {
    try {
        const response = await fetch(chrome.runtime.getURL("config.json"));
        const config = await response.json();

        const GITHUB_TOKEN = config.github_token;
        const REPO = config.repo;
        const filename = `코딩테스트_${new Date().toISOString()}.js`;

        const apiUrl = `https://api.github.com/repos/${REPO}/contents/${filename}`;
        console.log("📌 GitHub 업로드 URL:", apiUrl);

        const uploadResponse = await fetch(apiUrl, {
            method: "PUT",
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: "프로그래머스 문제 풀이 자동 업로드",
                content: btoa(unescape(encodeURIComponent(code))) // Base64 인코딩
            })
        });

        const responseData = await uploadResponse.json();
        if (uploadResponse.ok) {
            console.log("✅ GitHub에 코드 업로드 성공!", responseData);
        } else {
            console.error("❌ GitHub 업로드 실패:", responseData);
        }
    } catch (error) {
        console.error("🚨 오류 발생:", error);
    }
}
