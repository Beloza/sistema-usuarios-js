let usuarios = [];

console.log("Siatema iniciado");

function cadastrarUsuario(nome, email, senha) {
    if (!nome || nome.length < 3) {
        return {
            sucesso: false,
            mensagem: "Nome invalido(minimo 3 caracteres)"
        }

        if (!email.includes("@") || !email.includes(".")) {
            return {
                sucesso: false,
                mensagem: "Email invalido"
            }
        }

        if (!senha || senha.length < 4) {
            return {
                sucesso: false,
                mensagem: "Senha muito curta(minimo 4 caracteres)"
            }

        }

        for (let usuario of usuarios) {
            if (usuario.email === email) {
                return {
                    sucesso: false,
                    mensagem: "Email ja cadastrado"
                }

            }
        }
    }
    let novoUsuario = { nome, email, senha };

    usuarios.push(novoUsuario);

    return {
        sucesso: true,
        mensagem: "Usuario cadastrado com sucesso",
        dados: ocultarSenha(novoUsuario)
    };
}

function listarUsuarios() {
    if (usuarios.length === 0) {
        return {
            sucesso: false,
            mensagem: "Nenhum usuario cadastrado",
            dados: []
        };
    }
    let listaSegura = [];

    for (let usuario of usuarios) {
        listaSegura.push(ocultarSenha(usuario))
    }

    return {
        sucesso: true,
        mensagem: "Lista de usuarios",
        dados: listaSegura
    };
}

function buscarUsuario(email) {
    for (let usuario of usuarios) {
        if (usuario.email === email) {
            return {
                sucesso: true,
                mensagem: "Usuario encontrado",
                dados: ocultarSenha(usuario)
            };

        }
    }
    return {
        sucesso: false,
        mensagem: "Usuario não encontrado",
        dados: null
    };
}

function login(email, senha) {
    for (let usuario of usuarios) {
        if (usuario.email === email && usuario.senha === senha) {
            return {
                sucesso: true,
                mensagem: "Login realizado",
                dados: ocultarSenha(usuario)
            };

        }

    }
    return {
        sucesso: false,
        mensagem: "Login inválido",
        dados: null
    };
}

function deletarUsuario(email) {
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email === email) {
            let removido = usuarios.splice(i, 1);
            return {
                sucesso: true,
                mensagem: "Usuario removido",
                dados: ocultarSenha(removido[0])
            }


        }
    }
    return "Usuario não encontrado";

}

function ocultarSenha(usuario) {
    return {
        nome: usuario.nome,
        email: usuario.email
    };
}
let resposta;

resposta = cadastrarUsuario("Antonio", "antonio@email.com", "1234");
console.log(resposta);

resposta = listarUsuarios();
console.log(resposta);

resposta = login("antonio@email.com", "1234");
console.log(resposta);