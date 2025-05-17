// script.js

// Array de produtos (certifique-se de que os caminhos das imagens estão corretos!)
const products = [
    { id: 1, name: 'Violão Michael VM68K', price: 99.90, description: 'Violão acústico com ótima sonoridade, ideal para iniciantes.', image: 'images/Violao_caio.jpg', category: 'violao' },
    { id: 2, name: 'Baixo do Mendigo', price: 600.00, description: 'Baixo totalmente "vagabundo" foi adquirido de um mendigo perto do seu Senai. Apesar da origem peculiar, possui um som surpreendente para o preço.', image: 'images/Baixo_caio.jpg" class="product-image">', category: 'baixo' },
    { id: 3, name: 'Guitarra Giannini G101', price: 600.00, description: 'Guitarra elétrica versátil para diversos estilos musicais, com bom timbre e tocabilidade. Ideal para quem busca um instrumento de entrada com qualidade.', image: 'images/guitarra_caio.jpg', category: 'guitarra' },
    { id: 4, name: 'Baixo Yamaha TRBX174', price: 1200.00, description: 'Baixo elétrico com design avançado e ótimo para iniciantes e intermediários.', image: 'images/baixo_yamaha.jpg', category: 'baixo' },
    { id: 5, name: 'Violão Takamine GD11M', price: 800.00, description: 'Violão acústico com acabamento elegante, perfeito para estudantes e apresentações.', image: 'images/violao_GD11M.jpg', category: 'violao' },
    { id: 6, name: 'Guitarra Fender Stratocaster', price: 3500.00, description: 'Guitarra clássica com timbre icônico, ideal para rock, blues e jazz.', image: 'images/guita-fender.jpg', category: 'guitarra' },
    { id: 7, name: 'Baixo Tagima TW65', price: 1100.00, description: 'Baixo com excelente custo-benefício e tocabilidade suave para diversos ritmos.', image: 'images/baixo_caio.jpg', category: 'baixo' },
    { id: 8, name: 'Violão Yamaha C40', price: 700.00, description: 'Violão clássico de nylon, som rico e quente. Ideal para estudos e performances.', image: 'images/violao_caio.jpg', category: 'violao' },
];

