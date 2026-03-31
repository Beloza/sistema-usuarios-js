const Usuario = require("../models/Usuario");

require("dotenv").config();

const SECRET = process.env.SECRET;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function ocultarSenha(usuario) {
    return {
        nome: usuario.nome,
        email: usuario.email
    };
}

async function cadastrarUsuario(nome, email, senha) {

    if (!nome || nome.length < 3) {
        return { sucesso: false, mensagem: "Nome inválido" };
    }

    const usuarioExistente = await Usuario.findOne({ email });

    if (usuarioExistente) {
        return { sucesso: false, mensagem: "Email já cadastrado" };
    }

    const senhaCriptografada = bcrypt.hashSync(senha, 10);

    const novoUsuario = await Usuario.create({
        nome,
        email,
        senha: senhaCriptografada
    });

    return {
        sucesso: true,
        mensagem: "Usuário cadastrado",
        dados: {
            nome: novoUsuario.nome,
            email: novoUsuario.email
        }
    };
}

async function listarUsuarios() {

    const usuarios = await Usuario.find();

    return {
        sucesso: true,
        dados: usuarios.map(u => ({
            nome: u.nome,
            email: u.email
        }))
    };
}

async function login(email, senha) {

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
        return { sucesso: false, mensagem: "Login inválido" };
    }

    const senhaValida = bcrypt.compareSync(senha, usuario.senha);

    if (!senhaValida) {
        return { sucesso: false, mensagem: "Login inválido" };
    }

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

module.exports = {
    cadastrarUsuario,
    listarUsuarios,
    login
};