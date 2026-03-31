require("dotenv").config();

const cors = require("cors");
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

const {
    cadastrarUsuario,
    listarUsuarios,
    login
} = require("./services/usuarios");

const SECRET = process.env.SECRET;

// ROTAS

app.post("/usuarios", async (req, res) => {
    const { nome, email, senha } = req.body;
    const resposta = await cadastrarUsuario(nome, email, senha);
    res.json(resposta);
});

app.post("/login", async (req, res) => {
    const { email, senha } = req.body;

    const resposta = await login(email, senha);

    console.log(resposta); // opcional pra debug

    res.json(resposta);
});

app.get("/usuarios", verificarToken, async (req, res) => {
    const resposta = await listarUsuarios();
    res.json(resposta);
});

// MIDDLEWARE TOKEN

function verificarToken(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            sucesso: false,
            mensagem: "Token não fornecido"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        jwt.verify(token, SECRET);
        next();
    } catch (error) {
        return res.status(401).json({
            sucesso: false,
            mensagem: "Token inválido"
        });
    }
}

// BANCO

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Banco conectado"))
    .catch(err => console.log(err));

// SERVER

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

