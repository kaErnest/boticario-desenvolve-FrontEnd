// kitsIntegration.js
document.addEventListener("DOMContentLoaded", () => {
    // Função para buscar e renderizar kits
    async function fetchKits() {
        try {
            const response = await fetch('http://localhost:3000/kits');
            const kits = await response.json();
            renderKits(kits);
        } catch (error) {
            console.error('Erro ao buscar os kits:', error);
        }
    }

    function renderKits(kits) {
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
    }

    // Função para adicionar event listeners aos botões "Adicionar ao Carrinho"
    function addCartListeners() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    // Função para adicionar kits ao carrinho
    function addToCart(event) {
        const button = event.target.closest('.add-to-cart');
        const productName = button.getAttribute('data-name');
        const productPrice = parseFloat(button.getAttribute('data-price'));

        if (!productName || isNaN(productPrice)) {
            console.error('Erro ao obter os dados do kit:', { productName, productPrice });
            return;
        }

        const cartItem = {
            name: productName,
            price: productPrice,
            quantity: 1
        };

        addItemToCart(cartItem);
    }

    // Função para adicionar item ao carrinho
    function addItemToCart(cartItem) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.push(cartItem);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartTotal();
    }

    // Função para atualizar o total do carrinho
    function updateCartTotal() {
        let total = 0;
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.forEach(item => {
            total += item.price * item.quantity;
        });
        document.getElementById('total-price').textContent = total.toFixed(2);
        document.getElementById('cart-count').textContent = cartItems.length;
    }

    // Inicializa a renderização dos kits
    fetchKits();
});

