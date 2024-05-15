const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000; // Define the port

const dataFilePath = path.join(__dirname, 'tasks.json');

// Function to read data from the JSON file
function readDataFromFile() {
    try {
        const jsonData = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(jsonData);
    } catch (error) {
        throw new Error('Error reading data from file:', error);
    }
}

// Function to write data to the JSON file
function writeDataToFile(data) {
    try {
        const jsonData = JSON.stringify(data, null, 2);
        fs.writeFileSync(dataFilePath, jsonData, 'utf8');
    } catch (error) {
        throw new Error('Error writing data to file:', error);
    }
}

const server = http.createServer((req, res) => {
    // Set response headers
    res.setHeader('Content-Type', 'application/json');

    try {
        // Handle GET request to retrieve all tasks
        if (req.method === 'GET' && req.url === '/tasks') {
            const tasks = readDataFromFile();
            res.statusCode = 200;
            res.end(JSON.stringify(tasks));
        }
        // Handle POST request to add a new task
        else if (req.method === 'POST' && req.url === '/tasks') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                try {
                    const newTask = JSON.parse(body);
                    // Validate new task data (example: check if required fields are present)
                    if (!newTask.title) {
                        res.statusCode = 400;
                        res.end(JSON.stringify({ error: 'Title is required for a new task.' }));
                        return;
                    }
                    const tasks = readDataFromFile();
                    const maxId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) : 0;
                    newTask.id = maxId + 1;
                    tasks.push(newTask);
                    writeDataToFile(tasks);
                    res.statusCode = 201;
                    res.end(JSON.stringify(newTask));
                } catch (error) {
                    res.statusCode = 400;
                    res.end(JSON.stringify({ error: error.message }));
                }
            });
        }
        // Handle GET request to retrieve a specific task by ID
        else if (req.method === 'GET' && req.url.startsWith('/tasks/')) {
            const taskId = parseInt(req.url.split('/').pop());
            const tasks = readDataFromFile();
            const task = tasks.find(task => task.id === taskId);
            if (task) {
                res.statusCode = 200;
                res.end(JSON.stringify(task));
            } else {
                res.statusCode = 404;
                res.end(JSON.stringify({ error: 'Task not found' }));
            }
        }
        // Handle PUT request to update an existing task by ID
        else if (req.method === 'PUT' && req.url.startsWith('/tasks/')) {
            const taskId = parseInt(req.url.split('/').pop());
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                try {
                    const updatedTask = JSON.parse(body);
                    const tasks = readDataFromFile();
                    const index = tasks.findIndex(task => task.id === taskId);
                    if (index !== -1) {
                        updatedTask.id = taskId;
                        tasks[index] = updatedTask;
                        writeDataToFile(tasks);
                        res.statusCode = 200;
                        res.end(JSON.stringify(updatedTask));
                    } else {
                        res.statusCode = 404;
                        res.end(JSON.stringify({ error: 'Task not found' }));
                    }
                } catch (error) {
                    res.statusCode = 400;
                    res.end(JSON.stringify({ error: error.message }));
                }
            });
        }
        // Handle PATCH request to partially update an existing task by ID
        else if (req.method === 'PATCH' && req.url.startsWith('/tasks/')) {
            const taskId = parseInt(req.url.split('/').pop());
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                try {
                    const updatedFields = JSON.parse(body);
                    const tasks = readDataFromFile();
                    const index = tasks.findIndex(task => task.id === taskId);
                    if (index !== -1) {
                        Object.assign(tasks[index], updatedFields);
                        writeDataToFile(tasks);
                        res.statusCode = 200;
                        res.end(JSON.stringify(tasks[index]));
                    } else {
                        res.statusCode = 404;
                        res.end(JSON.stringify({ error: 'Task not found' }));
                    }
                } catch (error) {
                    res.statusCode = 400;
                    res.end(JSON.stringify({ error: error.message }));
                }
            });
        }
        // Handle DELETE request to delete a task by ID
        else if (req.method === 'DELETE' && req.url.startsWith('/tasks/')) {
            const taskId = parseInt(req.url.split('/').pop());
            const tasks = readDataFromFile();
            const updatedTasks = tasks.filter(task => task.id !== taskId);
            if (tasks.length !== updatedTasks.length) {
                writeDataToFile(updatedTasks);
                res.statusCode = 204; // No content
                res.end();
            } else {
                res.statusCode = 404;
                res.end(JSON.stringify({ error: 'Task not found' }));
            }
        } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Not Found' }));
        }
    } catch (error) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
    } finally {
        // Perform any necessary resource cleanup here
    }
});

server.listen(port, () => { // Change to listen on port only
    console.log(`Server running on port ${port}`);
});