var calendar;

document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');

    calendar = new FullCalendar.Calendar(calendarEl, {
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
            var title = prompt('이벤트 제목을 입력하세요:');
            if (title) {
                calendar.addEvent({
                    title: title,
                    start: info.dateStr,  // 클릭한 날짜를 이벤트의 시작 날짜로 설정
                    allDay: true
                });
            }
        },
        eventClick: function (info) {  // 이벤트 클릭 시 처리
            var id = info.event._def.defId; ////클릭한 일정 Id
            calendar.getEvents().forEach(function (evt) {
                if (evt._def.defId == id) evt.remove();
            });
        }
    });

    calendar.render();  // 캘린더 렌더링
});
