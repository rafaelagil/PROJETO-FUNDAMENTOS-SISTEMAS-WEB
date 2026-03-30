document.addEventListener("DOMContentLoaded", function () {


// =============================
// FORMULÁRIO DE AGENDAMENTO
// =============================

const form = document.getElementById("formAgendamento");

if(form){

form.addEventListener("submit", function (event) {

event.preventDefault();

const agendamento = {

nome: document.getElementById("nome").value,
cpf: document.getElementById("cpf").value,
telefone: document.getElementById("telefone").value,
email: document.getElementById("email").value,
endereco: document.getElementById("endereco").value,

nomePet: document.getElementById("nomePet").value,
raca: document.getElementById("raca").value,
idade: document.getElementById("idade").value,

servico: document.getElementById("servico").value,
metodo: document.getElementById("metodo").value,
data: document.getElementById("dataAgendamento").value,
hora: document.getElementById("horaAgendamento").value

};

let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

agendamentos.push(agendamento);

localStorage.setItem("agendamentos", JSON.stringify(agendamentos));

alert("Agendamento realizado com sucesso!");

form.reset();

});

}


// =============================
// LOGIN ADMIN
// =============================

const loginForm = document.getElementById("loginForm");

if(loginForm){

loginForm.addEventListener("submit", function(e){

e.preventDefault();

const usuario = document.getElementById("usuario").value;
const senha = document.getElementById("senha").value;

if(usuario === "admin" && senha === "123456"){

localStorage.setItem("adminLogado", "true");

window.location.href = "listaAgendamentos.html";

}else{

alert("Usuário ou senha inválidos");

}

});

}


// =============================
// LISTA DE AGENDAMENTOS
// =============================

const lista = document.getElementById("listaAgendamentos");

if(lista){

// Proteção de rota (só admin acessa)
if(localStorage.getItem("adminLogado") !== "true"){
window.location.href = "login.html";
return;
}

carregarAgendamentos();

}

function carregarAgendamentos(){

const lista = document.getElementById("listaAgendamentos");

const agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

lista.innerHTML = "";

if(agendamentos.length === 0){

lista.innerHTML = `
<tr>
<td colspan="8" class="text-center text-muted">
Nenhum agendamento encontrado
</td>
</tr>
`;

return;

}

agendamentos.forEach((item, index)=>{

let dataFormatada = new Date(item.data).toLocaleDateString("pt-BR");

lista.innerHTML += `
<tr>
<td>${item.nome}</td>
<td>${item.nomePet}</td>
<td>${item.servico}</td>
<td>${item.metodo}</td>
<td>${dataFormatada}</td>
<td>${item.hora}</td>
<td>${item.telefone}</td>
<td>
<button 
class="btn btn-danger btn-sm"
onclick="excluir(${index})">
Excluir
</button>
</td>
</tr>
`;

});

}


// =============================
// EXCLUIR AGENDAMENTO
// =============================

window.excluir = function(index){

const confirmar = confirm("Deseja excluir este agendamento?");

if(!confirmar) return;

let agendamentos = JSON.parse(localStorage.getItem("agendamentos"));

agendamentos.splice(index,1);

localStorage.setItem("agendamentos", JSON.stringify(agendamentos));

carregarAgendamentos();

}


// =============================
// LOGOUT
// =============================

window.logout = function(){

localStorage.removeItem("adminLogado");

window.location.href = "login.html";

}

});