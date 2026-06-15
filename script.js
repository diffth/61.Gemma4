/**
 * ⚙️ 코다리: JavaScript 로직 (API 연동 및 사용자 경험 관리)
 * 이 스크립트는 랜딩페이지의 핵심 기능인 'WTP 측정'을 시뮬레이션합니다.
 */

// DOM 요소 선택
const form = document.getElementById('wtp-calculator-form');
const problemStatementInput = document.getElementById('problem-statement');
const calculateButton = document.getElementById('calculate-btn');
const resultMessageDiv = document.getElementById('result-message');

/**
 * 🔒 API 호출을 시뮬레이션하는 함수 (플레이스홀더)
 * @param {string} problemStatement - 사용자가 입력한 문제점 문장
 */
async function calculateWTP(problemStatement) {
    // UI 상태 업데이트: 로딩 중임을 표시하고 버튼 비활성화
    calculateButton.disabled = true;
    calculateButton.textContent = '⚙️ 분석 중... 잠시만 기다려 주세요.';
    resultMessageDiv.innerHTML = '';
    resultMessageDiv.className = 'mt-30 p-2 text-center';
    resultMessageDiv.style.backgroundColor = '#1e3a6f'; // Loading background

    console.log(`[API CALL] Attempting to calculate WTP for: "${problemStatement}"`);

    // -----------------------------------------------------------
    // !!! [🚨 핵심 플레이스홀더 구간 - 실제 API 엔드포인트가 들어갈 곳입니다] !!!
    // -----------------------------------------------------------
    const apiEndpoint = '/api/v1/wtp_calculator'; // 가상의 백엔드 게이트웨이 주소

    try {
        // 실제 환경에서는 아래 fetch를 사용합니다.
        /*
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 인증 토큰 등이 필요하다면 여기에 추가
            },
            body: JSON.stringify({ problem: problemStatement })
        });

        if (!response.ok) {
             throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data; // API가 반환할 예상 데이터 구조 (예: {score: 85, recommendation: '...'})
        */

        // 현재는 시뮬레이션된 성공 응답을 사용합니다. (실제 서버 필요)
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2초 지연 효과
        return {
            success: true,
            score: Math.floor(Math.random() * 40) + 60, // 임의의 점수 생성 (60~100)
            recommendation: `고객은 [${problemStatement}...] 해결을 위해 '지속 가능한 시스템 구축'에 높은 지불 의사를 보입니다.`,
            cta_message: "지금 바로 전담 컨설팅을 신청하세요."
        };

    } catch (error) {
        console.error("WTP 계산 실패:", error);
        throw new Error(`API 통신 중 오류가 발생했습니다. (${error.message})`);
    } finally {
        // 로딩 완료 후 버튼 복구
        calculateButton.disabled = false;
        calculateButton.textContent = '✅ WTP 측정 리포트 받기 (무료)';
    }
}

/**
 * 🚀 이벤트 핸들러: 폼 제출 처리
 */
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // 기본 폼 제출 동작 막기

    const problemStatement = problemStatementInput.value.trim();
    if (!problemStatement) return;

    try {
        // API 호출 및 결과 수신
        const result = await calculateWTP(problemStatement);

        // 성공적인 데이터 처리 (UI 업데이트)
        resultMessageDiv.innerHTML = `
            <h3 class="text-red-400 mb-2">✅ 분석 완료: 당신의 WTP 점수는 ${result.score}점입니다!</h3>
            <p>${result.recommendation}</p>
            <a href="#" class="cta-button mt-30">${result.cta_message}</a>
        `;
        resultMessageDiv.style.backgroundColor = '#1e462c'; // Success background

    } catch (error) {
        // 실패 메시지 처리 (UI 업데이트)
        resultMessageDiv.innerHTML = `
            <h3 class="text-red-500 mb-2">❌ 분석에 실패했습니다.</h3>
            <p>${error.message}</p>
        `;
        resultMessageDiv.style.backgroundColor = '#4d1c1b'; // Error background
    }
});

// 초기화 시 숨겨진 메시지 영역 설정
document.addEventListener('DOMContentLoaded', () => {
    resultMessageDiv.classList.add('hidden');
});
</script>