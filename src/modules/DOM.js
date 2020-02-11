import * as LocalStorage from './localstorage';

const projectList = document.getElementById('project-list');
const main = document.getElementById('main');
const menu = document.getElementById('menu');

const todo = (project) => {
  const container = document.createElement('form');
  container.classList.add('todoForm');
  container.id = 'todoForm';
  container.style.display = 'none';

  const button = document.createElement('button');
  button.classList.add('todoButton', 'btn', 'btn-primary', 'text-center');
  button.id = 'todoButton'
  button.innerText = 'Add Todo';
  button.addEventListener('click', () => {
    const container = document.getElementById('todoForm');
    container.style.display = 'block';
    const button = document.getElementById('todoButton');
    button.style.display = 'none';
  });

  const title = document.createElement('input');
  title.classList.add('form-control');
  title.id = 'todo-title';
  title.name = 'title';
  title.setAttribute('type', 'text');

  const titlelabel = document.createElement('label');
  titlelabel.setAttribute('for', 'todo-title');
  titlelabel.innerText = 'Name';

  const description = document.createElement('textarea');
  description.classList.add('form-control');
  description.id = 'todo-description';
  description.name = 'description';

  const descriptionlabel = document.createElement('label');
  descriptionlabel.setAttribute('for', 'todo-description');
  descriptionlabel.innerText = 'Description';

  const dueDate = document.createElement('input');
  dueDate.classList.add('form-control', 'bg-primary');
  dueDate.id = 'due-date';
  dueDate.name = 'date';
  dueDate.setAttribute('type', 'date');

  const datelabel = document.createElement('label');
  datelabel.setAttribute('for', 'due-date');
  datelabel.innerText = 'Date';

  const priority = document.createElement('select');
  priority.classList.add('form-control');
  priority.id = 'todo-priority';
  priority.name = 'priority';

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
  prioritylabel.setAttribute('for', 'todo-priority');
  prioritylabel.innerText = 'Priority';

  const todoTitle = document.getElementById('todo-title');
  const todoDescription = document.getElementById('todo-description');
  const todoDueDate = document.getElementById('due-date');
  const todoPriority = document.getElementById('todo-priority');

  const submit = document.createElement('button');
  submit.innerText = 'Submit';
  submit.classList.add('btn', 'btn-success');
  submit.id = 'create-todo';
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
  cancel.addEventListener('click', (ev) => {
    ev.preventDefault();
    const container = document.querySelector('.todoForm');
    container.classList = 'd-none';
    cancel.classList = 'btn btn-sm btn-primary';
    document.getElementById('edit-task').classList = 'd-none';
    const button = document.querySelector('.todotButton');
    button.classList = 'btn btn-primary btn-block';
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
  main.appendChild(button);
  return main;
};

const showTodoList = (project) => {
  const presentProject = LocalStorage.getObject(project.title);
  const listArr = presentProject.todoList;
  const listDiv = document.createElement('div');
  listDiv.classList.add('row', 'd-flex', 'justify-content-center');

  main.appendChild(listDiv);

  for (let i = 0; i < listArr.length; i++) {
    const card = document.createElement('div');
    card.classList = 'card', 'col-6';
    card.style = 'background-color:#F5F5F5';
    card.innerHTML = `
      <div class="card-body">
      <div class="row">
        <h5 class="card-title col-10">${listArr[i].title}</h5>
        <button type="button" id="edit-todo-${i}" class="btn btn-sm btn-secondary col-2">Edit</button>
      </div>
        <p class="card-text">${listArr[i].description}</p>
        <span class='text-muted'>${listArr[i].dueDate}</span>
        <span class='text-warning float-right'> ${listArr[i].priority}</span>
        <button class="btn btn-success btn-block mt-5 tick js-tick" id="complete-task-${i}">Complete Task</button>
      </div>`;
    listDiv.appendChild(card);
    console.log(card);
    const editButton = document.getElementById(`edit-todo-${i}`);
    editButton.addEventListener('click', () => {
      document.getElementById('todoButton').classList = 'd-none';
      document.getElementById('create-task').classList = 'd-none';
      document.getElementById('todoForm').classList = '';
      document.getElementById('edit-task').classList = 'btn btn-primary';
      document.getElementById('todo-title').value = listArr[i].title;
      document.getElementById('todo-description').value = listArr[i].description;
      document.getElementById('due-date').value = listArr[i].dueDate;
      document.getElementById('todo-priority').value = listArr[i].priority;

      document.getElementById('edit-task').addEventListener('click', () => {
        presentProject.todoList[i].title = document.getElementById('todo-title').value;
        presentProject.todoList[i].description = document.getElementById('todo-description').value;
        presentProject.todoList[i].dueDate = document.getElementById('due-date').value;
        presentProject.todoList[i].priority = document.getElementById('todo-priority').value;
        LocalStorage.setObject(presentProject, presentProject.title);
        project(LocalStorage.getObject(presentProject.title));
      });
    });

    const complete = document.getElementById('complete-task-${i}');
    complete.addEventListener('click', () => {
      presentProject.todoList.splice(i, 1);
      LocalStorage.setObject(presentProject, presentProject.title);
      Project(LocalStorage.getObject(presentProject.title));
    });
  };
}

const project = (project) => {
  if (project) {
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    };
    const projectTitleDiv = document.createElement('div');

    projectTitleDiv.innerHTML = `<h3 class='display-4 mt-4 mb-3 bg-white text-center rounded'>${project.title}</h3>`;
    main.appendChild(projectTitleDiv);

    todo(project);
    showTodoList(project);
  };
};

const renderPage = () => {
  const projectsArr = LocalStorage.showProjects();
  const projectsSection = document.createElement('div');
  projectsSection.classList.add('m-4');
  projectsSection.innerHTML = `
  <input type="text" id="project-title" required>
  <button class="btn btn-sm btn-primary" id="add-project">Add a Project</button>
  `
  menu.appendChild(projectsSection);

  const projectBtn = document.getElementById('add-project');
  projectBtn.addEventListener('click', () => {
    const projectTitle = document.getElementById('project-title');
    if (projectTitle.value.length > 0) {
      LocalStorage.createProject(projectTitle.value);
      projectList.innerHTML = '';
      projectsSection.innerHTML = '';
      renderPage();
      project(LocalStorage.getObject(projectTitle.value));
    } else {
      alert('Your project name must be at least 1 character long!');
    }
  });

  for (let i = 0; i < projectsArr.length; i++) {
    const projectPageItem = document.createElement('li');
    projectPageItem.classList.add('list-group-item');
    projectPageItem.innerHTML = `
      <button class='btn btn-link text-center'>${projectsArr[i].title}</button>
      <button id='remove-${i}' class="btn btn-danger btn-sm float-right">delete</button>`
    projectPageItem.firstChild.addEventListener('click', () => {
      project(projectsArr[i]);
    });
    projectList.appendChild(projectPageItem);
    const removeBtn = document.getElementById(`remove-${i}`);
    removeBtn.addEventListener('click', () => {
      LocalStorage.deleteObject(removeBtn.parentElement.firstChild.innerHTML);
      projectList.innerHTML = '';
      projectsSection.innerHTML = '';
      main.innerHTML = '';
      renderPage();
    });
  }
};

export { renderPage, project, todo, showTodoList, };