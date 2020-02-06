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

const createTodo = (title, description, dueDate, priority, project) => {
  const todo = ToDo(title, description, dueDate, priority);
  const storedProject = getObject(project.title);
  addTodo(todo, storedProject);
  setObject(storedProject, project.title);
};

export {
  createTodo,
  createProject,
  showProjects,
  deleteObject,
  setObject,
  getObject,
};