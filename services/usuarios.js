
const Usuario = require("../models/Usuario");

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

    const usuarios = await usuarios.find();

    return {
        sucesso: true,
        dados: usuarios.map(u => ({
            nome: u.nome,
            email: u.email
        }))
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

