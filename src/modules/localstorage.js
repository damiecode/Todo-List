import { addTodo, Project } from './project';
import ToDo from './todo';

const setObject = (obj, value) => {
  localStorage.setItem(value, JSON.stringify(obj));
};

const getObject = (value) => {
  const obj = JSON.parse(localStorage.getItem(value));
  return obj;
};

const deleteObject = (value) => {
  localStorage.removeItem(value);
};

const showProjects = () => {
  const projectList = [];
  const values = Object.values(localStorage);

  for (let i = 0; i < values.length; i += 1) {
    projectList.push(JSON.parse(values[i]));
  }
  return projectList;
};

const createProject = (title) => {
  const project = Project(title);
  setObject(project, project.title);
};

const createTodo = (todoTitle, todoDescription, todoDueDate, todoPriority, project) => {
  const todo = ToDo(todoTitle, todoDescription, todoDueDate, todoPriority);
  const storedProject = getObject(project.title);
  if (todoTitle === '' || todoDescription === '' || todoDueDate === '' || todoPriority === '') {
    alert('Please fill in all fields!'); // eslint-disable-line no-alert
    return false;
  }
  addTodo(todo, storedProject);
  setObject(storedProject, project.title);
  return true;
};

export {
  createTodo,
  createProject,
  showProjects,
  deleteObject,
  getObject,
  setObject,
};