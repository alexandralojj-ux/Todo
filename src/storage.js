import { createProject } from "./project.js";
import { createTodo } from "./todo.js";

function saveProjects(projects) {
    localStorage.setItem("projects", JSON.stringify(projects));
}

function loadProjects() {
    const savedProjects = localStorage.getItem("projects");

    if (!savedProjects) {
        return null;
    }

    const parsedProjects = JSON.parse(savedProjects);

    return parsedProjects.map(projectData => {
        const project = createProject(projectData.name);

        projectData.todos.forEach(todoData => {
            const todo = createTodo(
                todoData.title,
                todoData.description,
                todoData.dueDate,
                todoData.priority
            );

            if (todoData.completed) {
                todo.completeTodo();
            }

            project.addTodo(todo);
        });

        return project;
    });
}

export { saveProjects, loadProjects };