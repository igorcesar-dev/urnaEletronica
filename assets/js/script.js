/* Variáveis de controle de interface */

let votoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');

/* Variáveis de controle de ambiente */

let etapaAtual = 0;
let numero = '';
let votoBranco = true;
let votos = [];

/* Esta função inica o processo de votação */
function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHtml += '<div class="numero pisca"></div>'
        }
        numeroHtml += '<div class="numero"></div>'
    }

    votoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

/* Esta função é responsável por Atualizar as informações inseridas */
function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });

    if (candidato.length > 0) {
        candidato = candidato[0];
        votoPara.style.display = 'block';
        aviso.style.display = 'block'
        descricao.innerHTML = `Nome: ${candidato.nome}<br>Partido: ${candidato.partido}`;
        
        let fotosHtml = '';

        for (let i in candidato.fotos) {
            if(candidato.fotos[i].small){
                fotosHtml += `<div class="d-1-image small"><img src="assets/img/${candidato.fotos[i].url}" alt=""> ${candidato.fotos[i].legenda} </div>`
            } else {
                fotosHtml += `<div class="d-1-image"><img src="assets/img/${candidato.fotos[i].url}" alt=""> ${candidato.fotos[i].legenda} </div>`
            }
        }
        lateral.innerHTML = fotosHtml;
    } else {
        votoPara.style.display = 'block';
        aviso.style.display = 'block'
        descricao.innerHTML = `<div class="aviso--grande pisca">VOTO NULO</div>`;
    };
}


/* Função responsável pelas ações de clique */
function clicou(n) {
    let elementoNumero = document.querySelector('.numero.pisca');
    if (elementoNumero !== null) {
        elementoNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elementoNumero.classList.remove('pisca');
        if (elementoNumero.nextElementSibling !== null) {
            elementoNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
    }
}

/* Função responsável pelo botão branco */
function branco() {
    if (numero === '') {
        votoBranco = true;
        votoPara.style.display = 'block';
        aviso.style.display = 'block'
        numeros.innerHTML = '';
        descricao.innerHTML = `<div class="aviso--grande pisca">VOTO EM BRANCO</div>`;
    } else {
        alert('Para votar em BRANCO, não pode ter digitado nenhum número!')
    }
}

/* Função responsável pelo botão corrige */
function corrige() {
    comecarEtapa();
}

/* Função responsável pelo botão confirma */
function confirma() {
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;

    if(votoBranco === true){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    } else if(numero.length = etapa.numeros){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    if(votoConfirmado = true){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = `<div class="aviso--gigante pisca">FIM</div>`;
            console.log(votos);
        }
    }
}

comecarEtapa();