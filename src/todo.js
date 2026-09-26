function createTodo(title, description, dueDate, priority) {
    return {
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
        completed: false,

        completeTodo() {
            this.completed = true;
        },

        setPriority(newPriority) {
            this.priority = newPriority;
        },

        editTodo(title, description, dueDate, priority) {
            this.title = title;
            this.description = description;
            this.dueDate = dueDate;
            this.priority = priority;
        }
    };
}

export { createTodo };