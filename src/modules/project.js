const Project = (title) => ({
  title,
  todoList: []
})

const addTodo = (todo, project) => {
  project.todoList.push(todo);
};
export { Project, addTodo };
