# Habit Tracker

Frontend: React <br/>
Backend: Node/Express <br/>
DB: MongoDB <br/>

## Purpose

Create HabitTracker which has following functionality:

1. Login new users and issue token <br/>
2. Verify JWT token <br/>
3. Utilize Token to perform CRUD Operation if authorized <br/>

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

6. $push - to push new changes to mongoDB
7. $pull - to remove entries in mongoDB

### Questions

1. When generating the JWT Token, what do you want to encode ?

- The base functionalities
