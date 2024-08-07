document.addEventListener('DOMContentLoaded', function () {
    let cart = [];

    const cartButton = document.getElementById('cart-button');
    const cartModal = document.getElementById('cart-modal');
    const closeCart = document.getElementById('close-cart');
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const totalPriceElement = document.getElementById('total-price');

    const mobileCartButton = document.getElementById('mobile-cart-button');
    const mobileCartModal = document.getElementById('mobile-cart-modal');
    const closeMobileCart = document.getElementById('close-mobile-cart');
    const mobileCartItems = document.getElementById('mobile-cart-items');
    const mobileCartCount = document.getElementById('mobile-cart-count');
    const mobileTotalPriceElement = document.getElementById('mobile-total-price');

    cartButton.onclick = function () {
        cartModal.style.display = 'block';
        renderCartItems();
    };

    closeCart.onclick = function () {
        cartModal.style.display = 'none';
    };

    mobileCartButton.onclick = function () {
        mobileCartModal.style.display = 'block';
        renderMobileCartItems();
    };

    closeMobileCart.onclick = function () {
        mobileCartModal.style.display = 'none';
    };

    window.onclick = function (event) {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
        if (event.target === mobileCartModal) {
            mobileCartModal.style.display = 'none';
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
        renderMobileCartItems();
    }

    function removeItemFromCart(index) {
        cart.splice(index, 1);
        updateCartCount();
        renderCartItems();
        renderMobileCartItems();
    }

    function updateCartCount() {
        cartCount.textContent = cart.length;
        mobileCartCount.textContent = cart.length;
    }

    function renderCartItems() {
        cartItems.innerHTML = '';
        let totalPrice = 0;
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.classList.add('cart-item');
            li.innerHTML = `
                ${item.name} - R$${item.price.toFixed(2)}
                <button class="remove-item" data-index="${index}">Remover</button>
            `;
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

    function renderMobileCartItems() {
        mobileCartItems.innerHTML = '';
        let totalPrice = 0;
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.classList.add('cart-item');
            li.innerHTML = `
                ${item.name} - R$${item.price.toFixed(2)}
                <button class="remove-item" data-index="${index}">Remover</button>
            `;
            mobileCartItems.appendChild(li);
            totalPrice += item.price;
        });
        mobileTotalPriceElement.textContent = totalPrice.toFixed(2);

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                removeItemFromCart(index);
            });
        });
    }
});
