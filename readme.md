# Author : Rania El ABDELLAOUI

# Todo List Application

This project is a task management application built with React, allowing users to create, update, and delete tasks. The application interacts with a backend API to manage tasks and provides real-time UI feedback based on the user’s actions.

## What I Implemented

1. **Fetching Tasks**:
   - Implemented `handleFetchTasks` to retrieve the list of tasks from the backend using the `GET /tasks` API and set the task list in the local state.

2. **Deleting a Task**:
   - Implemented `handleDelete` to delete a task by making an API call to `DELETE /tasks/{id}`.
   - Upon successful deletion, the task is removed from the local state, ensuring real-time UI updates.

3. **Saving and Updating Tasks**:
   - Added logic in `handleSave` to update a task using `PATCH /tasks/{id}` if the task name has been changed.
   - New tasks are created using `POST /tasks` with a default name `DRAFT-{timestamp}`.
   - After saving or creating a task, the task list is updated to reflect the changes in the UI.

4. **Button State Management**:
   - Implemented logic to control the save button's (`<Check />` icon) state, enabling it only when the task name has been modified. This prevents unnecessary API calls.
   - The `updatedTasks` array tracks the tasks that have been changed to enable/disable the save button dynamically.

## Key Design Decisions

1. **Efficient API Calls**:
   - Tasks are only updated if the name has been modified. This ensures that we avoid redundant updates to the server and unnecessary UI re-renders.

2. **Immediate Feedback on Deletion**:
   - When a task is deleted, it is immediately removed from the UI. This gives users instant feedback without waiting for the server response.

3. **Draft Task Creation**:
   - When adding a new task, a default name in the format `DRAFT-{timestamp}` is used. This ensures the task is visible right away and can be updated later by the user.

## Challenges Encountered

1. **Managing Button State**:
   - Ensuring the save button is only enabled when a task name changes required careful tracking of task edits using the `updatedTasks` array.

2. **Handling Asynchronous Updates**:
   - Managing state updates asynchronously after API calls required ensuring tasks were properly updated and deleted both in the local state and on the server.

## How to Run the Project

1. Clone the repository.
2. Install the dependencies using:

   ```bash
   yarn install
   yarn run dev
