// 보안: config.json에서 정보 가져오기
fetch(chrome.runtime.getURL("config.json"))
    .then(response => response.json())
    .then(config => {
        const GITHUB_TOKEN = config.github_token;
        const REPO = config.repo;

        async function uploadToGitHub(code) {
            const filename = `코딩테스트_${new Date().toISOString()}.js`;
            const response = await fetch(`https://api.github.com/repos/${REPO}/contents/${filename}`, {
                method: "PUT",
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: "프로그래머스 문제 풀이 자동 업로드",
                    content: btoa(unescape(encodeURIComponent(code)))
                })
            });

            if (response.ok) {
                console.log("✅ GitHub에 코드 업로드 성공!");
            } else {
                console.error("❌ GitHub 업로드 실패:", await response.json());
            }
        }
    });
