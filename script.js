// script.js
const menu = document.getElementById('menu');
const content = document.getElementById('content');
const details = document.getElementById('details');
const detailsTitle = document.getElementById('detailsTitle');
const detailsDescription = document.getElementById('detailsDescription');
const backButton = document.getElementById('backButton');
const title = document.getElementById('title');

// 최상위 메뉴 항목
const mainMenu = `
    <button onclick="showSubMenu('bootIssue')">1. 부팅 불가</button>
    <button onclick="showSubMenu('displayIssue')">2. 화면 이상(떨림, 깨짐 등)</button>
    <button onclick="showSubMenu('inputDeviceIssue')">3. 키보드, 마우스 작동 이상</button>
`;

// 하위 메뉴 데이터
const subMenus = {
    bootIssue: {
        title: "부팅 불가",
        options: [
            {
                text: "전원 버튼 눌러도 반응 없음",
                description: [
                    "메인보드에 꽂힌 파워 케이블을 모두 재연결 한 후 부팅을 시도해보세요.",
                    "메인보드에 꽂힌 파워 케이블을 모두 분리 후 24핀 커넥터를 가위 등으로 쇼트 시켜 보세요.",
                    `<iframe 
                        src="https://www.youtube.com/embed/WG0IU4TIu38" 
                        width="560" 
                        height="315" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                     </iframe>`,
                    "쇼트 시 파워가 켜진다면 메인보드 문제일 가능성이 높습니다.",
                    "쇼트 시 파워가 켜지지 않는다면 파워 문제일 가능성이 높습니다."
                ]
            },
            {
                text: "제조사 로고에서 멈춤 (로딩 아이콘 없음)",
                description: [
                    "키보드 마우스를 포함해 USB로 연결되어 있는 모든 장치를 분리한 후 부팅을 시도해보세요.",
                    "부팅이 된다면 키보드 마우스부터 하나씩 연결해보며 어떤 장치에서 문제가 생기는지 파악할 수 있습니다.",
                    "부팅이 되지 않는다면 CMOS 클리어를 시도해야 할 수 있습니다."
                ]
            },
            {
                text: "무한 재부팅",
                description: [
                    "전원을 완전히 차단한 후 설치된 RAM을 모두 분리 하세요.",
                    "RAM의 접점 부분을 마른 천으로 닦아주세요.",
                    "RAM을 다시 설치한 후 부팅을 시도 해보세요.",
                    "동일한 증상이라면 다른 슬롯에 RAM을 설치 해보세요.",
                    "RAM이 여러개라면 한개씩 교차로 테스트 해보세요."
                ]
            }
        ]
    }
};

// 최상위 메뉴 표시
function showMainMenu() {
    title.textContent = "장애 유형을 선택해주세요";
    menu.innerHTML = mainMenu;
    details.style.display = 'none'; // 상세 설명 숨기기
    backButton.style.display = 'none'; // 뒤로가기 버튼 숨기기
}

// 하위 메뉴 표시
function showSubMenu(key) {
    const subMenu = subMenus[key];
    if (subMenu) {
        title.textContent = subMenu.title; // 제목 업데이트
        menu.innerHTML = ''; // 기존 메뉴 숨김
        subMenu.options.forEach(option => {
            const btn = document.createElement('button');
            btn.textContent = option.text;
            btn.addEventListener('click', () => showDetails(option.text, option.description)); // 이벤트 리스너 사용
            menu.appendChild(btn);
        });
        backButton.style.display = 'block'; // 뒤로가기 버튼 표시
    }
}


// 상세 설명 표시
function showDetails(title, descriptionArray) {
    details.style.display = 'block';
    detailsTitle.textContent = title;
    detailsDescription.innerHTML = ""; // 기존 내용 초기화

    descriptionArray.forEach(item => {
        const paragraph = document.createElement('p');
        
        // 링크가 포함된 텍스트 처리
        const urlPattern = /https?:\/\/[^\s]+/g;
        const parts = item.split(urlPattern); // 링크를 제외한 텍스트 분리
        const urls = item.match(urlPattern); // 텍스트 안의 링크만 추출

        // 링크가 있을 경우
        if (urls) {
            parts.forEach((part, index) => {
                paragraph.textContent += part; // 링크 이전의 텍스트
                if (urls[index]) {
                    const link = document.createElement('a');
                    link.href = urls[index];
                    link.target = '_blank'; // 새 탭에서 링크 열기
                    link.textContent = urls[index]; // 링크 텍스트
                    paragraph.appendChild(link); // 링크 추가
                }
            });
        } else {
            paragraph.textContent = item; // 그냥 텍스트
        }

        detailsDescription.appendChild(paragraph);
    });
}

const container = document.createElement("div");

subMenus.bootIssue.options.forEach(option => {
    const title = document.createElement("h3");
    title.textContent = option.text;
    container.appendChild(title);

    option.description.forEach(desc => {
        const wrapper = document.createElement("div");

        if (desc.startsWith("<iframe")) {
            // HTML로 직접 삽입
            wrapper.innerHTML = desc;
        } else {
            const paragraph = document.createElement("p");
            paragraph.textContent = desc;
            wrapper.appendChild(paragraph);
        }

        container.appendChild(wrapper);
    });
});

document.body.appendChild(container);
