// 투두리스트 추가 기능

const searchConsole = document.getElementById("todo-input");

// ----- 현재 브라우저에서 API 사용이 유효한가를 검증
function availabilityFunc() {
    //현재 SpeechRecognition을 지원하는 크롬 버전과 webkit 형태로 제공되는 버전이 있으므로 둘 중 해당하는 생성자를 호출한다.
    recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.lang = "ko"; // 음성인식에 사용되고 반환될 언어를 설정한다.
    recognition.maxAlternatives = 5; //음성 인식결과를 5개 까지 보여준다.

    if (!recognition) {
        alert("현재 브라우저는 사용이 불가능합니다.");
    }
}

// --- 음성녹음을 실행하는 함수
function startRecord() {
    console.log("시작");

    // ⏺️클릭 시 음성인식을 시작한다.
    recognition.addEventListener("speechstart", () => {
        console.log("인식");
    });

    //음성인식이 끝까지 이루어지면 중단된다.
    recognition.addEventListener("speechend", () => {
        console.log("인식2");
    });

    //음성인식 결과를 반환
    // SpeechRecognitionResult 에 담겨서 반환된다.
    recognition.addEventListener("result", (e) => {
        searchConsole.value = e.results[0][0].transcript;
    });

    recognition.start();
}
//  🛑 클릭 시 종료(안 눌러도 음성인식은 알아서 종료됨)
function endRecord() {
    console.log("종료");
    recognition.stop(); // 음성인식을 중단하고 중단까지의 결과를 반환
}

window.addEventListener("load", availabilityFunc);

document.getElementById('add-todo-btn').addEventListener('click', function() {
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value.trim();
    if (todoText) {
        const todoItem = document.createElement('li');
        todoItem.innerHTML = `${todoText} <button class="delete-btn">삭제</button>`;
        
        // 삭제 버튼 기능 추가
        todoItem.querySelector('.delete-btn').addEventListener('click', function() {
            todoItem.remove();
        });
        
        document.getElementById('todo-items').appendChild(todoItem);
        todoInput.value = '';
    }
});

// 캘린더는 간단한 스타일만 적용, 실제 캘린더 기능 추가 필요
document.getElementById('add-event-btn').addEventListener('click', function() {
    alert('이벤트 추가 기능은 아직 구현되지 않았습니다.');
});
