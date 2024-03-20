# Final-cs333
## Usage
To run this project locally:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies on frontend and backend
4. Run `npm start` to start the development server on both frontend and backend


## Feature Highlights

### Task Prioritization
- **Description:** Tasks in the Todo application are now ordered by priority rather than the order in which they were added. This allows users to focus on the most important tasks first.
- **Backend Changes:** Modifications were made to `routes.js` and `todos.js` to support this feature.
- **Frontend Changes:** `Todo.jsx` was updated to include calls to the new `TodoPriority` component, which handles the prioritization logic.

### Cross-off Effect
- **Description:** Tasks that are marked as completed are now visually "greyed out" to clearly distinguish them from pending tasks.
- **Implementation:** This feature is implemented in `TodoCrossOff.jsx` and is utilized within `Todo.jsx`.

### Dynamic Language Translation
- **Description:** The application supports dynamic language translation, alternating between English and Arabic with each click. This feature utilizes the Google Translate API for accurate translations.
- **Components:** The `TranslateComponent.jsx` was added for handling translations, with added functionality in `Todo.jsx` to manage translation triggers.

### Weather Updates
- **Description:** A weather API integration provides real-time weather updates within the application.
- **Components:** The `Weather` folder contains both `Weather.jsx` and `Weather.css` for the weather feature's frontend implementation.

### UI Enhancements
- **General:** The `App.css` file was added to improve the overall aesthetics of the application.
- **Task Priority Indicator:** The `TodoPriority` component was introduced to change the color tag based on the task's priority level, enhancing visual cues for users.
- **Improved Task Creation:** Enhancements to the task creation interface, including styling for the search box and hover effects for the `addTodo` button, are defined in `CreateTodo.css`.