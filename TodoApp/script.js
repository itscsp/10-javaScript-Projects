const form = document.getElementById('form');

const input = document.getElementById('input');

const todosUI = document.getElementById('todo');

const todos = JSON.parse(localStorage.getItem('todos'))


if(todos){
    todos.forEach(todo => {
        addTodo(todo)
    })
}


form.addEventListener('submit', (e) =>{
    e.preventDefault();

    addTodo();

});


function addTodo(todo){

    let todoText = input.value;

    if(todo){
        todoText = todo.text;
    }

    if(todoText){
        const todoEl = document.createElement('li');

        if(todo && todo.completed){
            todoEl.classList.add('completed');
        }

        todoEl.innerText = todoText;
        todosUI.appendChild(todoEl);

        todoEl.addEventListener("click", () => {
            todoEl.classList.toggle("completed");
            updateLS();
        })

        todoEl.addEventListener("contextmenu", (e) => {
            e.preventDefault();

            todoEl.remove();
            updateLS();
        })

        updateLS();

        input.value = '';

    }
}

function updateLS(){
    const todosEL = document.querySelectorAll('li');

    const todos = [];

    todosEL.forEach((todoEl) => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains("completed"),
        });
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}