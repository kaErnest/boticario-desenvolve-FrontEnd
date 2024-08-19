document.addEventListener('DOMContentLoaded', function() {
    const productsPerPage = 4;
    const productContainer = document.getElementById('product-container');
    const products = Array.from(productContainer.getElementsByClassName('product'));
    const totalPages = Math.ceil(products.length / productsPerPage);
    let currentPage = 1;

    function showPage(page) {
        products.forEach((product, index) => {
            product.style.display = (index >= (page - 1) * productsPerPage && index < page * productsPerPage) ? 'flex' : 'none';
        });
        document.getElementById('page-num').textContent = `Página ${page}`;
        document.getElementById('prev-btn').disabled = page === 1;
        document.getElementById('next-btn').disabled = page === totalPages;
    }

    document.getElementById('prev-btn').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
        }
    });

    showPage(currentPage);
});