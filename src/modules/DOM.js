
import * as LocalStorage from './localstorage';

const projectList = document.getElementById('project-list');
const main = document.getElementById('main');
const menu = document.getElementById('menu');
const form = `<div class="form-group text-left">
                <label for="todo-title">Task:</label>
                <input type="text" class="form-control" id="todo-title" placeholder="Task">
              </div>
              <div class="form-group text-left">
                <label for="todo-description">Description:</label>
                <textarea class="form-control" id="todo-description" rows="2"></textarea>
              </div>
              <div class="form-group text-left">
                <label for="todo-priority">Priority:</label>
                <select class="form-control" id="todo-priority">
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              <div class="form-group text-left">
                <label for="due-date">Due date:</label>
                <input class="form-control" type="date" id="due-date">
              </div>
              <div id='form-buttons' class="mb-3">
                <button type="button" id="create-todo" class="btn btn-sm btn-primary">Create Todo</button>
                <button type="button" id="edit-todo" class="d-none">Edit Todo</button>
                <button type="button" id="cancel" class="btn btn-sm btn-danger">Cancel</button>
              </div>`;

const todo = (project) => {
  const addTodo = document.createElement('button');
  const container = document.createElement('form');
  container.id = 'todo-form';
  container.classList = 'd-none';
  addTodo.id = 'add-todo-btn';
  addTodo.innerHTML = 'Add Todo';
  addTodo.classList = 'btn btn-primary btn-block mt-3 mb-3';
  main.appendChild(container);
  main.appendChild(addTodo);

  container.innerHTML = form;

  const todoForm = document.getElementById('todo-form');
  addTodo.addEventListener('click', () => {
    todoForm.classList = '';
    addTodo.classList = 'd-none';
  });

  const todoTitle = document.getElementById('todo-title');
  const todoDescription = document.getElementById('todo-description');
  const todoDueDate = document.getElementById('due-date');
  const todoPriority = document.getElementById('todo-priority');

  const createTodoButton = document.getElementById('create-todo');
  createTodoButton.addEventListener('click', () => {
    LocalStorage.createTodo(todoTitle.value, todoDescription.value, todoDueDate.value, todoPriority.value, project);
    project(LocalStorage.getObject(project.title));
  });

  const cancelButton = document.getElementById('cancel');
  cancelButton.addEventListener('click', () => {
    container.classList = 'd-none';
    createTodoButton.classList = 'btn btn-sm btn-primary';
    document.getElementById('edit-todo').classList = 'd-none';
    addTodo.classList = 'btn btn-primary btn-block';
  });
};

const showTodoList = (project) => {
  const presentProject = LocalStorage.getObject(project.title);
  const todoArr = presentProject.todoList;
  const listDiv = document.createElement('div');
  listDiv.classList = 'row d-flex justify-content-center';

  main.appendChild(listDiv);

  for (let i = 0; i < todoArr.length; i++) {
    const card = document.createElement('div');
    card.classList = 'card col-6';
    card.style = 'background-color:#F5F5F5';
    card.innerHTML = `
                      <div class="card-body" >
											<div class="row">
	                      <h5 class="card-title col-10">${todoArr[i].title}</h5>
												<button type="button" id="edit-todo-btn-${i}" class="btn btn-sm btn-secondary col-2">Edit</button>
											</div>
                        <p class="card-text">${todoArr[i].description}</p>
                        <span class='text-muted'>${todoArr[i].dueDate}</span>
                        <span class='text-warning float-right'> ${todoArr[i].priority}</span>
                        <button class="btn btn-success btn-block mt-5" id="complete-task-${i}">Complete Task</button>
                      </div>`;
    listDiv.appendChild(card);
    const editButton = document.getElementById(`edit-todo-btn-${i}`);
    editButton.addEventListener('click', () => {
      document.getElementById('add-todo-btn').classList = 'd-none';
      document.getElementById('create-todo').classList = 'd-none';
      document.getElementById('todo-form').classList = '';
      document.getElementById('edit-todo').classList = 'btn btn-primary';
      document.getElementById('todo-title').value = todoArr[i].title;
      document.getElementById('todo-description').value = todoArr[i].description;
      document.getElementById('due-date').value = todoArr[i].dueDate;
      document.getElementById('todo-priority').value = todoArr[i].priority;

      document.getElementById('edit-todo').addEventListener('click', () => {
        presentProject.todoList[i].title = document.getElementById('todo-title').value;
        presentProject.todoList[i].description = document.getElementById('todo-description').value;
        presentProject.todoList[i].dueDate = document.getElementById('due-date').value;
        presentProject.todoList[i].priority = document.getElementById('todo-priority').value;
        LocalStorage.setObject(presentProject, presentProject.title);
        project(LocalStorage.getObject(presentProject.title));
      });
    });

    const completeButton = document.getElementById(`complete-task-${i}`);
    completeButton.addEventListener('click', () => {
      presentProject.todoList.splice(i, 1);
      LocalStorage.setObject(presentProject, presentProject.title);
      project(LocalStorage.getObject(presentProject.title));
    });
  }
};

const project = (project) => {
  if (project) {
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }

    const projectTitleDiv = document.createElement('div');

    projectTitleDiv.innerHTML = `<h3 class='mt-4 mb-3 bg-white text-center rounded'>${project.title}</h3>`;
    main.appendChild(projectTitleDiv);

    todo(project);
    showTodoList(project);
  }
};

const renderPage = () => {
  const projectsArr = LocalStorage.showProjects();

  const projectSection = document.createElement('div');
  projectSection.classList = 'm-4';
  projectSection.innerHTML = `<input type="text" id="project-title" required>
                            <button class="btn btn-sm btn-primary" id="add-project">Add Project</button>`;
  menu.appendChild(projectSection);

  const addProjectBtn = document.getElementById('add-project');
  addProjectBtn.addEventListener('click', () => {
    const projectTitle = document.getElementById('project-title');
    if (projectTitle.value.length > 0) {
      LocalStorage.createProject(projectTitle.value);
      projectList.innerHTML = '';
      projectSection.innerHTML = '';
      renderPage();
      project(LocalStorage.getObject(projectTitle.value));
    } else {
      alert('Your project name must be at least 1 character long!');
    }
  });

  for (let i = 0; i < projectsArr.length; i++) {
    const projectPageItem = document.createElement('li');
    projectPageItem.classList.add('list-group-item');
    projectPageItem.innerHTML = `<button class="btn btn-link">${projectsArr[i].title}</button>
    <button id='remove-${i}' class='btn btn-danger btn-sm float-right'>X</button>`;
    projectPageItem.firstChild.addEventListener('click', () => {
      project(projectsArr[i]);
    });
    projectList.appendChild(projectPageItem);
    const removeBtn = document.getElementById(`remove-${i}`);
    removeBtn.addEventListener('click', () => {
      LocalStorage.deleteObject(removeBtn.parentElement.firstChild.innerHTML);
      projectList.innerHTML = '';
      projectSection.innerHTML = '';
      main.innerHTML = '';
      renderPage();
    });
  }
};

export {
  renderPage,
  project,
  todo,
  showTodoList,
};