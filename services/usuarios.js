let usuarios = [];

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

    let novoUsuario = { nome, email, senha };

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

module.exports = {
    cadastrarUsuario,
    listarUsuarios,
    login
};