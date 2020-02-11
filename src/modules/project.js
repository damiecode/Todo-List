const Project = (title) => {
  const todoList = [];

  return { title, todoList };
};

const addTodo = (todo, project) => {
  project.todoList.push(todo);
};
export { addTodo, Project };