document.addEventListener('DOMContentLoaded', () => {
    // Função para atualizar o contador do carrinho no header

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            // Calcula a soma das quantidades de todos os itens no carrinho
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCountElement.textContent = totalItems;
        }
    }

    // Função para renderizar produtos em um container específico
    function renderProducts(targetElementId, productsToRender) {
        const container = document.getElementById(targetElementId);
        if (!container) return; // Sai da função se o container não existir

        container.innerHTML = ''; // Limpa o container antes de adicionar os produtos

        if (productsToRender.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #ccc;">Nenhum produto encontrado nesta categoria.</p>';
            return;
        }

        productsToRender.forEach(product => {
            const productCardHtml = `
                <a href="product-detail.html?id=${product.id}" class="product-link">
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.name}" class="product-image">
                        <div class="product-info">
                            <h3>${product.name}</h3>
                            <p class="product-description">${product.description}</p>
                            <span class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                            <button class="add-to-cart" data-product-id="${product.id}">Adicionar ao Carrinho</button>
                        </div>
                    </div>
                </a>
            `;
            container.insertAdjacentHTML('beforeend', productCardHtml);
        });

        // Adiciona event listeners aos botões de adicionar ao carrinho
        container.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault(); // Evita que o link seja clicado
                event.stopPropagation(); // Evita que o clique se propague para o product-link
                const productId = parseInt(button.dataset.productId);
                const productToAdd = products.find(p => p.id === productId);
                if (productToAdd) {
                    addToCart(productToAdd);
                }
            });
        });
    }

    // Função para adicionar produto ao carrinho
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            // Garante que a quantidade seja 1 ao adicionar um novo item
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showNotification(`${product.name} adicionado ao carrinho!`);
    }

    // Função para exibir notificações (Adicionar ao Carrinho, etc.)
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.classList.add('notification');
        if (type === 'warning') {
            notification.style.backgroundColor = '#ffc107'; // Amarelo
            notification.style.color = '#333';
            notification.style.borderColor = '#e0a800';
        } else if (type === 'error') {
            notification.style.backgroundColor = '#dc3545'; // Vermelho mais claro
            notification.style.color = '#fff';
            notification.style.borderColor = '#c82333';
        } else { // success (default)
            notification.style.backgroundColor = 'var(--vermelho)'; // Sua cor de sucesso
            notification.style.color = 'var(--dourado)';
            notification.style.borderColor = 'var(--dourado)';
        }

        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            notification.addEventListener('transitionend', () => {
                notification.remove();
            }, { once: true });
        }, 3000);
    }


    // --- Lógica para PÁGINA INICIAL (index.html) ---
    if (document.getElementById('featured-products')) {
        // Renderiza apenas alguns produtos para a seção de destaques na Home
        renderProducts('featured-products', products.slice(0, 3)); // Mostra os 3 primeiros como destaque

        // script.js

const products = [
    {
        id: 'violao-michael-vm68k', // ID único para o produto
        name: 'Violão Michael VM68K',
        image: 'images/Violao_caio.jpg', // Caminho da imagem
        price: 99.90,
        description: 'Violão acústico com ótima sonoridade, ideal para iniciantes.',
        specs: [
            'Tipo: Acústico',
            'Cordas: Nylon',
            'Cor: Preto',
            'Tampo: Spruce',
            'Lateral e Fundo: Linden',
            'Braço: Nato',
            'Escala: Rosewood',
            'Trastes: 20',
            'Acabamento: Fosco'
        ]
    },
    {
        id: 'baixo-do-mendigo',
        name: 'Baixo do Mendigo',
        image: 'images/Baixo_caio.jpg', // Caminho da imagem
        price: 600.00,
        description: 'Baixo totalmente "vagabundo" foi adquirido de um mendigo perto do seu Senai. Apesar da origem peculiar, possui um som surpreendente para o preço.',
        specs: [
            'Tipo: Elétrico',
            'Cordas: 4',
            'Cor: Preto',
            'Corpo: Madeira maciça',
            'Braço: Maple',
            'Trastes: 24'
        ]
    },
    {
        id: 'guitarra-giannini-g101',
        name: 'Guitarra Giannini G101',
        image: 'images/Guitarra_caio.jpg', // Caminho da imagem
        price: 600.00,
        description: 'Guitarra elétrica versátil para diversos estilos musicais, com bom timbre e tocabilidade. Ideal para quem busca um instrumento de entrada com qualidade.',
        specs: [
            'Tipo: Elétrica',
            'Cordas: 6',
            'Cor: Creme/Vermelho',
            'Ponte: Tremolo',
            'Captadores: Single Coil',
            'Trastes: 22'
        ]
    },
    {
        id: 'baixo-yamaha-trbx174',
        name: 'Baixo Yamaha TRBX174',
        image: 'images/Baixo_TRBX.jpg',
        price: 1200.00,
        description: 'Baixo elétrico com design inovador e ótima tocabilidade. Perfeito para uma sonoridade sólida e confortável que se encaixa em diversos estilos musicais.',
        specs: [
            'Tipo: Elétrico',
            'Cordas: 4',
            'Cor: Amarelo',
            'Corpo: Mogno',
            'Braço: Maple',
            'Trastes: 24'
        ]
    },
    {
        id: 'violao-takamine-gd11m',
        name: 'Violão Takamine GD11M',
        image: 'images/violao_GD11M.jpg',
        price: 800.00,
        description: 'Violão acústico com excelente projeção sonora e acabamento elegante. Perfeito para estudantes e para aprimoramento das técnicas.',
        specs: [
            'Tipo: Acústico',
            'Cordas: Aço',
            'Cor: Natural',
            'Tampo: Mogno',
            'Fundo e Laterais: Mogno',
            'Braço: Mogno',
            'Escala: Rosewood',
            'Trastes: 20'
        ]
    },
    {
        id: 'guitarra-fender-stratocaster',
        name: 'Guitarra Fender Stratocaster',
        image: 'images/guita-fender.jpg',
        price: 3800.00,
        description: 'Guitarra clássica com timbre lendário e versatilidade incomparável. A escolha de muitos profissionais ao redor do mundo.',
        specs: [
            'Tipo: Elétrica',
            'Cordas: 6',
            'Cor: Sunburst',
            'Corpo: Alder',
            'Braço: Maple',
            'Trastes: 21',
            'Ponte: Tremolo Vintage'
        ]
    },
    {
        id: 'baixo-tagima-tw66',
        name: 'Baixo Tagima TW66',
        image: 'images/baixo_yamaha.jpg', // Embora seja o "baixo_yamaha.jpg", usei aqui pois você o tinha na pasta. Se tiver um Tagima, atualize.
        price: 1100.00,
        description: 'Baixo com design moderno, conforto e excelente custo-benefício. Sonoridade robusta e braço confortável para diversas situações musicais.',
        specs: [
            'Tipo: Elétrico',
            'Cordas: 4',
            'Cor: Preto',
            'Corpo: Basswood',
            'Braço: Maple',
            'Trastes: 24'
        ]
    },
    {
        id: 'violao-yamaha-c40',
        name: 'Violão Yamaha C40',
        image: 'images/violao_c40.jpg',
        price: 700.00,
        description: 'Violão clássico com excelente qualidade de som e construção. Recomendado por professores para estudantes e iniciantes.',
        specs: [
            'Tipo: Clássico',
            'Cordas: Nylon',
            'Cor: Natural',
            'Tampo: Spruce',
            'Fundo e Laterais: Meranti',
            'Braço: Nato',
            'Escala: Rosewood',
            'Trastes: 18'
        ]
    }
];

// O restante do seu script.js deve vir depois dessa declaração de 'products'
// ... (código existente do carrinho, notificações, etc.)
    }

    // --- Lógica para PÁGINA DE PRODUTOS (products.html) ---
    if (document.getElementById('all-products')) {
        renderProducts('all-products', products); // Renderiza TODOS os produtos inicialmente

        // Adiciona funcionalidade aos botões de filtro
        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', () => {
                // Remove a classe 'active' de todos os botões de filtro
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                // Adiciona a classe 'active' ao botão clicado
                button.classList.add('active');

                const category = button.dataset.category; // Pega o valor de data-category
                const filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
                renderProducts('all-products', filteredProducts);
            });
        });
    }

    // --- Lógica para a PÁGINA DO CARRINHO (cart.html) ---
    if (document.querySelector('.cart-section')) {
        function renderCartItems() {
            const cartItemsContainer = document.querySelector('.cart-items-container');
            const emptyCartMessage = document.querySelector('.empty-cart');
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            if (cart.length === 0) {
                if (cartItemsContainer) cartItemsContainer.innerHTML = ''; // Limpa os itens se estiver vazio
                if (emptyCartMessage) emptyCartMessage.style.display = 'block'; // Mostra a mensagem de vazio
            } else {
                if (emptyCartMessage) emptyCartMessage.style.display = 'none'; // Oculta a mensagem de vazio
                if (cartItemsContainer) {
                    cartItemsContainer.innerHTML = '<h2>Seu Carrinho</h2>'; // Adiciona o título novamente
                }

                cart.forEach(item => {
                    const cartItemHtml = `
                        <div class="cart-item" data-product-id="${item.id}">
                            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                            <div class="cart-item-details">
                                <h3>${item.name}</h3>
                                <p>R$ ${(item.price).toFixed(2).replace('.', ',')}</p>
                                <div class="quantity-controls">
                                    <button class="decrease-quantity" data-product-id="${item.id}">-</button>
                                    <span>${item.quantity}</span>
                                    <button class="increase-quantity" data-product-id="${item.id}">+</button>
                                </div>
                                <button class="remove-item" data-product-id="${item.id}">Remover</button>
                            </div>
                        </div>
                    `;
                    if (cartItemsContainer) {
                        cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHtml);
                    }
                });
                updateCartSummary();
            }
            updateCartCount(); // Atualiza o contador após renderizar o carrinho
        }

        function updateCartSummary() {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const subtotalElement = document.getElementById('cart-subtotal');
            const totalElement = document.getElementById('cart-total');
            const shippingElement = document.getElementById('cart-shipping');

            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const shipping = subtotal > 0 ? 30.00 : 0.00; // Exemplo: frete de R$30 se houver itens, senão 0
            const total = subtotal + shipping;

            if (subtotalElement) subtotalElement.textContent = subtotal.toFixed(2).replace('.', ',');
            if (shippingElement) shippingElement.textContent = shipping.toFixed(2).replace('.', ',');
            if (totalElement) totalElement.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        }

        function changeQuantity(productId, type) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const itemIndex = cart.findIndex(item => item.id === productId);

            if (itemIndex > -1) {
                if (type === 'increase') {
                    cart[itemIndex].quantity++;
                } else if (type === 'decrease') {
                    cart[itemIndex].quantity--;
                    if (cart[itemIndex].quantity <= 0) {
                        cart.splice(itemIndex, 1); // Remove se a quantidade for 0 ou menos
                    }
                }
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCartItems(); // Renderiza novamente para refletir as mudanças
        }

        function removeItem(productId) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart = cart.filter(item => item.id !== productId);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCartItems();
            showNotification('Item removido do carrinho!', 'warning'); // Notificação de remoção
        }

        // Adiciona event listeners para os botões de quantidade e remover
        document.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('increase-quantity')) {
                const productId = parseInt(target.dataset.productId);
                changeQuantity(productId, 'increase');
            } else if (target.classList.contains('decrease-quantity')) {
                const productId = parseInt(target.dataset.productId);
                changeQuantity(productId, 'decrease');
            } else if (target.classList.contains('remove-item')) {
                const productId = parseInt(target.dataset.productId);
                removeItem(productId);
            }
        });

        // LÓGICA DO BOTÃO FINALIZAR COMPRA
        const checkoutBtn = document.querySelector('.checkout-btn'); // Seleciona pela CLASSE
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                if (cart.length === 0) {
                    showNotification('Seu carrinho está vazio!', 'warning');
                    return;
                }

                showNotification('Compra finalizada com sucesso!', 'success');
                localStorage.removeItem('cart'); // Limpa o carrinho
                renderCartItems(); // Atualiza a interface para mostrar carrinho vazio
            });
        }

        renderCartItems(); // Renderiza o carrinho ao carregar a página
    }
