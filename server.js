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
        jwt.verify(token, "minha_chave_secreta");
        next();
    } catch (error) {
        return res.status(401).json({
            sucesso: false,
            mensagem: "Token inválido"
        });
    }
}

app.get("/usuarios", verificarToken, (req, res) => {
    res.json(listarUsuarios());
});

const jwt = require("jsonwebtoken");

const SECRET = "minha_chave_secreta";

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

app.get("/usuarios", verificarToken, (req, res) => {
    res.json(listarUsuarios());
});