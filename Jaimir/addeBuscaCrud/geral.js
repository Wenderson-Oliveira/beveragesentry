const itemForm = document.getElementById('itemForm');
        const itemNameInput = document.getElementById('itemName');
        const itemQuantityInput = document.getElementById('itemQuantity');
        const itemExpiryInput = document.getElementById('itemExpiry');
        const itemList = document.getElementById('itemList');
        const searchInput = document.getElementById('searchInput');

        // Função para adicionar um item
        function addItem(name, quantity, expiry) {
            const item = { id: Date.now(), name, quantity, expiry };
            const items = JSON.parse(localStorage.getItem('items')) || [];
            items.push(item);
            localStorage.setItem('items', JSON.stringify(items));
            renderItems();
        }

        // Função para editar um item
        function editItem(id, newName, newQuantity, newExpiry) {
            const items = JSON.parse(localStorage.getItem('items')) || [];
            const updatedItems = items.map(item => {
                if (item.id === id) {
                    return { ...item, name: newName, quantity: newQuantity, expiry: newExpiry };
                }
                return item;
            });
            localStorage.setItem('items', JSON.stringify(updatedItems));
            renderItems();
        }

        // Função para excluir um item
        function deleteItem(id) {
            const items = JSON.parse(localStorage.getItem('items')) || [];
            const filteredItems = items.filter(item => item.id !== id);
            localStorage.setItem('items', JSON.stringify(filteredItems));
            renderItems();
        }

        // Função para renderizar os itens na lista
        function renderItems() {
            itemList.innerHTML = '';
            const items = JSON.parse(localStorage.getItem('items')) || [];
            const searchText = searchInput.value.trim().toLowerCase();
            items.forEach(item => {
                if (item.name.toLowerCase().includes(searchText)) {
                    const li = document.createElement('li');
                    const itemName = document.createElement('span');
                    itemName.textContent = item.name;
                    const itemQuantity = document.createElement('span');
                    itemQuantity.textContent = `Quantidade: ${item.quantity}`;
                    const itemExpiry = document.createElement('span');
                    itemExpiry.textContent = `Validade: ${item.expiry}`;
                    const editButton = document.createElement('button');
                    editButton.textContent = 'Editar';
                    editButton.addEventListener('click', () => {
                        const newName = prompt('Novo nome do item:', item.name);
                        const newQuantity = prompt('Nova quantidade:', item.quantity);
                        const newExpiry = prompt('Nova validade:', item.expiry);
                        if (newName !== null && newName !== '' && newQuantity !== null && newExpiry !== null) {
                            editItem(item.id, newName, newQuantity, newExpiry);
                        }
                    });
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Excluir';
                    deleteButton.addEventListener('click', () => {
                        deleteItem(item.id);
                    });
                    li.appendChild(itemName);
                    li.appendChild(itemQuantity);
                    li.appendChild(itemExpiry);
                    li.appendChild(editButton);
                    li.appendChild(deleteButton);
                    itemList.appendChild(li);

                    // Verificar se o item tem menos de 30 produtos no estoque
                    if (item.quantity < 30) {
                        alert(`Atenção: ${item.name} possui menos de 30 produtos no estoque!`);
                    }

                    // Verificar se o item está vencido
                    const today = new Date();
                    const expiryDate = new Date(item.expiry);
                    const daysDifference = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
                    if (daysDifference < 0) {
                        alert(`Atenção: ${item.name} está vencido há ${Math.abs(daysDifference)} dias!`);
                    }
                    // AVISA APÓS 30 DIAS 
                    // Verificar se o item está próximo da data de validade (30 dias)
                    if (daysDifference >= 0 && daysDifference <= 30) {
                        alert(`Atenção: ${item.name} está próximo da data de validade! Faltam ${daysDifference} dias.`);
                    }
                }
            });
        }

        // Event listener para adicionar um item quando o formulário é enviado
        itemForm.addEventListener('submit', event => {
            event.preventDefault();
            const itemName = itemNameInput.value.trim();
            const itemQuantity = itemQuantityInput.value.trim();
            const itemExpiry = itemExpiryInput.value.trim();
            if (itemName && itemQuantity && itemExpiry) {
                addItem(itemName, itemQuantity, itemExpiry);
                itemNameInput.value = '';
                itemQuantityInput.value = '';
                itemExpiryInput.value = '';
            }
        });
       
        // Event listener para filtrar os itens quando o texto da pesquisa é alterado

        searchInput.addEventListener('input', renderItems);

        // Renderiza os itens quando a página carrega
        renderItems();