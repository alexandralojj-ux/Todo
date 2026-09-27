import "./style.css";

import { createTodo } from "./todo.js";
import { createProject } from "./project.js";
import { displayProjects, displayTodos } from "./display.js";

const projects = [];

const defaultProject = createProject("Default");

projects.push(defaultProject);

let currentProject = defaultProject;

function addProject(name) {
    const project = createProject(name);
    projects.push(project);
}

displayProjects(projects, selectProject);
displayTodos(currentProject);

function addTodo(title, description, dueDate, priority) {
    const todo = createTodo(title, description, dueDate, priority);
    currentProject.addTodo(todo);
}

function selectProject(project) {
    currentProject = project;

    const projectTitle = document.querySelector("#project-title");
    projectTitle.textContent = project.name;

    displayTodos(currentProject);
}

function removeProject(project) {
    if (project === defaultProject) {
        return;
    }

    const index = projects.indexOf(project);
    projects.splice(index, 1);

    if (currentProject === project) {
        currentProject = defaultProject;

        displayTodos(currentProject);

        const projectTitle = document.querySelector("#project-title");
        projectTitle.textContent = currentProject.name;
    }
}

const addProjectButton = document.querySelector("#add-project");

addProjectButton.addEventListener("click", () => {
    const name = prompt("Project name:");

    if (name) {
        addProject(name);
        displayProjects(projects, selectProject);
    }
});


const todoForm = document.querySelector("#todo-form");

todoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.querySelector("#todo-title").value;
    const description = document.querySelector("#todo-description").value;
    const dueDate = document.querySelector("#todo-date").value;
    const priority = document.querySelector("#todo-priority").value;

    addTodo(title, description, dueDate, priority);

    displayTodos(currentProject);

    todoForm.reset();
    todoForm.hidden = true;
});


const addTodoButton = document.querySelector("#add-todo");

addTodoButton.addEventListener("click", () => {
    todoForm.hidden = false;
});
