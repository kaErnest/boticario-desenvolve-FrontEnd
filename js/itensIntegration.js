document.addEventListener("DOMContentLoaded", () => {
    const productsPerPage = 4;
    let currentPage = 1;

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
                        <h4>R$${product.preco}</h4>
                        <button class="btn-default add-to-cart" data-name="${product.nome}" data-price="${product.preco}">
                            <i class="fa-solid fa-basket-shopping"></i>
                        </button>
                    </div>
                </div>
            `;
            productContainer.innerHTML += productElement;
        });
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
});
