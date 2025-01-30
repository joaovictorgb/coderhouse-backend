const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/movieDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado ao MongoDB');
}).catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
});

// Definir o schema e o modelo para os filmes
const movieSchema = new mongoose.Schema({
    title: String,
    director: String,
    year: Number,
    genre: String
});

const Movie = mongoose.model('Movie', movieSchema);

// Rotas CRUD para filmes

// Criar um novo filme
app.post('/movies', async (req, res) => {
    const movie = new Movie(req.body);
    try {
        await movie.save();
        res.status(201).send(movie);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Obter todos os filmes
app.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.send(movies);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Obter um filme por ID
app.get('/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).send();
        }
        res.send(movie);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Atualizar um filme por ID
app.put('/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!movie) {
            return res.status(404).send();
        }
        res.send(movie);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Deletar um filme por ID
app.delete('/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) {
            return res.status(404).send();
        }
        res.send(movie);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});