let usuarios = [];

console.log("Siatema iniciado");

function cadastrarUsuario(nome, email, senha) {
    if (!nome || nome.length < 3) {
        return "Nome invalido(minimo 3 caracteres)";
    }

    if (!email.includes("@") || !email.includes(".")) {
        return "Email invalido";
    }

    if (!senha || senha.length < 4) {
        return "Senha muito curta(minimo 4 caracteres)";
    }

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

console.log(cadastrarUsuario("", "teste@email.com", "1234"));
console.log(cadastrarUsuario("An", "teste@email.com", "1234"));
console.log(cadastrarUsuario("Ana", "testeemail.com", "1234"));
console.log(cadastrarUsuario("Ana", "teste@email.com", "12"));
console.log(cadastrarUsuario("Ana", "teste@email.com", "1234"));
console.log(cadastrarUsuario("Ana", "teste@email.com", "1234")); // duplicado