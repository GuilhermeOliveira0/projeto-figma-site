// Função para carregar o VLibras
function carregarVLibras() {
    if (!document.querySelector('script[src="https://vlibras.gov.br/app/vlibras-plugin.js"]')) {
        const script = document.createElement('script');
        script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
        script.onload = function() {
            new window.VLibras.Widget('https://vlibras.gov.br/app');
        };
        document.body.appendChild(script);
    }
}

// Funções para controle de fonte
function aumentarFonte() {
    document.documentElement.classList.add('fonte-aumentada');
    document.documentElement.classList.remove('fonte-diminuida');
    localStorage.setItem('fonte', 'aumentada');
}

function diminuirFonte() {
    document.documentElement.classList.add('fonte-diminuida');
    document.documentElement.classList.remove('fonte-aumentada');
    localStorage.setItem('fonte', 'diminuida');
}

function resetarFonte() {
    document.documentElement.classList.remove('fonte-aumentada', 'fonte-diminuida');
    localStorage.removeItem('fonte');
}

// Função para controle de contraste
function toggleContraste() {
    document.body.classList.toggle('alto-contraste');
    if (document.body.classList.contains('alto-contraste')) {
        localStorage.setItem('contraste', 'ativo');
    } else {
        localStorage.removeItem('contraste');
    }
}

// Função para voltar ao topo
function voltarAoTopo() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Verificar preferências salvas
function carregarPreferencias() {
    if (localStorage.getItem('fonte') === 'aumentada') {
        aumentarFonte();
    } else if (localStorage.getItem('fonte') === 'diminuida') {
        diminuirFonte();
    }

    if (localStorage.getItem('contraste') === 'ativo') {
        document.body.classList.add('alto-contraste');
    }
}

// Mostrar/ocultar botão voltar ao topo
window.addEventListener('scroll', function() {
    const backToTopBtn = document.getElementById('voltar-topo');
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Carregar preferências
    carregarPreferencias();
    
    // Carregar VLibras
    carregarVLibras();
    
    // Adicionar event listeners
    document.getElementById('aumentar-fonte').addEventListener('click', aumentarFonte);
    document.getElementById('diminuir-fonte').addEventListener('click', diminuirFonte);
    document.getElementById('resetar-fonte').addEventListener('click', resetarFonte);
    document.getElementById('toggle-contraste').addEventListener('click', toggleContraste);
    document.getElementById('voltar-topo').addEventListener('click', voltarAoTopo);
});