const camposDoFormulario = document.querySelectorAll('[required]')
const formulario = document.querySelector('[data-formulario]');

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const listaRespostas = {
        "email": e.target.elements["email"].value,
        "senha": e.target.elements["senha"].value
    }

    if (validaLogin(listaRespostas.email, listaRespostas.senha)) {
        localStorage.setItem("login", JSON.stringify(listaRespostas)); 
        window.location.href = "./index.html";
    } else {
        alert("E-mail ou senha inválidos");
    }
});

camposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo));
    campo.addEventListener("invalid", evento => evento.preventDefault())
});

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

const mensagens = {
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um email válido."
    },
    senha: {
        valueMissing: "O campo de senha não pode estar vazio.",
        tooShort: "A senha deve ter no mínimo 6 caracteres."
    }
}

function verificaCampo(campo) {
    let mensagem = "";
    campo.setCustomValidity('');
    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro];
            console.log(mensagem);
        }
    })
    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
    const validadorDeInput = campo.checkValidity();

    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem;
    } else {
        mensagemErro.textContent = "";
    }
}

function validaLogin(email, senha) {
    const cadastro = JSON.parse(localStorage.getItem("cadastro"));

    if (cadastro && cadastro.email === email && cadastro.senha === senha) {
        return true;
    }
    return false;
}