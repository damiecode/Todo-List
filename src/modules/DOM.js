import * as LocalStorage from './localstorage';

const main = document.getElementById('main');

const todo = (project) => {
  const container = document.createElement('form');
  container.classList.add('todoForm');
  container.style.display = 'none';

  const button = document.createElement('button');
  button.classList.add('todoButton', 'btn', 'btn-primary', 'text-center');
  button.innerText = 'Add Todo';
  button.addEventListener('click', () => {
    const container = document.querySelector('.todoForm');
    container.style.display = 'block';
    const button = document.querySelector('.todotButton');
    button.style.display = 'none';
  });

  const title = document.createElement('input');
  title.classList.add('form-control');
  title.id = 'todo-title';
  title.name = 'title';
  title.value = '';
  title.type = 'text';

  const titlelabel = document.createElement('label');
  titlelabel.for = 'title';
  titlelabel.innerText = 'Name';

  const description = document.createElement('textarea');
  description.classList.add('form-control');
  description.id = 'todo-description';
  description.name = 'description';
  description.value = '';

  const descriptionlabel = document.createElement('label');
  descriptionlabel.for = 'description';
  descriptionlabel.innerText = 'Description';

  const dueDate = document.createElement('input');
  dueDate.classList.add('form-control', 'bg-primary');
  dueDate.id = 'due-date';
  dueDate.name = 'date';
  dueDate.value = '';
  dueDate.type = 'date';

  const datelabel = document.createElement('label');
  datelabel.for = 'date';
  datelabel.innerText = 'Date';

  const priority = document.createElement('select');
  priority.classList.add('form-control');
  priority.id = 'todo-priority';
  priority.name = 'priority';
  priority.value = '';

  const option1 = document.createElement('option');
  option1.value = 'High';
  option1.innerText = 'High';

  const option2 = document.createElement('option');
  option2.value = 'Medium';
  option2.innerText = 'Medium';

  const option3 = document.createElement('option');
  option3.value = 'Low';
  option3.innerText = 'Low';

  priority.append(option1, option2, option3);

  const prioritylabel = document.createElement('label');
  prioritylabel.for = 'priority';
  prioritylabel.innerText = 'Priority';

  const todoTitle = document.getElementById('todo-title');
  const todoDescription = document.getElementById('todo-priority');
  const todoDueDate = document.getElementById('due-date');
  const todoPriority = document.getElementById('todo-priority');

  const submit = document.createElement('button');
  submit.innerText = 'Submit';
  submit.classList.add('btn', 'btn-success');
  submit.addEventListener('click', () => {
    LocalStorage.createTodo(todoTitle.value, todoDescription.value, todoDueDate.value, todoPriority.value, project)
    project(LocalStorage.getObject(project.title));
  });

  const edit = document.createElement('button');
  edit.innerText = 'Edit';
  edit.classList.add('btn', 'btn-primary');
  edit.id = 'edit-task';

  const cancel = document.createElement('button');
  cancel.classList.add('btn', 'btn-danger');
  cancel.innerText = 'Cancel';
  cancel.addEventListener('click', () => {
    const container = document.querySelector('.todoForm');
    container.style.display = 'none';
    const button = document.querySelector('.todotButton');
    button.style.display = 'block';
  });

  container.append(titlelabel,
    title,
    descriptionlabel,
    description, datelabel,
    dueDate,
    prioritylabel,
    priority,
    submit,
    cancel);
  main.appendChild(container);
};

const showTodoList = (project) => {
  const presentProject = LocalStorage.getObject(project.title);
  const listArr = presentProject.todoList;
  const listDiv = document.createElement('div');
  listDiv.classList.add('row d-flex justify-content-center');

  main.appendChild(listDiv);

  for (let i = 0; i < listArr.length; i++) {
    const card = document.createElement('div');
    card.classList = 'card col-6';
    card.style = 'background-color:#F5F5F5';
    card.innerHTML = `
      <div class="card-body" >
      <div class="row">
        <h5 class="card-title col-10">${listArr[i].title}</h5>
        <button type="button" id="edit-todo-${i}" class="btn btn-sm btn-secondary col-2">Edit</button>
      </div>
        <p class="card-text">${listArr[i].description}</p>
        <span class='text-muted'>${listArr[i].dueDate}</span>
        <span class='text-warning float-right'> ${listArr[i].priority}</span>
        <button class="btn btn-success btn-block mt-5" id="complete-task-${i}">Complete Task</button>
      </div>`;
    listDiv.appendChild(card);
    const editButton = document.getElementById(`edit-todo-${i}`);
    editButton.addEventListener('click', () => {
      document.getElementById('add-task-btn').classList = 'd-none';
      document.getElementById('create-task').classList = 'd-none';
      document.getElementById('todo-form').classList = '';
      document.getElementById('edit-task').classList = 'btn btn-primary';
      document.getElementById('todo-title').value = listArr[i].title;
      document.getElementById('todo-description').value = listArr[i].description;
      document.getElementById('duedate').value = listArr[i].dueDate;
      document.getElementById('todo-priority').value = listArr[i].priority;

      document.getElementById('edit-task').addEventListener('click', () => {
        currentProject.todoList[i].title = document.getElementById('todo-title').value;
        currentProject.todoList[i].description = document.getElementById('todo-description').value;
        currentProject.todoList[i].dueDate = document.getElementById('due-date').value;
        currentProject.todoList[i].priority = document.getElementById('todo-priority').value;
        LocalStorage.setObj(currentProject, currentProject.title);
        project(LocalStorage.getObj(currentProject.title));
      });
    });
  };
}

  export { todo, showTodoList };