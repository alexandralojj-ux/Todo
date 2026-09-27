import { createTodo } from "./todo.js";
import { createProject } from "./project.js";

const projects = [];

const defaultProject = createProject("Default");
projects.push(defaultProject);

function addProject(name) {
    const project = createProject(name);
    projects.push(project);
}

let currentProject = defaultProject;

function addTodo(title, description, dueDate, priority) {
    const todo = createTodo(title, description, dueDate, priority);
    currentProject.addTodo(todo);
}

function selectProject(project) {
    currentProject = project;
}

function removeProject(project) {
    if (project === defaultProject) {
        return;
    }

    const index = projects.indexOf(project);
    projects.splice(index, 1);

    if (currentProject === project) {
        currentProject = defaultProject;
    }
}