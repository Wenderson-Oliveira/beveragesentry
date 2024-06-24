const productForm = document.getElementById('product-form');
const productList = document.getElementById('product-list');

productForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const category = document.getElementById('category').value;
    const validity = document.getElementById('validity').value;

    if (name.trim() && price.trim() && category.trim() && validity.trim()) {
        const product = {
            name: name,
            price: parseFloat(price),
            category: category,
            validity: validity
        };
        

        addProduct(product);
        saveProduct(product);

        productForm.reset();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

function addProduct(product) {
    const productItem = document.createElement('div');
    productItem.classList.add('product');
    productItem.innerHTML = `
        <h3>${product.name}</h3>
        <p>Preço: R$ <span class="price">${product.price.toFixed(2)}</span></p>
        <p>Categoria: <span class="category">${product.category}</span></p>
        <p>Validade: <span class="validity">${product.validity}</span></p>
        <button class="edit-btn">Editar</button>
        <button onclick="deleteProduct('${product.name}')">Excluir</button>
    `;
    productList.appendChild(productItem);

    const editBtn = productItem.querySelector('.edit-btn');
    editBtn.addEventListener('click', () => {
        editPrice(productItem, product);
    });
}

function saveProduct(product) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
}

function editPrice(productItem, product) {
    const priceElement = productItem.querySelector('.price');
    const newPrice = prompt('Digite o novo preço:');
    if (newPrice && !isNaN(newPrice)) {
        product.price = parseFloat(newPrice);
        priceElement.textContent = product.price.toFixed(2);
        updateProductInLocalStorage(product);
    } else {
        alert('Por favor, insira um preço válido.');
    }
}

function updateProductInLocalStorage(updatedProduct) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products = products.map(product => {
        if (product.name === updatedProduct.name) {
            return updatedProduct;
        }
        return product;
    });
    localStorage.setItem('products', JSON.stringify(products));
}

function deleteProduct(name) {
    let products = JSON.parse(localStorage.getItem('products'));
    products = products.filter(product => product.name !== name);
    localStorage.setItem('products', JSON.stringify(products));
    location.reload();
}

function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.forEach(product => addProduct(product));
}

function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('category').value = '';
    document.getElementById('validity').value = '';
}

function cancel() {
    if (confirm('Tem certeza que deseja cancelar? Todas as alterações serão perdidas.')) {
        clearForm();
    }
}

loadProducts();


