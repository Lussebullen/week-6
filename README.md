# ZOD test

Requirements: Typescript and Express packages plus the Zod package 
Install Zod with: "npm i Zod"

**Task 1: Test the server**
Method: GET
Route "/ping"
Result: The server answers with "Pong (the server is up and running)
![Task-1](/images/task1.png)


**Task 2: Fetch user and country**
Method: GET
Route "/random-person"
Result: The server answers with information about user name and country
![Task-2](/images/task2.png)

**Task 3: Simulate adding a user**
Method: POST
Route "/users"
Result: If successfull, the server confirms that a new user has been added and what the user data was.
![Task-3](/images/task3.png)

If the data is corrupted somehow (in this case age was sent as a string insted of a number), the response could look similar to the following image: ![Task-3](/images/task3-error-in-age.png)

