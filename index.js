let usuarios = [];

console.log("Siatema iniciado");

function cadastrarUsuario(nome, email, senha) {

    for (let usuario of usuarios) {
        if (usuario.email === email) {
            return "Email ja cadastrado";

        }
    }

    let novoUsuario = {
        nome: nome,
        email: email,
        senha: senha
    };
    usuarios.push(novoUsuario);

    return "Usuario cadastrado";
}

function listarUsuarios() {
    if (usuarios.length === 0) {
        return "Nenhum usuario cadastrado";
    }

    for (let usuario of usuarios) {
        return `Nome: ${usuario.nome} | Email: ${usuario.email}`;
    }
}

function buscarUsuario(email) {
    for (let usuario of usuarios) {
        if (usuario.email === email) {
            return "Usuario encontrado";

        }
    }
    return "Usuario não encontrado";
}

function login(email, senha) {
    for (let usuario of usuarios) {
        if (usuario.email === email && usuario.senha === senha) {
            return "Login realizado";

        }

    }
    return "Login inválido";
}

function deletarUsuario(email) {
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email === email) {
            usuarios.splice(i, 1);
            return "Usuario removido";


        }
    }
    return "Usuario não encontrado";

}

console.log(cadastrarUsuario("Antonio", "antonio@email.com", "1234"));

console.log(listarUsuarios());

console.log(buscarUsuario("antonio@email.com"));

console.log(login("antonio@email.com", "1234"));

console.log(deletarUsuario("antonio@email.com"));

console.log(listarUsuarios());