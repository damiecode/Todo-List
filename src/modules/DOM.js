import * as LocalStorage from './localstorage';

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

  const main = document.getElementById('main');
  main.appendChild(container);
};

export { todo };