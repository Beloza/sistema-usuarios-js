const express = require("express");

const app = express();

app.use(express.json());

let usuarios = [];

// 🔐 função de segurança
function ocultarSenha(usuario) {
    return {
        nome: usuario.nome,
        email: usuario.email
    };
}

// 🔧 cadastrar
function cadastrarUsuario(nome, email, senha) {

    if (!nome || nome.length < 3) {
        return { sucesso: false, mensagem: "Nome inválido" };
    }

    if (!email.includes("@") || !email.includes(".")) {
        return { sucesso: false, mensagem: "Email inválido" };
    }

    if (!senha || senha.length < 4) {
        return { sucesso: false, mensagem: "Senha muito curta" };
    }

    for (let usuario of usuarios) {
        if (usuario.email === email) {
            return { sucesso: false, mensagem: "Email já cadastrado" };
        }
    }

    let novoUsuario = { nome, email, senha };

    usuarios.push(novoUsuario);

    return {
        sucesso: true,
        mensagem: "Usuário cadastrado",
        dados: ocultarSenha(novoUsuario)
    };
}

// 🔧 listar
function listarUsuarios() {
    return {
        sucesso: true,
        dados: usuarios.map(ocultarSenha)
    };
}

// 🔧 login
function login(email, senha) {
    for (let usuario of usuarios) {
        if (usuario.email === email && usuario.senha === senha) {
            return {
                sucesso: true,
                mensagem: "Login OK",
                dados: ocultarSenha(usuario)
            };
        }
    }

    return { sucesso: false, mensagem: "Login inválido" };
}

// 🔧 rotas
app.post("/usuarios", (req, res) => {
    const { nome, email, senha } = req.body;
    const resposta = cadastrarUsuario(nome, email, senha);
    res.json(resposta);
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