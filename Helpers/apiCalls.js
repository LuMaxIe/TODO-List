import sendRequest from '../api-client.js';

//Return all tasks in DB
export const getTaskList = async () => {
  try {
    return await sendRequest('GET', {"Content-Type": "application/json"});
  } catch (err) {
    console.error(err)
  }
}

// Creates new task in DB
export const createTask = async (description, isDone) => {
  try {
    await sendRequest('POST', {"Content-Type": "application/json"}, null, {description, isDone})
  } catch (err) {
    console.error(err)
  }
}

// Deletes specified task from DB
export const deleteTask = async (idToDelete) => {
  try {
    await sendRequest('DELETE', null, `/${idToDelete}`)
  } catch (err) {
    console.error(err)
  }
}

// Updates specified task with new description and done property
export const updateTask = async (idToUpdate, description, done) => {
  try {
    await sendRequest('PUT', {"Content-Type": "application/json"}, `/${idToUpdate}`, {description, done});
  } catch (err) {
    console.error(err)
  }
}