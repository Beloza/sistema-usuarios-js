const API = "http://localhost:3000";

let token = "";


async function cadastrar() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const resposta = await fetch(`$ {
            API
        }

        /usuarios`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }

        ,
        body: JSON.stringify({
            nome, email, senha
        })
    });

    const dados = await resposta.json();
    alert(dados.mensagem);
}

// LOGIN
async function login() {
    const email = document.getElementById("loginEmail").value;
    const senha = document.getElementById("loginSenha").value;

    const resposta = await fetch(`$ {
            API
        }

        /login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }

        ,
        body: JSON.stringify({
            email, senha
        })
    });

    const dados = await resposta.json();

    if (dados.token) {
        token = dados.token;
        alert("Login realizado!");
    }

    else {
        alert("Erro no login");
    }
}

// LISTAR USUÁRIOS
async function listar() {
    const resposta = await fetch(`$ {
            API
        }

        /usuarios`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer $ {
                token
            }

            `
        }
    });

    const dados = await resposta.json();

    const lista = document.getElementById("listaUsuarios");
    lista.innerHTML = "";

    if (dados.dados) {
        for (let usuario of dados.dados) {
            const li = document.createElement("li");

            li.innerText = `$ {
            usuario.nome
        }

        - $ {
            usuario.email
        }

        `;
            lista.appendChild(li);
        }
    }
}