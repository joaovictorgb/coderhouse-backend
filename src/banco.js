const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;

app.use(express.json());

// Conectar ao MongoDB local
mongoose.connect("mongodb://127.0.0.1:27017/escola", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => console.log("Conectado ao MongoDB"));

db.on("error", (error) => console.error("Erro na conexão", error));

// Modelos
const Aluno = mongoose.model("Aluno", new mongoose.Schema({
  nome: String,
  idade: Number,
  turma: String,
}));

const Professor = mongoose.model("Professor", new mongoose.Schema({
  nome: String,
  disciplina: String,
}));

const Turma = mongoose.model("Turma", new mongoose.Schema({
  nome: String,
  professor: String,
}));

// Rotas CRUD (Create, Read, Update, Delete)

// Criar Aluno
app.post("/alunos", async (req, res) => {
  const aluno = new Aluno(req.body);
  await aluno.save();
  res.status(201).json(aluno);
});

// Listar Alunos
app.get("/alunos", async (req, res) => {
  const alunos = await Aluno.find();
  res.json(alunos);
});

// Atualizar Aluno
app.put("/alunos/:id", async (req, res) => {
  const aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!aluno) return res.status(404).send("Aluno não encontrado");
  res.json(aluno);
});

// Deletar Aluno
app.delete("/alunos/:id", async (req, res) => {
  const aluno = await Aluno.findByIdAndDelete(req.params.id);
  if (!aluno) return res.status(404).send("Aluno não encontrado");
  res.send("Aluno removido com sucesso");
});

// Criar Professor
app.post("/professores", async (req, res) => {
  const professor = new Professor(req.body);
  await professor.save();
  res.status(201).json(professor);
});

// Listar Professores
app.get("/professores", async (req, res) => {
  const professores = await Professor.find();
  res.json(professores);
});

// Atualizar Professor
app.put("/professores/:id", async (req, res) => {
  const professor = await Professor.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!professor) return res.status(404).send("Professor não encontrado");
  res.json(professor);
});

// Deletar Professor
app.delete("/professores/:id", async (req, res) => {
  const professor = await Professor.findByIdAndDelete(req.params.id);
  if (!professor) return res.status(404).send("Professor não encontrado");
  res.send("Professor removido com sucesso");
});

// Criar Turma
app.post("/turmas", async (req, res) => {
  const turma = new Turma(req.body);
  await turma.save();
  res.status(201).json(turma);
});

// Listar Turmas
app.get("/turmas", async (req, res) => {
  const turmas = await Turma.find();
  res.json(turmas);
});

// Atualizar Turma
app.put("/turmas/:id", async (req, res) => {
  const turma = await Turma.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!turma) return res.status(404).send("Turma não encontrada");
  res.json(turma);
});

// Deletar Turma
app.delete("/turmas/:id", async (req, res) => {
  const turma = await Turma.findByIdAndDelete(req.params.id);
  if (!turma) return res.status(404).send("Turma não encontrada");
  res.send("Turma removida com sucesso");
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
