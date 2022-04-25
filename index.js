import * as apiCalls from "./Helpers/apiCalls.js";

//Create form to handle user input
const taskForm = document.getElementById('task-form');

//Create new task with value from input field
taskForm.addEventListener('submit', () => {
  apiCalls.createTask(taskForm.elements[0].value, false);
})

//Main function to render tasks and their functionalities
async function renderTasks() {

  //Set the container to render tasks into
  const taskContainer = document.querySelector('.task-list-container');

  //Fetch all tasks in DB
  const data = await apiCalls.getTaskList()

  //Add functionalities to each task.
  data.forEach((task) => {

    //Create container for task
    const taskItemContainer = document.createElement('div');
    taskItemContainer.className = ".task-item-container";

    //Create checkbox and set to the corresponding properties from DB
    const taskCheckBox = document.createElement('input');
    taskCheckBox.type = "checkbox";
    if(task.done === true) {
      taskCheckBox.checked = true;
    }
    //Add text line-through on checkbox being checked by user
    taskCheckBox.addEventListener('change', (event) => {
      if(event.target.checked) {
        event.target.nextSibling.style['text-decoration'] = 'line-through'
      }
      if(!event.target.checked) {
        event.target.nextSibling.style['text-decoration'] = 'none'
      }
    })

    //Add description and, if marked done in db, linethrough
    const taskDescription = document.createElement('p');
    taskDescription.innerText = task.description;
    if(task.done === true) {
      taskDescription.style.textDecoration = 'line-through'
    }

    //Add text & done change functionality on 'text-click' (updates db & reloads page)
    taskDescription.addEventListener('click', () => {
      const newText = prompt('Please enter new task name');
      const isDone = confirm('Should the task be marked as completed?')
      apiCalls.updateTask(task._id, newText, isDone)
      location.reload();
    })

    //Add task delete button
    const taskDeleteButton = document.createElement('a');
    taskDeleteButton.addEventListener("click", () => {
      let isConfirmed = confirm("Are you sure you want to delete the task?");
      if(isConfirmed) {
        apiCalls.deleteTask(task._id);
        location.reload();
      }
    });

    //Add image to task delete button
    const taskDeleteImg = document.createElement('i');
    taskDeleteImg.className = 'fa fa-trash'
    taskDeleteButton.append(taskDeleteImg);

    //Append every element to containers
    taskItemContainer.append(taskCheckBox);
    taskItemContainer.append(taskDescription);
    taskItemContainer.append(taskDeleteButton);

    taskContainer.append(taskItemContainer)
  })
};

renderTasks();
