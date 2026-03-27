const express = require("express");

const app = express();

app.use(express.json());

const {
    cadastrarUsuario,
    listarUsuarios,
    login
} = require("./services/usuarios");

// rotas
app.post("/usuarios", (req, res) => {
    const { nome, email, senha } = req.body;
    res.json(cadastrarUsuario(nome, email, senha));
});

app.get("/usuarios", (req, res) => {
    res.json(listarUsuarios());
});

app.post("/login", (req, res) => {
    const { email, senha } = req.body;
    res.json(login(email, senha));
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});