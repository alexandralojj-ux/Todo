function displayProjects(projects, selectProject) {
    const projectsContainer = document.querySelector("#projects");

    projectsContainer.innerHTML = "";

    projects.forEach(project => {
        const projectElement = document.createElement("div");

        projectElement.textContent = project.name;

        projectElement.addEventListener("click", () => {
            selectProject(project);
        });

        projectsContainer.appendChild(projectElement);
    });
}

function displayTodos(project, saveProjects) {
    const todosContainer = document.querySelector("#todos");

    todosContainer.innerHTML = "";

    project.todos.forEach(todo => {
        const todoElement = document.createElement("div");
        todoElement.classList.add("todo-card");

        if (todo.completed) {
        todoElement.classList.add("completed");
        }

        const titleElement = document.createElement("h3");
        titleElement.textContent = todo.title;

        const dateElement = document.createElement("p");
        dateElement.textContent = todo.dueDate;

        const priorityElement = document.createElement("p");
        priorityElement.textContent = `Priority: ${todo.priority}`;

        priorityElement.classList.add(`priority-${todo.priority}`);

        const completeButton = document.createElement("button");
        completeButton.textContent = todo.completed
            ? "Completed"
            : "Complete";

        completeButton.addEventListener("click", (event) => {
            event.stopPropagation();

            todo.completeTodo();
            saveProjects();

            displayTodos(project, saveProjects);
        });

        todoElement.appendChild(titleElement);
        todoElement.appendChild(dateElement);
        todoElement.appendChild(priorityElement);
        todoElement.appendChild(completeButton);

        let expanded = false;

        todoElement.addEventListener("click", () => {
            if (!expanded) {
                const descriptionElement = document.createElement("p");

                descriptionElement.classList.add("todo-description");
                descriptionElement.textContent = todo.description;

                todoElement.appendChild(descriptionElement);

                const editButton = document.createElement("button");
                editButton.textContent = "Edit";

                editButton.addEventListener("click", (event) => {
                    event.stopPropagation();

                    const newTitle = prompt("Title:", todo.title);

                    const newDescription = prompt(
                        "Description:",
                        todo.description
                    );

                    const newDueDate = prompt(
                        "Date:",
                        todo.dueDate
                    );

                    const newPriority = prompt(
                        "Priority:",
                        todo.priority
                    );

                    if (
                        newTitle &&
                        newDescription &&
                        newDueDate &&
                        newPriority
                    ) {
                        todo.editTodo(
                            newTitle,
                            newDescription,
                            newDueDate,
                            newPriority
                        );
                        saveProjects();

                        displayTodos(project, saveProjects);
                    }
                });

                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";

                deleteButton.addEventListener("click", (event) => {
                    event.stopPropagation();

                    project.removeTodo(todo);

                    saveProjects();

                    displayTodos(project, saveProjects);
                });

                todoElement.appendChild(editButton);
                todoElement.appendChild(deleteButton);

                expanded = true;
            } else {
                const descriptionElement =
                    todoElement.querySelector(".todo-description");

                if (descriptionElement) {
                    descriptionElement.remove();
                }

                const buttons = todoElement.querySelectorAll(
                    "button:not(:first-of-type)"
                );

                buttons.forEach(button => {
                    button.remove();
                });

                expanded = false;
            }
        });

        todosContainer.appendChild(todoElement);
    });
}

export { displayProjects, displayTodos };

