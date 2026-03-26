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
    if (usuarios.length === 0) {
        console.log("Nenhum usuario cadastrado");
    }

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

function deletarUsuario(email) {
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email === email) {
            usuarios.splice(i, 1);
            console.log("Usuario removido");
            return;

        }
    }
    console.log("Usuario não encontrado");

}

cadastrarUsuario("Antonio", "antonio@email.com", "1234");

listarUsuarios()

buscarUsuario("antonio@email.com");

login("antonio@email.com", "1234");

deletarUsuario("antonio@email.com");

listarUsuarios();
