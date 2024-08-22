document.addEventListener("DOMContentLoaded", () => {
    const productsPerPage = 4;
    let currentPage = 1;
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Seletores de elementos do DOM
    const productContainer = document.getElementById('product-container');
    const cartButton = document.getElementById('cart-button');
    const cartModal = document.getElementById('cart-modal');
    const closeCartButton = document.getElementById('close-cart');
    const checkoutButton = document.getElementById('checkout-button');
    const cartItemsList = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const cartCountElement = document.getElementById('cart-count');

    // Função para buscar produtos da API com paginação
    const fetchProducts = async (page = 1) => {
        try {
            const response = await fetch(`http://localhost:3000/itens?pagina=${page}&limite=${productsPerPage}`);
            return response.ok ? await response.json() : [];
        } catch (error) {
            console.error('Erro ao buscar os produtos:', error);
            return [];
        }
    };

    // Função para renderizar produtos no DOM
    const renderProducts = (products) => {
        productContainer.innerHTML = products.map(product => `
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
        `).join('');

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    };

    // Função para buscar e renderizar kits
    const fetchKits = async () => {
        try {
            const response = await fetch('http://localhost:3000/kits');
            const kits = await response.json();
            renderKits(kits);
        } catch (error) {
            console.error('Erro ao buscar os kits:', error);
        }
    };

    const renderKits = (kits) => {
        const kitsContainer = document.getElementById('kits-container');
        kitsContainer.innerHTML = '';

        kits.forEach(kit => {
            const kitElement = `
                <div class="product">
                    <div class="product-heart">
                        <i class="fa-solid fa-heart"></i>
                    </div>
                    <img src="http://localhost:3000/${kit.image.path}" class="product-image" alt="${kit.titulo}" width="256" height="256">
                    <h3 class="product-title">${kit.titulo}</h3>
                    <span class="product-description">
                        ${kit.item.map(product => `1 ${product.nome}: ${product.descricao}`).join('<br>')}
                    </span>
                    <div class="product-rate">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <span>(500+)</span>
                    </div>
                    <div class="product-price">
                        <h4>R$${kit.preco.toFixed(2)}</h4>
                        <button class="btn-default add-to-cart" data-name="${kit.titulo}" data-price="${kit.preco}">
                            <i class="fa-solid fa-basket-shopping"></i>
                        </button>
                    </div>
                </div>
            `;
            kitsContainer.innerHTML += kitElement;
        });

        // Adiciona Event Listener para os botões "Adicionar ao Carrinho"
        addCartListeners();
    };

    // Função para adicionar itens ao carrinho
    const addToCart = (event) => {
        const button = event.target.closest('.add-to-cart');
        const productName = button.dataset.name;
        const productPrice = parseFloat(button.dataset.price);

        if (!productName || isNaN(productPrice)) return;

        const existingItem = cartItems.find(item => item.name === productName);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push({ name: productName, price: productPrice, quantity: 1 });
        }

        saveCart();
    };

    // Função para adicionar kits ao carrinho
    const addItemToCart = (cartItem) => {
        const existingItem = cartItems.find(item => item.name === cartItem.name);
        if (existingItem) {
            existingItem.quantity += cartItem.quantity;
        } else {
            cartItems.push(cartItem);
        }

        saveCart();
    };

    // Função para salvar e atualizar o carrinho
    const saveCart = () => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartDisplay();
    };

    // Função para atualizar o total e o contador do carrinho
    const updateCartDisplay = () => {
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        totalPriceElement.textContent = total.toFixed(2);
        cartCountElement.textContent = cartItems.length;
        renderCartItems();
    };

    // Função para atualizar a página
    const updatePage = async (page) => {
        const products = await fetchProducts(page);
        if (products.length > 0) {
            currentPage = page;
            renderProducts(products);
            document.getElementById('page-num').textContent = `Página ${currentPage}`;
            document.getElementById('prev-btn').disabled = currentPage === 1;
            document.getElementById('next-btn').disabled = products.length < productsPerPage;
        } else {
            document.getElementById('next-btn').disabled = true;
        }
    };

    // Função para renderizar os itens do carrinho no modal
    const renderCartItems = () => {
        cartItemsList.innerHTML = cartItems.length ? 
            cartItems.map(item => `
                <li class="cart-item">
                    <span>${item.name} (x${item.quantity}) - R$${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="remove-item" data-name="${item.name}">Remover</button>
                </li>
            `).join('') : '<li>Seu carrinho está vazio</li>';

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', () => removeItemFromCart(button.dataset.name));
        });
    };

    // Função para remover item do carrinho
    const removeItemFromCart = (itemName) => {
        cartItems = cartItems.filter(item => item.name !== itemName);
        saveCart();
    };

    // Event listeners
    document.getElementById('prev-btn').addEventListener('click', () => currentPage > 1 && updatePage(currentPage - 1));
    document.getElementById('next-btn').addEventListener('click', () => updatePage(currentPage + 1));
    cartButton.addEventListener('click', () => { renderCartItems(); cartModal.style.display = 'block'; });
    closeCartButton.addEventListener('click', () => cartModal.style.display = 'none');
    window.addEventListener('click', (event) => event.target === cartModal && (cartModal.style.display = 'none'));

    checkoutButton.addEventListener('click', () => {
        if (cartItems.length === 0) {
            alert('Seu carrinho está vazio!');
        } else {
            alert('Compra finalizada com sucesso!');
            cartItems = [];
            localStorage.removeItem('cartItems');
            renderCartItems();
            updateCartDisplay();
            cartModal.style.display = 'none';
        }
    });

    // Inicializa a primeira página e o total do carrinho
    updatePage(currentPage);
    updateCartDisplay();
    fetchKits();
});