// script.js 

// Função para obter parâmetros da URL
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Lógica para carregar detalhes do produto na página product-detail.html
document.addEventListener('DOMContentLoaded', () => {
    // Verifica se estamos na página de detalhes do produto
    if (document.body.classList.contains('product-detail-page')) { // Adicione esta classe ao <body> do product-detail.html
        const productId = getUrlParameter('id');
        const product = products.find(p => p.id === productId);

        if (product) {
            document.getElementById('main-product-image').src = product.image;
            document.getElementById('product-name').textContent = product.name;
            document.getElementById('product-price').textContent = `R$ ${product.price.toFixed(2).replace('.', ',')}`;
            document.getElementById('product-description').textContent = product.description;

            // Preenche as especificações
            const productSpecsUl = document.getElementById('product-specs');
            productSpecsUl.innerHTML = ''; // Limpa antes de adicionar
            product.specs.forEach(spec => {
                const li = document.createElement('li');
                li.textContent = spec;
                productSpecsUl.appendChild(li);
            });

            // (Opcional) Adicione uma função para o botão "Adicionar ao Carrinho" nesta página
            document.querySelector('.add-to-cart').addEventListener('click', () => {
                addToCart(product.id); // Reutiliza a função addToCart do  script
                showNotification(`${product.name} adicionado ao carrinho!`);
            });

            // (Opcional) Carregar produtos relacionados
            loadRelatedProducts(product.id);

        } else {
            // Produto não encontrado, talvez redirecionar ou mostrar uma mensagem de erro
            document.querySelector('.product-main-content').innerHTML = '<p>Produto não encontrado.</p>';
            document.querySelector('.related-products-aside').style.display = 'none'; // Esconde a lateral
        }
    }

    // O resto do seu código JS (carrinho, notificações, etc.)
    // ...
});

