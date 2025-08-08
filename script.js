document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Dicionário de Traduções
    // ==========================================
    const translations = {
        'pt': {
            'menu': 'Cardápio',
            'specials': 'Especiais',
            'contact': 'Contato',
            'ourMenu': 'Nosso Cardápio',
            'houseSpecials': 'Especiais da Casa',
            'makeReservation': 'Faça sua Reserva',
            'name': 'Nome:',
            'email': 'E-mail:',
            'message': 'Mensagem:',
            'send': 'Enviar',
            // CORREÇÃO: Usei a entidade HTML diretamente aqui para que o innerHTML a renderize.
            'footerText': '&copy; 2025 Sabor & Arte. Todos os direitos reservados.',
            'toastSuccess': 'Sua reserva foi enviada com sucesso!',
            'errorNameEmpty': 'Por favor, digite seu nome.',
            'errorEmailEmpty': 'Por favor, digite seu e-mail.',
            'errorEmailInvalid': 'Por favor, digite um e-mail válido.',
            'errorMessageEmpty': 'Por favor, digite sua mensagem.',
            // Menu Items - para traduzir textos que não são títulos
            'dish1-desc': 'Uma mistura de tomates frescos, mussarela de búfala e manjericão, regada com azeite de oliva extra virgem.',
            'dish1-ingredients': 'Ingredientes: Tomate, mussarela de búfala, manjericão, azeite de oliva extra virgem.',
            'dish2-desc': 'Arroz cremoso com cogumelos funghi porcini, queijo parmesão e um toque de azeite trufado.',
            'dish2-ingredients': 'Ingredientes: Arroz arbóreo, funghi porcini, vinho branco, queijo parmesão, azeite de trufa.',
            'dish3-desc': 'Medalhões de filé mignon grelhados, servidos com um clássico molho madeira e batatas rústicas.',
            'dish3-ingredients': 'Ingredientes: Filé mignon, vinho madeira, champignon, batatas rústicas, especiarias.',
            'dish4-desc': 'Camadas de massa fresca intercaladas com molho à bolonhesa, queijo e molho bechamel, gratinada ao forno.',
            'dish4-ingredients': 'Ingredientes: Massa de lasanha, carne moída, molho de tomate, queijo mussarela, molho bechamel.',
            'dish5-desc': 'Camarões salteados em azeite, alho e pimenta, com um toque de salsinha fresca.',
            'dish5-ingredients': 'Ingredientes: Camarão, azeite de oliva, alho, pimenta dedo de moça, salsinha.',
        },
        'en': {
            'menu': 'Menu',
            'specials': 'Specials',
            'contact': 'Contact',
            'ourMenu': 'Our Menu',
            'houseSpecials': 'House Specials',
            'makeReservation': 'Make a Reservation',
            'name': 'Name:',
            'email': 'Email:',
            'message': 'Message:',
            'send': 'Send',
            // CORREÇÃO: Usei a entidade HTML diretamente aqui para que o innerHTML a renderize.
            'footerText': '&copy; 2025 Sabor & Arte. All rights reserved.',
            'toastSuccess': 'Your reservation has been sent successfully!',
            'errorNameEmpty': 'Please enter your name.',
            'errorEmailEmpty': 'Please enter your email.',
            'errorEmailInvalid': 'Please enter a valid email address.',
            'errorMessageEmpty': 'Please enter your message.',
            // Menu Items - para traduzir textos que não são títulos
            'dish1-desc': 'A mix of fresh tomatoes, buffalo mozzarella and basil, drizzled with extra virgin olive oil.',
            'dish1-ingredients': 'Ingredients: Tomato, buffalo mozzarella, basil, extra virgin olive oil.',
            'dish2-desc': 'Creamy rice with porcini mushrooms, parmesan cheese and a touch of truffle oil.',
            'dish2-ingredients': 'Ingredients: Arborio rice, porcini mushrooms, white wine, parmesan cheese, truffle oil.',
            'dish3-desc': 'Grilled filet mignon medallions, served with a classic Madeira sauce and rustic potatoes.',
            'dish3-ingredients': 'Ingredients: Filet mignon, madeira wine, mushroom, rustic potatoes, spices.',
            'dish4-desc': 'Layers of fresh pasta interspersed with Bolognese sauce, cheese and bechamel sauce, au gratin.',
            'dish4-ingredients': 'Ingredients: Lasagna pasta, ground beef, tomato sauce, mozzarella cheese, bechamel sauce.',
            'dish5-desc': 'Shrimp sautéed in olive oil, garlic and pepper, with a touch of fresh parsley.',
            'dish5-ingredients': 'Ingredients: Shrimp, olive oil, garlic, chili pepper, fresh parsley.',
        }
    };

    // ==========================================
    // 2. Lógica de Alternância de Idioma
    // ==========================================
    const langToggleBtn = document.getElementById('language-toggle');
    let currentLang = localStorage.getItem('language') || 'pt';

    function setLanguage(lang) {
        document.documentElement.lang = lang;
        localStorage.setItem('language', lang);
        langToggleBtn.textContent = lang === 'pt' ? 'EN' : 'PT';
        applyTranslations(lang);
    }

    function applyTranslations(lang) {
        // Traduz textos estáticos usando o atributo data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang][key]) {
                // CORREÇÃO: Usa innerHTML para o rodapé para renderizar a entidade &copy;
                if (key === 'footerText') {
                    element.innerHTML = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });
        
        // Atualiza as descrições dos pratos no cardápio principal
        document.querySelectorAll('.menu-item').forEach((item, index) => {
            const dishDescElement = item.querySelector('.menu-item-description');
            const descKey = menuData[index].description;
            if (dishDescElement && translations[lang][descKey]) {
                dishDescElement.textContent = translations[lang][descKey];
            }
        });
        
        // Traduz os erros do formulário dinamicamente
        updateFormErrorMessages(lang);
    }

    function updateFormErrorMessages(lang) {
        // Adiciona um evento de input para limpar o erro ao começar a digitar
        document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(input => {
            input.addEventListener('input', () => clearError(input));
        });
    }

    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'pt' ? 'en' : 'pt';
        setLanguage(currentLang);
    });

    // Inicializa o idioma na página
    setLanguage(currentLang);

    // ==========================================
    // 3. Lógica do Tema Claro/Escuro
    // ==========================================
    const htmlElement = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = themeToggle.querySelector('.sun');
    const moonIcon = themeToggle.querySelector('.moon');

    const currentTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    }

    themeToggle.addEventListener('click', () => {
        let newTheme = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        sunIcon.classList.toggle('hidden');
        moonIcon.classList.toggle('hidden');
    });

    // ==========================================
    // 4. Dados dos Pratos e Geração Dinâmica do Cardápio
    // ==========================================
    const menuData = [
        {
            name: "Salada Caprese",
            description: "dish1-desc",
            ingredients: "dish1-ingredients",
            price: "R$ 28,00",
            image: "./images/salada.png"
        },
        {
            name: "Risoto de Funghi",
            description: "dish2-desc",
            ingredients: "dish2-ingredients",
            price: "R$ 45,00",
            image: "./images/arroz-cremoso.png"
        },
        {
            name: "Filé Mignon ao Molho Madeira",
            description: "dish3-desc",
            ingredients: "dish3-ingredients",
            price: "R$ 65,00",
            image: "./images/medalhoes.png"
        },
        {
            name: "Lasanha à Bolonhesa",
            description: "dish4-desc",
            ingredients: "dish4-ingredients",
            price: "R$ 38,00",
            image: "./images/lasanha.png"
        },
        {
            name: "Camarão ao Alho e Óleo",
            description: "dish5-desc",
            ingredients: "dish5-ingredients",
            price: "R$ 55,00",
            image: "./images/camarao.png"
        }
    ];

    const menuGrid = document.querySelector('.menu-grid');
    const modal = document.getElementById('dish-modal');
    const closeModalBtn = document.querySelector('.close-btn');

    if (menuGrid) {
        // Gera o HTML do cardápio, lendo os textos do dicionário de tradução
        menuData.forEach((item, index) => {
            const menuItemHTML = `
                <div class="menu-item" data-index="${index}">
                    <img src="${item.image}" alt="${item.name}" class="menu-item-image">
                    <div class="menu-item-content">
                        <h3>${item.name}</h3>
                        <p class="menu-item-description" data-i18n="${item.description}">${translations[currentLang][item.description]}</p>
                        <p class="menu-item-price">${item.price}</p>
                    </div>
                </div>
            `;
            menuGrid.innerHTML += menuItemHTML;
        });

        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', () => {
                const index = item.getAttribute('data-index');
                const dish = menuData[index];

                document.getElementById('modal-image').src = dish.image;
                document.getElementById('modal-title').textContent = dish.name;
                document.getElementById('modal-description').textContent = translations[currentLang][dish.description];
                document.getElementById('modal-ingredients').textContent = translations[currentLang][dish.ingredients];

                modal.classList.add('visible');
            });
        });

        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('visible');
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.classList.remove('visible');
            }
        });
    }

    // ==========================================
    // 5. Lógica do Carrossel de Pratos
    // ==========================================
    const carouselItemsContainer = document.getElementById('carousel-items');
    const prevBtn = document.querySelector('.carousel-btn.prev-btn');
    const nextBtn = document.querySelector('.carousel-btn.next-btn');
    let currentIndex = 0;

    const carouselData = [
        { name: "Salada Caprese", image: "./images/salada.png" },
        { name: "Risoto de Funghi", image: "./images/arroz-cremoso.png" },
        { name: "Filé Mignon ao Molho Madeira", image: "./images/medalhoes.png" },
        { name: "Lasanha à Bolonhesa", image: "./images/lasanha.png" },
        { name: "Camarão ao Alho e Óleo", image: "./images/camarao.png" }
    ];

    if (carouselItemsContainer) {
        carouselData.forEach(item => {
            const carouselItemHTML = `
                <div class="carousel-item">
                    <img src="${item.image}" alt="${item.name}">
                </div>
            `;
            carouselItemsContainer.innerHTML += carouselItemHTML;
        });

        const carouselItems = document.querySelectorAll('.carousel-item');
        const totalItems = carouselItems.length;

        function updateCarousel() {
            if (totalItems > 0) {
                const itemWidth = carouselItems[0].offsetWidth;
                const newPosition = -currentIndex * itemWidth;
                carouselItemsContainer.style.transform = `translateX(${newPosition}px)`;
            }
        }

        nextBtn.addEventListener('click', () => {
            const itemsPerPage = (window.innerWidth >= 1024) ? 3 : (window.innerWidth >= 768) ? 2 : 1;
            const maxIndex = totalItems - itemsPerPage;
            currentIndex = Math.min(currentIndex + 1, maxIndex);
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = Math.max(currentIndex - 1, 0);
            updateCarousel();
        });

        window.addEventListener('resize', () => {
            currentIndex = 0;
            updateCarousel();
        });

        updateCarousel();
    }

    // ==========================================
    // 6. Lógica do Formulário com Validação e Toast
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const toast = document.getElementById('toast-notification');

    function showToast(messageKey, duration = 3000) {
        toast.textContent = translations[currentLang][messageKey];
        toast.classList.remove('hidden');
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 500);
        }, duration);
    }

    function showError(input, messageKey) {
        const errorMessageElement = document.getElementById(`${input.id}-error`);
        input.classList.add('error');
        errorMessageElement.textContent = translations[currentLang][messageKey];
        errorMessageElement.style.display = 'block';
    }

    function clearError(input) {
        const errorMessageElement = document.getElementById(`${input.id}-error`);
        input.classList.remove('error');
        errorMessageElement.textContent = '';
        errorMessageElement.style.display = 'none';
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            clearError(nameInput);
            clearError(emailInput);
            clearError(messageInput);

            if (nameInput.value.trim() === '') {
                showError(nameInput, 'errorNameEmpty');
                isValid = false;
            }

            if (emailInput.value.trim() === '') {
                showError(emailInput, 'errorEmailEmpty');
                isValid = false;
            } else if (!validateEmail(emailInput.value)) {
                showError(emailInput, 'errorEmailInvalid');
                isValid = false;
            }

            if (messageInput.value.trim() === '') {
                showError(messageInput, 'errorMessageEmpty');
                isValid = false;
            }

            if (isValid) {
                showToast('toastSuccess');
                contactForm.reset();
            }
        });
    }

    // ==========================================
    // 7. Lógica do Botão Voltar ao Topo
    // ==========================================
    const scrollToTopBtn = document.getElementById('scroll-to-top-btn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});