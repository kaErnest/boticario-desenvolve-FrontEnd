document.addEventListener("DOMContentLoaded", () => {
    const productsPerPage = 4;
    let currentPage = 1;
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Função para buscar os produtos da API com paginação
    async function fetchProducts(page = 1) {
        try {
            const response = await fetch(`http://localhost:3000/itens?pagina=${page}&limite=${productsPerPage}`);
            const products = await response.json();

            // Função para renderizar os produtos no DOM
            renderProducts(products);
        } catch (error) {
            console.error('Erro ao buscar os produtos:', error);
        }
    }

    // Função para renderizar os produtos
    function renderProducts(products) {
        const productContainer = document.getElementById('product-container');
        productContainer.innerHTML = ''; // Limpa o container antes de renderizar os produtos

        products.forEach(product => {
            const productElement = `
                <div class="product">
                    <div class="product-heart">
                        <i class="fa-solid fa-heart"></i>
                    </div>

                    <img src="http://localhost:3000/${product.image.path}" class="product-image" alt="${product.nome}" width="256" height="256">

                    <h3 class="product-title">${product.nome}</h3>

                    <span class="product-description">${product.descricao}</span>

                    <div class="product-rate">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <span>(500+)</span>
                    </div>

                    <div class="product-price">
                        <h4>R$${product.preco.toFixed(2)}</h4>
                        <button class="btn-default add-to-cart" data-name="${product.nome}" data-price="${product.preco}">
                            <i class="fa-solid fa-basket-shopping"></i>
                        </button>
                    </div>
                </div>
            `;
            productContainer.innerHTML += productElement;
        });

        // Adiciona Event Listener para os botões "Adicionar ao Carrinho"
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    // Função para adicionar produtos ao carrinho
    function addToCart(event) {
        const button = event.target.closest('.add-to-cart'); // Certifique-se de obter o botão correto
        const productName = button.getAttribute('data-name');
        const productPrice = parseFloat(button.getAttribute('data-price'));
    
        // Verifique se os valores foram obtidos corretamente
        if (!productName || isNaN(productPrice)) {
            console.error('Erro ao obter os dados do produto:', { productName, productPrice });
            return;
        }
    
        const cartItem = {
            name: productName,
            price: productPrice,
            quantity: 1
        };
    
        addItemToCart(cartItem);
        updateCartTotal();
    }

    // Função para adicionar item ao carrinho
    function addItemToCart(cartItem) {
        cartItems.push(cartItem);
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Salva no localStorage
        console.log(`Produto adicionado ao carrinho: ${cartItem.name} - R$${cartItem.price.toFixed(2)}`);
    }

    // Função para atualizar o total do carrinho
    function updateCartTotal() {
        let total = 0;
        cartItems.forEach(item => {
            total += item.price * item.quantity;
        });
        document.getElementById('total-price').textContent = total.toFixed(2);
        document.getElementById('cart-count').textContent = cartItems.length;
    }

    // Função para atualizar a página
    function updatePage(page) {
        currentPage = page;
        fetchProducts(page);
        document.getElementById('page-num').textContent = `Página ${currentPage}`;
        document.getElementById('prev-btn').disabled = currentPage === 1;
        document.getElementById('next-btn').disabled = false; // Inicialmente habilitar
    }

    document.getElementById('prev-btn').addEventListener('click', () => {
        if (currentPage > 1) {
            updatePage(currentPage - 1);
        }
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        updatePage(currentPage + 1);
    });

    // Inicializa a primeira página
    updatePage(currentPage);

    const cartButton = document.getElementById('cart-button');
    const cartModal = document.getElementById('cart-modal');
    const closeCartButton = document.getElementById('close-cart');
    const checkoutButton = document.getElementById('checkout-button');
    const cartItemsList = document.getElementById('cart-items');

    // Função para renderizar os itens do carrinho no modal
    function renderCartItems() {
        cartItemsList.innerHTML = ''; // Limpa a lista de itens

        if (cartItems.length === 0) {
            cartItemsList.innerHTML = '<li>Seu carrinho está vazio</li>';
            return;
        }

        cartItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.classList.add('cart-item');
            listItem.innerHTML = `
                <span>${item.name} (x${item.quantity}) - R$${(item.price * item.quantity).toFixed(2)}</span>
                <button class="remove-item">Remover</button>
            `;
            listItem.querySelector('.remove-item').addEventListener('click', () => {
                removeItemFromCart(item.name);
            });
            cartItemsList.appendChild(listItem);
        });
    }

    // Função para remover item do carrinho
    function removeItemFromCart(itemName) {
        cartItems = cartItems.filter(cartItem => cartItem.name !== itemName);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCartItems();
        updateCartTotal();
    }

    // Abre o modal ao clicar no botão do carrinho
    cartButton.addEventListener('click', () => {
        renderCartItems(); // Renderizar os itens ao abrir o modal
        cartModal.style.display = 'block';
    });

    // Fecha o modal ao clicar no botão de fechar
    closeCartButton.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Fecha o modal ao clicar fora do conteúdo do modal
    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Função para finalizar a compra
    checkoutButton.addEventListener('click', () => {
        if (cartItems.length === 0) {
            alert('Seu carrinho está vazio!');
        } else {
            alert('Compra finalizada com sucesso!');
            cartItems = [];
            localStorage.removeItem('cartItems');
            renderCartItems();
            updateCartTotal();
            cartModal.style.display = 'none';
        }
    });

    // Inicializa o total do carrinho ao carregar a página
    updateCartTotal();
});