// (Opcional) Função para carregar produtos relacionados
function loadRelatedProducts(currentProductId) {
    const relatedProductsGrid = document.getElementById('related-products-grid');
    relatedProductsGrid.innerHTML = ''; // Limpa antes de adicionar

    const shuffledProducts = products.filter(p => p.id !== currentProductId) // Remove o produto atual
                                    .sort(() => 0.5 - Math.random()) // Embaralha
                                    .slice(0, 3); // Pega os 3 primeiros

    shuffledProducts.forEach(product => {
        const productCardHtml = `
            <a href="product-detail.html?id=${product.id}" class="product-link">
                <div class="product-card">
                    <img src="${product.image}" class="product-image" alt="${product.name}">
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
                        <button class="add-to-cart" data-product-id="${product.id}">ADICIONAR AO CARRINHO</button>
                    </div>
                </div>
            </a>
        `;
        // Para adicionar ao grid de produtos relacionados, você precisará adicionar cada item manualmente ou ajustar como o .product-grid-container funciona.
        // No momento, o product-grid-container é usado para os produtos na index/products.
        // Você pode criar uma div específica para produtos relacionados dentro do <aside> e usar a classe 'product-card' nela.
        // Ou, para simplificar por agora, pode adicionar o HTML diretamente:
        const div = document.createElement('div');
        div.innerHTML = productCardHtml;
        relatedProductsGrid.appendChild(div.firstElementChild); // Adiciona o link do card
    });
}
    // --- Lógica para página de detalhes do produto (product-detail.html - se você criar) ---
    if (document.querySelector('.product-detail-container')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id'));
        const product = products.find(p => p.id === productId);

        if (product) {
            document.getElementById('main-product-image').src = product.image;
            document.querySelector('.product-details h1').textContent = product.name;
            document.querySelector('.product-details .product-price').textContent = `R$ ${product.price.toFixed(2).replace('.', ',')}`;
            document.querySelector('.product-details .product-description').textContent = product.description;
            // TODO: Adicione lógica para preencher especificações e thumbnails se aplicável
            
            const addToCartBtnDetail = document.querySelector('.add-to-cart-section .add-to-cart');
            if(addToCartBtnDetail) {
                addToCartBtnDetail.addEventListener('click', () => {
                    const quantityInput = document.getElementById('quantity');
                    const quantity = quantityInput ? parseInt(quantityInput.value) : 1; // Pega a quantidade, default 1
                    if (quantity > 0) {
                        // Certifique-se de que o produto tem todos os dados necessários antes de adicionar
                        const productToAdd = { ...product, quantity: quantity }; 
                        addToCart(productToAdd);
                    } else {
                        showNotification('A quantidade deve ser maior que zero.', 'warning');
                    }
                });
            }
        } else {
            // Opcional: Redirecionar ou mostrar mensagem de produto não encontrado
            console.error('Produto não encontrado para o ID:', productId);
        }
    }


    // Inicializa o contador do carrinho ao carregar qualquer página
    updateCartCount();
});