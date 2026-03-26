let usuarios = [];

console.log("Siatema iniciado");

function cadastrarUsuario(nome, email, senha) {

    for (let usuario of usuarios) {
        if (usuario.email === email) {
            console.log("Email ja cadastrado");
            return;
        }
    }

    let novoUsuario = {
        nome: nome,
        email: email,
        senha: senha
    };
    usuarios.push(novoUsuario);

    console.log("Usuario cadastrado");
}

function listarUsuarios() {
    for (let usuario of usuarios) {
        console.log(`Nome: ${usuario.nome} | Email: ${usuario.email});`)
    }
}

function buscarUsuario(email) {
    for (let usuario of usuarios) {
        if (usuario.email === email) {
            console.log("Usuario encontrado");
            return;
        }
    }
    console.log("Usuario não encontrado");
}

function login(email, senha) {
    for (let usuario of usuarios) {
        if (usuario.email === email && usuario.senha === senha) {
            console.log("Login realizado");
            return;
        }

    }
    console.log("Login inválido");
}

cadastrarUsuario("Antonio", "antonio@email.com", "1234");

buscarUsuario("antonio@email.com");

login("antonio@email.com", "1234");