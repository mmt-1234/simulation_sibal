// 투두리스트 추가 기능
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
