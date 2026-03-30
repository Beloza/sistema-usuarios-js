
require("dotenv").config();

const SECRET = process.env.SECRET;

let usuarios = [];

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

function ocultarSenha(usuario) {
    return {
        nome: usuario.nome,
        email: usuario.email
    };
}

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
    const senhaCriptografada = bcrypt.hashSync(senha, 10);

    let novoUsuario = {
        nome,
        email,
        senha: senhaCriptografada
    };

    usuarios.push(novoUsuario);



    return {
        sucesso: true,
        mensagem: "Usuário cadastrado",
        dados: ocultarSenha(novoUsuario)
    };
}

function listarUsuarios() {
    return {
        sucesso: true,
        dados: usuarios.map(ocultarSenha)
    };
}

function login(email, senha) {
    for (let usuario of usuarios) {
        if (
            usuario.email === email &&
            bcrypt.compareSync(senha, usuario.senha)
        ) {

            const token = jwt.sign(
                { email: usuario.email },
                SECRET,
                { expiresIn: "1h" }
            );

            return {
                sucesso: true,
                mensagem: "Login OK",
                token: token
            };
        }
    }

    return { sucesso: false, mensagem: "Login inválido" };
}

module.exports = {
    cadastrarUsuario,
    listarUsuarios,
    login
};