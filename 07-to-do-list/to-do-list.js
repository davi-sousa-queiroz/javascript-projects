/*

PROJECT: Simple To-Do List

REQUIRED:

[ ] Text input
[ ] "Add Task" button
[ ] Task list

FUNCTIONALITY:

1. User types a task.
2. Empty/space-only tasks cannot be added.
3. Clicking Add puts the task on the page.
4. Clicking a task marks it completed somehow.
5. Each task has a way to be deleted.
6. Deleted tasks disappear from the page.
7. Try to keep your JavaScript organized with functions.

*/

const tasks = []

const input = document.querySelector('.input')
const addButton = document.querySelector('.addButton')
const container = document.querySelector('.listContainer')
const clearButton = document.querySelector('.clearButton')

function displayTask (task) {
    const taskDisplay = document.createElement('li')
    taskDisplay.textContent = task
    container.appendChild(taskDisplay)

}

function addTask () {
    let taskAdd = input.value
    taskAdd = taskAdd.trim()
    if (taskAdd === '') {
        return
    }
    tasks.push(taskAdd)
    displayTask(taskAdd)
    input.value = ''
}

function removeTasks () {
    const tasks = document.querySelectorAll(li)
    tasks.remove()
}

addButton.addEventListener('click', addTask)
clearButton.addEventListener('click', removeTasks)