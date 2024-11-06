document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',  // 초기 달력 보기 설정
        headerToolbar: {  // 상단의 도구 모음 설정
            left: 'prev,next today',  // 이전, 다음, 오늘 버튼
            center: 'title',  // 제목
            right: 'dayGridMonth,dayGridWeek,dayGridDay'  // 월, 주, 일 보기
        },
        events: [  // 캘린더에 표시될 이벤트들
            {
                title: '회의',
                start: '2024-11-10T10:00:00',
                description: '팀 회의'
            },
            {
                title: '마감일',
                start: '2024-11-12',
                description: '보고서 제출'
            }
        ],
        dateClick: function (info) {  // 날짜 클릭 시 이벤트 처리
            alert('날짜를 클릭했습니다: ' + info.dateStr);
        },
        eventClick: function (info) {  // 이벤트 클릭 시 처리
            alert('이벤트를 클릭했습니다: ' + info.event.title);
        }
    });

    calendar.render();  // 캘린더 렌더링
});