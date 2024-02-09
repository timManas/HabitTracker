# Habit Tracker

Frontend: React <br/>
Backend: Node/Express <br/>
DB: MongoDB <br/>

## Purpose

Create HabitTracker which has following functionality:

1. Login new users and issue token <br/>
2. Verify JWT token <br/>
3. Once logged in, perform CRUD Operations <br/>

## To Do List

### FrontEnd

1. Build Home Page and Navbar
2. Build Login Page & RegisterPage
3. User can register
4. User can login
5. User can perform CRUD Operation once logged in

### BackEnd

1. Create routes and controllers
2. Register new user
3. Issue new token once registered
4. Store token in localstorage for now
5. Validate JWT Token
6. Once validated, allows CRUD Operations

### Lessons learnd

1. If you dont know what inside the req, output it on the console.
2. If findOne() or find() its returning a promise, add a await to get the document
3. Use middleware to handle the token verification
4. To create JWT Token, you will to:

- sign it
- Add payload and JWT_SECRET
- Send token back to the client

5. Collection name is determined by the Model name + 's'
   Ex: 'Habit' is habits collection in mongodb
   'Product' is products collection in mongodb

### Questions

1. When generating the JWT Token, what do you want to encode ?

- The base functionalities
