# Task Manager API
- This Node.js application serves as a Task Manager API, allowing users to perform CRUD operations on tasks, handling HTTP requests appropriately, and managing data storage using JSON files. Each endpoint is properly implemented, and error handling is in place for various scenarios.

### Server Setup
- Used the `http` module to create an HTTP server.
- Configured the server to listen on port 3000.

### Data Storage
- Utilized the `fs` module for storing and retrieving resource data.
- Created a JSON file named `data.json` to store the resource data.
- Implemented CRUD operations by reading from and writing to the JSON file.

### Routing and Endpoints
Implemented the following endpoints:
- **GET /tasks**: Retrieve all tasks.
- **GET /tasks/{id}**: Retrieve a specific task by ID.
- **POST /tasks**: Add a new task.
- **PUT /tasks/{id}**: Update an existing task by ID.
- **PATCH /tasks/{id}**: Partially update an existing task by ID.
- **DELETE /tasks/{id}**: Delete a task by ID.

### Request Handling
- Parsed incoming request bodies using the appropriate Node.js Standard Libraries.
- Validated incoming data and handled errors appropriately.
- Used try...catch...finally blocks to handle exceptions and ensure proper resource cleanup.

### Response Handling
- Sent appropriate responses with relevant status codes and data payload.
- Handled edge cases and error scenarios gracefully.
- Used try...catch...finally blocks to handle exceptions and ensure proper resource cleanup.

## Endpoints
  
### GET /tasks

- **Description:** Retrieves all tasks.
- **Request Method:** GET
- **Request URL:** `/tasks`
- **Request Body:** None
- **Response Status Codes:**
  - 200 (OK): Successful retrieval of tasks.
  - 404 (Not Found): If no tasks are found.
  - 500 (Internal Server Error): If an internal server error occurs.
- **Response Body:** JSON array containing task objects.
![image](https://github.com/pemadolker/02230294_WEB102_PA1/assets/141105526/444d94a4-fdce-4e99-8256-f43f1dd2d529)

### POST /tasks

- **Description:** Adds a new task.
- **Request Method:** POST
- **Request URL:** `/tasks`
- **Request Body:** JSON object representing the new task. Required fields: title, description, priority, dueDate.
- **Response Status Codes:**
- **Response Body:** JSON object representing the added task.
![image](https://github.com/pemadolker/02230294_WEB102_PA1/assets/141105526/9f110175-622b-4652-a4b2-cc87b3d58c79)

### GET /tasks/{taskId}

- **Description:** Retrieves a specific task by ID.
- **Request Method:** GET
- **Request URL:** `/tasks/{taskId}` 
- **Request Body:** None
- **Response Status Codes:**
  - 200 (OK): If the task is found.
  - 404 (Not Found): If the task with the specified ID is not found.
  - 500 (Internal Server Error): If an internal server error occurs.
- **Response Body:** JSON object representing the task.
![image](https://github.com/pemadolker/02230294_WEB102_PA1/assets/141105526/4aa142b3-45cc-4741-9184-7d78452d6643)

### PUT /tasks/{taskId}

- **Description:** Updates an existing task by ID.
- **Request Method:** PUT
- **Request URL:** `/tasks/{taskId}`
- **Request Body:** JSON object representing the updated task. Must include all fields.
- **Response Status Codes:**
  - 200 (OK): If the task is successfully updated.
  - 400 (Bad Request): If the request body is invalid or missing required fields.
  - 404 (Not Found): If the task with the specified ID is not found.
  - 500 (Internal Server Error): If an internal server error occurs.
- **Response Body:** JSON object representing the updated task.
![image](https://github.com/pemadolker/02230294_WEB102_PA1/assets/141105526/c140125d-84b1-4c90-8480-c159e1bc5048)

### PATCH /tasks/{taskId}

- **Description:** Partially updates an existing task by ID.
- **Request Method:** PATCH
- **Request URL:** `/tasks/{taskId}` 
- **Request Body:** JSON object representing the fields to be updated.
- **Response Status Codes:**
  - 200 (OK): If the task is successfully updated.
  - 400 (Bad Request): If the request body is invalid.
  - 404 (Not Found): If the task with the specified ID is not found.
  - 500 (Internal Server Error): If an internal server error occurs.
- **Response Body:** JSON object representing the updated task.
![image](https://github.com/pemadolker/02230294_WEB102_PA1/assets/141105526/7cc6b4f4-fbe2-4822-a852-a3ff33cd5920)

### DELETE /tasks/{taskId}

- **Description:** Deletes a task by ID.
- **Request Method:** DELETE
- **Request URL:** `/tasks/{taskId}`
- **Request Body:** None
- **Response Status Codes:**
  - 204 (No Content): If the task is successfully deleted.
  - 404 (Not Found): If the task with the specified ID is not found.
  - 500 (Internal Server Error): If an internal server error occurs.
- **Response Body:** None (empty response)
![image](https://github.com/pemadolker/02230294_WEB102_PA1/assets/141105526/80979886-0f6f-4624-8839-17fe259d466e)

## Notes

- The tasks are stored in a JSON file named `tasks.json`.
- Each task object have the following properties: title, description, priority, dueDate, status, id.
- The priority are one of the following: Low, Medium, High, Very High.
- The dueDate is in the format YYYY-MM-DD.
- The status can be either "Not Completed" or "Completed".

### Deployment
- Deployment to Cloud: https://zero2230294-web102-pa1.onrender.com
