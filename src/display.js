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

function displayTodos(project) {
    const todosContainer = document.querySelector("#todos");

    todosContainer.innerHTML = "";

    project.todos.forEach(todo => {
        const todoElement = document.createElement("div");
        todoElement.classList.add("todo-card");
        let expanded = false;

        const completeButton = document.createElement("button");
        completeButton.textContent = todo.completed ? "Completed" : "Complete";

        completeButton.addEventListener("click", (event) => {
            event.stopPropagation();

            todo.completeTodo();

            displayTodos(project);
        });

        todoElement.appendChild(completeButton);

        todoElement.addEventListener("click", () => {
            if (!expanded) {
                const descriptionElement = document.createElement("p");

                descriptionElement.classList.add("todo-description");
                descriptionElement.textContent = todo.description;

                todoElement.appendChild(descriptionElement);

                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";

                deleteButton.addEventListener("click", () => {
                    event.stopPropagation();
                    project.removeTodo(todo);
                    displayTodos(project);
                });

                todoElement.appendChild(deleteButton);

                
                const editButton = document.createElement("button");
                editButton.textContent = "Edit";

                editButton.addEventListener("click", () => {
                    event.stopPropagation();

                    const newTitle = prompt("Titlu:", todo.title);
                    const newDescription = prompt("Descriere:", todo.description);
                    const newDueDate = prompt("Data:", todo.dueDate);
                    const newPriority = prompt("Prioritate:", todo.priority);

                    if (newTitle && newDescription && newDueDate && newPriority) {
                        todo.editTodo(
                            newTitle,
                            newDescription,
                            newDueDate,
                            newPriority
                        );

                        displayTodos(project);
                    }
                });

                todoElement.appendChild(editButton);

                expanded = true;

            } else {
                const descriptionElement = todoElement.querySelector(".todo-description");

                if (descriptionElement) {
                    descriptionElement.remove();
                }

                expanded = false;
            }
        });

        const titleElement = document.createElement("h3");
        titleElement.textContent = todo.title;

        const dateElement = document.createElement("p");
        dateElement.textContent = todo.dueDate;

        const priorityElement = document.createElement("p");
        priorityElement.textContent = `Priority: ${todo.priority}`;
        priorityElement.classList.add(`priority-${todo.priority}`);

        todoElement.appendChild(titleElement);
        todoElement.appendChild(dateElement);
        todoElement.appendChild(priorityElement);

        todosContainer.appendChild(todoElement);
    });
}

export { displayProjects, displayTodos };

