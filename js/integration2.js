document.addEventListener("DOMContentLoaded", () => {
    const kitsContainer = document.getElementById('kits-container');

    // Função para buscar os kits da API
    async function fetchKits() {
        try {
            const response = await fetch('http://localhost:3000/kits'); // Altere a URL conforme necessário
            const kits = await response.json();

            // Função para renderizar os kits no DOM
            renderKits(kits);
        } catch (error) {
            console.error('Erro ao buscar os kits:', error);
        }
    }

    function renderKits(kits) {
        kitsContainer.innerHTML = '';
    
        kits.forEach(kit => {
            fetchProductsForKit(kit.item).then(products => {
                const kitElement = `
                    <div class="product">
                        <div class="product-heart">
                            <i class="fa-solid fa-heart"></i>
                        </div>
                        
                        <img src="http://localhost:3000/${kit.image.path}" class="product-image" alt="${kit.titulo}" width="256" height="256">
                        
                        <h3 class="product-title">${kit.titulo}</h3>
                        
                        <span class="product-description">
                            ${products.map(product => `${product} 1 ${product.nome}: ${product.descricao}`).join('<br>')}
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
        });
    }

    // Função para buscar produtos com base nos IDs
    async function fetchProductsForKit(productIds) {
        try {
            const responses = await Promise.all(productIds.map(id => fetch(`http://localhost:3000/itens/${id}`)));
            const products = await Promise.all(responses.map(response => response.json()));
            return products;
        } catch (error) {
            console.error('Erro ao buscar os produtos para o kit:', error);
            return [];
        }
    }

    // Chama a função para buscar e renderizar os kits
    fetchKits();
});

