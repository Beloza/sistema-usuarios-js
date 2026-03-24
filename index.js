let usuarios = [];

console.log("Siatema iniciado");

function cadastrarUsuario(nome, email, senha) {

    let novoUsuario = {
        nome: nome,
        email: email,
        senha: senha
    };
    usuarios.push(novoUsuario);

    console.log("Usuario cadastrado");
}
cadastrarUsuario("Antonio", "antonio@email", "1234");
console.log(usuarios);