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

function makeTodo(text){
    const todoInput = document.getElementById('todo-input');
    if (text) {
        const todoItem = document.createElement('li');
        todoItem.innerHTML = `${text} <button class="delete-btn">삭제</button>`;

        // 삭제 버튼 기능 추가
        todoItem.querySelector('.delete-btn').addEventListener('click', function () {
            todoItem.remove();
        });

        document.getElementById('todo-items').appendChild(todoItem);
    }
}

// 일정 추가 함수 정의
function addEventToCalendar(title, month, date) {
    var year = 2024
    if (month < 11) {
        year = 2025;
    }

    if (calendar) {  // calendar 인스턴스가 존재하는지 확인
        calendar.addEvent({
            title: title,
            start: String(year) + '-' + String(month).padStart(2, '0') + '-' + String(date).padStart(2, '0'),
            allDay: true
        });
    } else {
        console.error('캘린더 인스턴스가 초기화되지 않았습니다.');
    }
}



function parseDateAndTask(text) {
    // 정규 표현식을 사용하여 월, 일, 작업을 추출
    const monthPattern = /(\d{1,2})\s*월/;  // 숫자와 "월"이 붙어있는 패턴
    const dayPattern = /(\d{1,2})\s*일/;    // 숫자와 "일"이 붙어있는 패턴

    // 월과 일을 추출
    const monthMatch = text.match(monthPattern);
    const dayMatch = text.match(dayPattern);

    // '월' 앞의 숫자 추출 (없으면 null)
    const month = monthMatch ? parseInt(monthMatch[1], 10) : null;

    // '일' 앞의 숫자 추출 (없으면 null)
    const day = dayMatch ? parseInt(dayMatch[1], 10) : null;

    // 월과 일 이후의 문자열을 "하는일"로 추출
    const taskPattern = /(?:\d{1,2}\s*월)?\s*(?:\d{1,2}\s*일)?\s*(.+)/;
    const taskMatch = text.match(taskPattern);
    const task = taskMatch ? taskMatch[1].trim() : null;

    return { month, day, task };
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
        if (transcript === '') {
            return;
        }
        else {
            console.log('doing')
            var x = parseDateAndTask(transcript);
            var m = x['month'];
            var d = x['day'];
            var text = x['task'];
            console.log(m, d, text);
            if (m != null && d != null) {
                addEventToCalendar(text, m, d);
            }
            else {
                searchConsole.value = transcript;
            }
        }
    });

    //음성인식 결과를 반환
    // SpeechRecognitionResult 에 담겨서 반환된다.
    var transcript = ''
    recognition.addEventListener("result", (e) => {
        transcript = e.results[0][0].transcript;
        console.log(transcript);
    });
    recognition.start();
}
//  🛑 클릭 시 종료(안 눌러도 음성인식은 알아서 종료됨)
function endRecord() {
    console.log("종료");
    recognition.stop(); // 음성인식을 중단하고 중단까지의 결과를 반환

}

window.addEventListener("load", availabilityFunc);

document.getElementById('add-todo-btn').addEventListener('click', function () {
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value.trim();
    makeTodo(todoText);
    todoInput.value='';
});

// 캘린더는 간단한 스타일만 적용, 실제 캘린더 기능 추가 필요
document.getElementById('add-event-btn').addEventListener('click', function () {
    alert('이벤트 추가 기능은 아직 구현되지 않았습니다.');
});
