// Seletores para os elementos principais
const openMenuButton = document.querySelector('.openMenu');
const closeMenuButton = document.querySelector('.closeMenu');
const sidebar = document.querySelector('.sidebar');
const navbarElements = document.querySelector('.navbarElements');

// Função para abrir o menu lateral
openMenuButton.addEventListener('click', () => {
    sidebar.classList.add('active'); // Exibe a barra lateral
});

// Função para fechar o menu lateral
closeMenuButton.addEventListener('click', () => {
    sidebar.classList.remove('active'); // Esconde a barra lateral
});

// Gerenciamento da exibição do `navbarElements` em telas maiores
window.addEventListener('resize', () => {
    if (window.innerWidth > 990) {
        // Garante que `navbarElements` está sempre visível em telas grandes
        navbarElements.style.display = 'flex';
        sidebar.classList.remove('active'); // Garante que o menu colapsável está fechado
    } else {
        // Esconde o `navbarElements` e permite o menu colapsável
        navbarElements.style.display = 'none';
    }
});

// Inicializa o estado correto ao carregar a página
if (window.innerWidth > 990) {
    navbarElements.style.display = 'flex'; // Mostra `navbarElements` para telas maiores
} else {
    navbarElements.style.display = 'none'; // Esconde `navbarElements` para telas menores
}

// --- ADICIONANDO FUNCIONALIDADE DA NavigationPage --- //
class NavigationPage {
    constructor() {
        this.currentId = null;
        this.currentTab = null;
        this.tabContainerHeight = 70;
        this.lastScroll = 0;

        // Adicionando evento de clique aos links do menu
        document.querySelectorAll('.navbarItem a').forEach((tab) => {
            tab.addEventListener('click', (event) => {
                const href = tab.getAttribute('href');
                if (href.includes('.html') && !href.startsWith('#')) {
                    // Permite navegação normal para outras páginas HTML
                    return;
                }
                this.onTabClick(event, tab);
            });
        });

        // Eventos de scroll e resize
        window.addEventListener('scroll', () => this.onScroll());
        window.addEventListener('resize', () => this.onResize());
    }

    onTabClick(event, element) {
        event.preventDefault();
        const targetId = element.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const scrollTop = targetElement.offsetTop - this.tabContainerHeight + 1;
            window.scrollTo({ top: scrollTop, behavior: 'smooth' });
        }
    }

    onScroll() {
        this.checkHeaderPosition();
        this.findCurrentTabSelector();
        this.lastScroll = window.scrollY;
    }

    onResize() {
        if (this.currentId) {
            this.setSliderCss();
        }
    }

    checkHeaderPosition() {
        const headerHeight = window.innerHeight; // Altura do cabeçalho
        const navContainer = document.querySelector('.navbar');
    
        // Quando o scroll ultrapassa o header, o navbar muda para top: 0
        if (window.scrollY > headerHeight) {
            navContainer.classList.add('navbar--fixed');
            navContainer.style.bottom = 'auto';
            navContainer.style.top = '0';
        } else {
            // Quando volta ao topo, o navbar retorna para bottom: 0
            navContainer.classList.remove('navbar--fixed');
            navContainer.style.top = 'auto';
            navContainer.style.bottom = '0';
        }
    }    

    findCurrentTabSelector() {
        let newCurrentId = null;
        let newCurrentTab = null;
        const self = this;

        document.querySelectorAll('.navbarItem a').forEach((tab) => {
            const id = tab.getAttribute('href');
            const targetElement = document.querySelector(id);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - self.tabContainerHeight;
                const offsetBottom =
                    targetElement.offsetTop + targetElement.offsetHeight - self.tabContainerHeight;

                if (window.scrollY > offsetTop && window.scrollY < offsetBottom) {
                    newCurrentId = id;
                    newCurrentTab = tab;
                }
            }
            if (this.currentTab) {
                document.querySelectorAll('.navbarItem a').forEach((link) => {
                    link.classList.remove('active');
                });
                this.currentTab.classList.add('active');
            }
        });

        if (this.currentId !== newCurrentId || this.currentId === null) {
            this.currentId = newCurrentId;
            this.currentTab = newCurrentTab;
            this.setSliderCss();
        }
    }

    setSliderCss() {
        if (this.currentTab) {
            const slider = document.querySelector('.nav-tab-slider');
            const tabRect = this.currentTab.getBoundingClientRect();
            const navbarRect = document.querySelector('.navbar').getBoundingClientRect();

            slider.style.width = `${tabRect.width}px`;
            slider.style.left = `${tabRect.left - navbarRect.left}px`;
        }
    }
}

// Inicializando a navegação
new NavigationPage();
