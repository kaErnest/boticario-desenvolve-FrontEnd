document.addEventListener('DOMContentLoaded', function () {
    let cart = [];

    const cartButton = document.getElementById('cart-button');
    const cartModal = document.getElementById('cart-modal');
    const closeCart = document.getElementById('close-cart');
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutButton = document.getElementById('checkout-button');
    const cartError = document.getElementById('cart-error');

    cartButton.onclick = function () {
        cartModal.style.display = 'block';
        resetCartError(); 
        renderCartItems();
    };

    closeCart.onclick = function () {
        cartModal.style.display = 'none';
    };

    window.onclick = function (event) {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    };

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            addItemToCart({ name, price });
        });
    });

    function addItemToCart(item) {
        cart.push(item);
        updateCartCount();
        renderCartItems();
    }

    function removeItemFromCart(index) {
        cart.splice(index, 1);
        updateCartCount();
        renderCartItems();
    }

    function updateCartCount() {
        cartCount.textContent = cart.length;
    }

    function renderCartItems() {
        cartItems.innerHTML = '';
        let totalPrice = 0;
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.classList.add('cart-item');
            li.innerHTML = `${item.name} - R$${item.price.toFixed(2)} <button class="remove-item" data-index="${index}">Remover</button>`;
            cartItems.appendChild(li);
            totalPrice += item.price;
        });
        totalPriceElement.textContent = totalPrice.toFixed(2);
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                removeItemFromCart(index);
            });
        });
    }

    function resetCartError() {
        cartError.style.display = 'none';
        cartError.textContent = '';
    }

    checkoutButton.addEventListener('click', function () {
        resetCartError(); 
        if (cart.length === 0) {
            cartError.textContent = 'Seu carrinho está vazio. Adicione itens antes de finalizar a compra.';
            cartError.style.display = 'block';
            return;
        }
        alert('Compra finalizada com sucesso!');
        cart = [];
        updateCartCount();
        renderCartItems();
        cartModal.style.display = 'none';
    });
});
