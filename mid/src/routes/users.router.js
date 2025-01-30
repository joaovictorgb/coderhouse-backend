const express = require('express');
const router = express.Router();

const userRouter= express.Router();
const petsRouter =express.Router();

let users = [];
let pets = [];

userRouter.get('/', (req, res) => {
    res.json(users);
});

petsRouter.post('/', (req, res) => {
    const newPet = req.body;
    pets.push(newPet);
    res.status(201).json(newPet);
});

const app =express();
app.use(express.json());

app.use('/users', userRouter);
app.use('/pets', petsRouter);

modulo.exports = app; /api/users
usersRouter.post('/', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json(newUser);
});
petsRouter.get('/', (req, res) => {
    res.json(pets);
});
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);

module.exports = app;