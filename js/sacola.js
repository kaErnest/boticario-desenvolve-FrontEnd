document.addEventListener('DOMContentLoaded', () => {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Funções para renderizar e atualizar os itens do carrinho (desktop e mobile)
    function renderCartItems() {
        const cartItemsList = document.getElementById('cart-items');
        cartItemsList.innerHTML = '';
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
            listItem.querySelector('.remove-item').addEventListener('click', () => removeItemFromCart(item.name));
            cartItemsList.appendChild(listItem);
        });
    }

    function renderMobileCartItems() {
        const mobileCartItemsList = document.getElementById('mobile-cart-items');
        mobileCartItemsList.innerHTML = '';
        if (cartItems.length === 0) {
            mobileCartItemsList.innerHTML = '<li>Seu carrinho está vazio</li>';
            return;
        }

        cartItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.classList.add('cart-item');
            listItem.innerHTML = `
                <span>${item.name} (x${item.quantity}) - R$${(item.price * item.quantity).toFixed(2)}</span>
                <button class="remove-item">Remover</button>
            `;
            listItem.querySelector('.remove-item').addEventListener('click', () => removeItemFromCart(item.name));
            mobileCartItemsList.appendChild(listItem);
        });
    }

    // Funções para adicionar e remover itens do carrinho
    function addItemToCart(cartItem) {
        cartItems.push(cartItem);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCartItems();
        renderMobileCartItems();
        updateCartTotal();
    }

    function removeItemFromCart(itemName) {
        cartItems = cartItems.filter(cartItem => cartItem.name !== itemName);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCartItems();
        renderMobileCartItems();
        updateCartTotal();
    }

    // Funções para atualizar o total do carrinho (desktop e mobile)
    function updateCartTotal() {
        let total = 0;
        cartItems.forEach(item => total += item.price * item.quantity);
        document.getElementById('total-price').textContent = total.toFixed(2);
        document.getElementById('mobile-total-price').textContent = total.toFixed(2);
        document.getElementById('cart-count').textContent = cartItems.length;
        document.getElementById('mobile-cart-count').textContent = cartItems.length;
    }

    // Funções para gerenciar o modal do carrinho (desktop e mobile)
    function setupCartModal(buttonId, modalId, closeId, checkoutId) {
        const cartButton = document.getElementById(buttonId);
        const cartModal = document.getElementById(modalId);
        const closeCartButton = document.getElementById(closeId);
        const checkoutButton = document.getElementById(checkoutId);

        cartButton.addEventListener('click', () => {
            renderCartItems();
            renderMobileCartItems();
            cartModal.style.display = 'block';
        });

        closeCartButton.addEventListener('click', () => {
            cartModal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === cartModal) {
                cartModal.style.display = 'none';
            }
        });

        checkoutButton.addEventListener('click', () => {
            if (cartItems.length === 0) {
                alert('Seu carrinho está vazio!');
            } else {
                alert('Compra finalizada com sucesso!');
                cartItems = [];
                localStorage.removeItem('cartItems');
                renderCartItems();
                renderMobileCartItems();
                updateCartTotal();
                cartModal.style.display = 'none';
            }
        });
    }

    // Configuração dos modais do carrinho (desktop e mobile)
    setupCartModal('cart-button', 'cart-modal', 'close-cart', 'checkout-button');
    setupCartModal('mobile-cart-button', 'mobile-cart-modal', 'close-mobile-cart', 'mobile-checkout-button');

    // Inicializa o total do carrinho ao carregar a página
    updateCartTotal();
});
