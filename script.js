class OnlineStore {
    constructor() {
        this.products = [];
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.userProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
        this.selectedItems = new Set();
        this.isAllSelected = false;
        this.init();
    }

    async init() {
        await this.loadProducts();
        this.updateCartCount();
        this.showTab('home');
        this.displayProducts();
        this.loadUserProfile();
    }

    async loadProducts() {
        try {
            // Одежда Lonsdale с реальными картинками с Wildberries
            this.products = [
                {
                    id: 1,
                    name: "Куртка Lonsdale спортивная",
                    price: 5990,
                    category: "jackets",
                    images: [
                        "https://basket-12.wb.ru/vol1880/part188075/188075168/images/c516x688/1.webp",
                        "https://basket-12.wb.ru/vol1880/part188075/188075168/images/c516x688/2.webp",
                        "https://basket-12.wb.ru/vol1880/part188075/188075168/images/c516x688/3.webp"
                    ],
                    description: "Спортивная куртка Lonsdale с влагозащитой"
                },
                {
                    id: 2,
                    name: "Футболка Lonsdale классическая",
                    price: 1990,
                    category: "tshirts",
                    images: [
                        "https://basket-12.wb.ru/vol1772/part177296/177296168/images/c516x688/1.webp",
                        "https://basket-12.wb.ru/vol1772/part177296/177296168/images/c516x688/2.webp",
                        "https://basket-12.wb.ru/vol1772/part177296/177296168/images/c516x688/3.webp"
                    ],
                    description: "Хлопковая футболка с логотипом Lonsdale"
                },
                // ... остальные товары из предыдущего примера
            ];
        } catch (error) {
            console.error('Ошибка загрузки товаров:', error);
            this.loadFallbackProducts();
        }
    }

    removeFromCart(productId) {
        // Анимация удаления
        const cartItem = document.querySelector(`.cart-item input[value="${productId}"]`)?.closest('.cart-item');
        if (cartItem) {
            cartItem.style.opacity = '0';
            cartItem.style.transform = 'translateX(100%)';
            
            setTimeout(() => {
                this.cart = this.cart.filter(item => item.id !== productId);
                this.selectedItems.delete(productId);
                this.saveCart();
                this.updateCartCount();
                this.updateSelectionInfo();
                this.updateCart(); // Перерисовываем корзину
            }, 300);
        } else {
            this.cart = this.cart.filter(item => item.id !== productId);
            this.selectedItems.delete(productId);
            this.saveCart();
            this.updateCartCount();
            this.updateSelectionInfo();
            this.updateCart();
        }
    }

    deleteSelectedItems() {
        if (this.selectedItems.size === 0) {
            this.showNotification('Выберите товары для удаления!');
            return;
        }

        // Анимация для всех выбранных товаров
        this.selectedItems.forEach(productId => {
            const cartItem = document.querySelector(`.cart-item input[value="${productId}"]`)?.closest('.cart-item');
            if (cartItem) {
                cartItem.style.opacity = '0';
                cartItem.style.transform = 'translateX(100%)';
            }
        });

        setTimeout(() => {
            this.cart = this.cart.filter(item => !this.selectedItems.has(item.id));
            this.selectedItems.clear();
            this.isAllSelected = false;
            this.saveCart();
            this.updateCart();
            this.updateCartCount();
            this.updateSelectionInfo();
            this.showNotification('Выбранные товары удалены из корзины!');
        }, 300);
    }

    // ... остальные методы без изменений ...
}

    async loadProducts() {
    try {
        // Одежда Lonsdale с реальными картинками с Wildberries
        this.products = [
            {
                id: 1,
                name: "Куртка Lonsdale спортивная",
                price: 5990,
                category: "jackets",
                images: [
                    "https://basket-12.wb.ru/vol1880/part188075/188075168/images/c516x688/1.webp",
                    "https://basket-12.wb.ru/vol1880/part188075/188075168/images/c516x688/2.webp",
                    "https://basket-12.wb.ru/vol1880/part188075/188075168/images/c516x688/3.webp"
                ],
                description: "Спортивная куртка Lonsdale с влагозащитой, идеальна для активного отдыха"
            },
            {
                id: 2,
                name: "Футболка Lonsdale классическая",
                price: 1990,
                category: "tshirts",
                images: [
                    "https://basket-12.wb.ru/vol1772/part177296/177296168/images/c516x688/1.webp",
                    "https://basket-12.wb.ru/vol1772/part177296/177296168/images/c516x688/2.webp",
                    "https://basket-12.wb.ru/vol1772/part177296/177296168/images/c516x688/3.webp"
                ],
                description: "Хлопковая футболка с логотипом Lonsdale, удобная посадка"
            },
            {
                id: 3,
                name: "Штаны Lonsdale тренировочные",
                price: 3490,
                category: "pants",
                images: [
                    "https://basket-12.wb.ru/vol1856/part185699/185699168/images/c516x688/1.webp",
                    "https://basket-12.wb.ru/vol1856/part185699/185699168/images/c516x688/2.webp",
                    "https://basket-12.wb.ru/vol1856/part185699/185699168/images/c516x688/3.webp"
                ],
                description: "Спортивные штаны для тренировок, эластичный материал"
            },
            {
                id: 4,
                name: "Толстовка Lonsdale с капюшоном",
                price: 4490,
                category: "hoodies",
                images: [
                    "https://basket-12.wb.ru/vol1904/part190499/190499168/images/c516x688/1.webp",
                    "https://basket-12.wb.ru/vol1904/part190499/190499168/images/c516x688/2.webp",
                    "https://basket-12.wb.ru/vol1904/part190499/190499168/images/c516x688/3.webp"
                ],
                description: "Теплая толстовка с капюшоном, брендированный дизайн"
            },
            {
                id: 5,
                name: "Кепка Lonsdale бейсболка",
                price: 1290,
                category: "accessories",
                images: [
                    "https://basket-12.wb.ru/vol1832/part183299/183299168/images/c516x688/1.webp",
                    "https://basket-12.wb.ru/vol1832/part183299/183299168/images/c516x688/2.webp",
                    "https://basket-12.wb.ru/vol1832/part183299/183299168/images/c516x688/3.webp"
                ],
                description: "Стильная бейсболка с фирменным логотипом Lonsdale"
            },
            {
                id: 6,
                name: "Рюкзак Lonsdale спортивный",
                price: 3990,
                category: "accessories",
                images: [
                    "https://basket-12.wb.ru/vol1788/part178899/178899168/images/c516x688/1.webp",
                    "https://basket-12.wb.ru/vol1788/part178899/178899168/images/c516x688/2.webp",
                    "https://basket-12.wb.ru/vol1788/part178899/178899168/images/c516x688/3.webp"
                ],
                description: "Вместительный рюкзак для спорта и повседневного использования"
            },
            {
                id: 7,
                name: "Шорты Lonsdale беговые",
                price: 2490,
                category: "shorts",
                images: [
                    "https://basket-12.wb.ru/vol1816/part181699/181699168/images/c516x688/1.webp",
                    "https://basket-12.wb.ru/vol1816/part181699/181699168/images/c516x688/2.webp",
                    "https://basket-12.wb.ru/vol1816/part181699/181699168/images/c516x688/3.webp"
                ],
                description: "Легкие беговые шорты с влагоотводящими свойствами"
            },
            {
                id: 8,
                name: "Кофта Lonsdale флисовая",
                price: 3790,
                category: "sweaters",
                images: [
                    "https://basket-12.wb.ru/vol1868/part186899/186899168/images/c516x688/1.webp",
                    "https://basket-12.wb.ru/vol1868/part186899/186899168/images/c516x688/2.webp",
                    "https://basket-12.wb.ru/vol1868/part186899/186899168/images/c516x688/3.webp"
                ],
                description: "Теплая флисовая кофта для прохладной погоды"
            },
            {
                id: 9,
                name: "Носки Lonsdale спортивные",
                price: 790,
                category: "accessories",
                images: [
                    "https://basket-12.wb.ru/vol1796/part179699/179699168/images/c516x688/1.webp",
                    "https://basket-12.wb.ru/vol1796/part179699/179699168/images/c516x688/2.webp",
                    "https://basket-12.wb.ru/vol1796/part179699/179699168/images/c516x688/3.webp"
                ],
                description: "Комфортные спортивные носки с анатомической поддержкой"
            },
            {
                id: 10,
                name: "Перчатки Lonsdale тренировочные",
                price: 1890,
                category: "accessories",
                images: [
                    "https://basket-12.wb.ru/vol1824/part182499/182499168/images/c516x688/1.webp",
                    "https://basket-12.wb.ru/vol1824/part182499/182499168/images/c516x688/2.webp",
                    "https://basket-12.wb.ru/vol1824/part182499/182499168/images/c516x688/3.webp"
                ],
                description: "Перчатки для тренировок с улучшенным сцеплением"
            }
        ];
    } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
        this.loadFallbackProducts();
    }
}

loadFallbackProducts() {
    // Fallback на placeholder images если WB картинки не загрузятся
    this.products = [
        {
            id: 1,
            name: "Куртка Lonsdale спортивная",
            price: 5990,
            category: "jackets",
            images: [
                "https://via.placeholder.com/300x400/667eea/ffffff?text=Куртка+Lonsdale",
                "https://via.placeholder.com/100x100/764ba2/ffffff?text=Вид+2",
                "https://via.placeholder.com/100x100/5a67d8/ffffff?text=Вид+3"
            ],
            description: "Спортивная куртка Lonsdale с влагозащитой"
        },
        {
            id: 2,
            name: "Футболка Lonsdale",
            price: 1990,
            category: "tshirts",
            images: [
                "https://via.placeholder.com/300x400/ff4757/ffffff?text=Футболка+Lonsdale",
                "https://via.placeholder.com/100x100/ff6b81/ffffff?text=Вид+2",
                "https://via.placeholder.com/100x100/ff8fa3/ffffff?text=Вид+3"
            ],
            description: "Хлопковая футболка с логотипом Lonsdale"
        }
    ];
}

    // ... остальные методы без изменений ...
    showTab(tabName) {
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        
        document.getElementById(tabName).classList.add('active');
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.textContent.includes(this.getTabName(tabName))) {
                link.classList.add('active');
            }
        });

        if (tabName === 'cart') {
            this.updateCart();
        } else if (tabName === 'search') {
            this.performSearch();
        }
    }

    getTabName(tabId) {
        const names = {'home': 'Главная', 'search': 'Поиск', 'cart': 'Корзина', 'profile': 'Профиль'};
        return names[tabId];
    }

    displayProducts() {
        const container = document.getElementById('productsContainer');
        if (!container) return;
        
        container.innerHTML = this.products.map(product => this.createProductCard(product)).join('');
    }

    createProductCard(product) {
        const mainImage = product.images[0];
        const imageGallery = product.images.slice(1, 3).map((img, index) => 
            `<img src="${img}" alt="${product.name}" class="product-thumb" 
                  onerror="this.src='https://via.placeholder.com/100x100/d1d5db/9ca3af?text=IMG'" 
                  onclick="store.changeMainImage(${product.id}, '${img}', this)">`
        ).join('');

        const categoryNames = {
            'jackets': '🧥 Куртки',
            'tshirts': '👕 Футболки', 
            'pants': '👖 Штаны',
            'hoodies': '🧢 Толстовки',
            'shorts': '🩳 Шорты',
            'sweaters': '🧶 Кофты',
            'accessories': '🎽 Аксессуары'
        };

        return `
            <div class="product-card">
                <span class="product-category">${categoryNames[product.category] || product.category}</span>
                <img src="${mainImage}" alt="${product.name}" class="product-image" 
                     onerror="this.src='https://via.placeholder.com/300x400/d1d5db/9ca3af?text=Товар+${product.id}'">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">${product.price.toLocaleString()}₽</div>
                <p class="product-description">${product.description}</p>
                <button class="add-to-cart-btn" onclick="store.addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i>Добавить в корзину
                </button>
            </div>
        `;
    }

    changeMainImage(productId, imageUrl, element) {
        const mainImage = document.getElementById(`mainImage-${productId}`);
        if (mainImage) mainImage.src = imageUrl;
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
                quantity: 1,
                image: product.images[0]
            });
        }

        this.saveCart();
        this.updateCartCount();
        this.showNotification(`Товар "${product.name}" добавлен в корзину!`);
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.selectedItems.delete(productId);
        this.saveCart();
        this.updateCart();
        this.updateCartCount();
        this.updateSelectionInfo();
    }

    updateQuantity(productId, change) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, item.quantity + change);
            this.saveCart();
            this.updateCart();
        }
    }

    toggleItemSelection(productId) {
        if (this.selectedItems.has(productId)) {
            this.selectedItems.delete(productId);
        } else {
            this.selectedItems.add(productId);
        }
        this.updateSelectionInfo();
    }

    toggleSelectAll() {
        if (this.isAllSelected) {
            this.selectedItems.clear();
        } else {
            this.cart.forEach(item => this.selectedItems.add(item.id));
        }
        this.isAllSelected = !this.isAllSelected;
        this.updateCart();
        this.updateSelectionInfo();
    }

    deleteSelectedItems() {
        if (this.selectedItems.size === 0) {
            this.showNotification('Выберите товары для удаления!');
            return;
        }

        this.cart = this.cart.filter(item => !this.selectedItems.has(item.id));
        this.selectedItems.clear();
        this.isAllSelected = false;
        this.saveCart();
        this.updateCart();
        this.updateCartCount();
        this.updateSelectionInfo();
        this.showNotification('Выбранные товары удалены из корзины!');
    }

    orderSelectedItems() {
        if (this.selectedItems.size === 0) {
            this.showNotification('Выберите товары для заказа!');
            return;
        }

        const selectedCart = this.cart.filter(item => this.selectedItems.has(item.id));
        const total = selectedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        this.showNotification(`Заказ оформлен! Товаров: ${selectedCart.length}, Сумма: ${total.toLocaleString()}₽`);
        
        this.cart = this.cart.filter(item => !this.selectedItems.has(item.id));
        this.selectedItems.clear();
        this.isAllSelected = false;
        this.saveCart();
        this.updateCart();
        this.updateCartCount();
        this.updateSelectionInfo();
    }

    updateCart() {
        const cartItems = document.getElementById('cartItems');
        const cartSummary = document.getElementById('cartSummary');
        const emptyCart = document.getElementById('emptyCart');
        const cartActions = document.getElementById('cartActions');

        if (this.cart.length === 0) {
            emptyCart.style.display = 'block';
            cartSummary.style.display = 'none';
            cartActions.style.display = 'none';
            cartItems.innerHTML = '';
            cartItems.appendChild(emptyCart);
            return;
        }

        emptyCart.style.display = 'none';
        cartSummary.style.display = 'block';
        cartActions.style.display = 'flex';

        let total = 0;
        let totalItems = 0;
        let cartHTML = '';

        this.cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            totalItems += item.quantity;

            const isSelected = this.selectedItems.has(item.id);

            cartHTML += `
                <div class="cart-item ${isSelected ? 'selected' : ''}">
                    <input type="checkbox" class="cart-item-checkbox" 
                           ${isSelected ? 'checked' : ''}
                           onchange="store.toggleItemSelection(${item.id})">
                    
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">${item.price.toLocaleString()}₽</div>
                        
                        <div class="cart-item-quantity">
                            <button class="quantity-btn" onclick="store.updateQuantity(${item.id}, -1)">-</button>
                            <span class="quantity-value">${item.quantity}</span>
                            <button class="quantity-btn" onclick="store.updateQuantity(${item.id}, 1)">+</button>
                        </div>
                    </div>
                    
                    <div>
                        <div class="cart-item-total">${itemTotal.toLocaleString()}₽</div>
                        <button class="remove-item-btn" onclick="store.removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i>Удалить
                        </button>
                    </div>
                </div>
            `;
        });

        cartItems.innerHTML = cartHTML;
        document.getElementById('totalPrice').textContent = total.toLocaleString();
    }

    updateSelectionInfo() {
        const selectedCount = document.getElementById('selectedCount');
        if (selectedCount) {
            selectedCount.textContent = this.selectedItems.size;
        }
    }

    updateCartCount() {
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCount = document.getElementById('cartCount');
        if (cartCount) cartCount.textContent = totalItems;
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    checkout() {
        if (this.cart.length === 0) {
            this.showNotification('Корзина пуста!');
            return;
        }

        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        this.showNotification(`Весь заказ оформлен! Товаров: ${this.cart.length}, Сумma: ${total.toLocaleString()}₽`);
        
        this.cart = [];
        this.selectedItems.clear();
        this.isAllSelected = false;
        this.saveCart();
        this.updateCart();
        this.updateCartCount();
        this.updateSelectionInfo();
    }

    performSearch() {
        const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
        const category = document.getElementById('categoryFilter')?.value || '';
        const priceRange = document.getElementById('priceFilter')?.value || '';

        let filteredProducts = this.products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                                product.description.toLowerCase().includes(searchTerm);
            
            const matchesCategory = !category || product.category === category;
            
            let matchesPrice = true;
            if (priceRange === '0-10000') matchesPrice = product.price <= 10000;
            else if (priceRange === '10000-30000') matchesPrice = product.price > 10000 && product.price <= 30000;
            else if (priceRange === '30000-50000') matchesPrice = product.price > 30000 && product.price <= 50000;
            else if (priceRange === '50000+') matchesPrice = product.price > 50000;

            return matchesSearch && matchesCategory && matchesPrice;
        });

        this.displaySearchResults(filteredProducts);
    }

    displaySearchResults(products) {
        const resultsContainer = document.getElementById('searchResults');
        if (!resultsContainer) return;
        
        if (products.length === 0) {
            resultsContainer.innerHTML = `
                <div class="empty-results">
                    <i class="fas fa-search"></i>
                    <h3>Товары не найдены</h3>
                    <p>Попробуйте изменить параметры поиска</p>
                </div>
            `;
            return;
        }

        resultsContainer.innerHTML = `
            <div class="products-grid">
                ${products.map(product => this.createProductCard(product)).join('')}
            </div>
        `;
    }

    loadUserProfile() {
        if (!this.userProfile) return;
        
        const setName = (id, value) => {
            const el = document.getElementById(id);
            if (el && value) el.textContent = value;
        };
        
        setName('userName', this.userProfile.name);
        setName('userEmail', this.userProfile.email);
        setName('userPhone', this.userProfile.phone);
    }

    editProfile() {
        document.getElementById('editName').value = this.userProfile.name || '';
        document.getElementById('editEmail').value = this.userProfile.email || '';
        document.getElementById('editPhone').value = this.userProfile.phone || '';
        document.getElementById('profileModal').style.display = 'block';
    }

    saveProfile(event) {
        if (event) event.preventDefault();
        
        this.userProfile = {
            name: document.getElementById('editName').value,
            email: document.getElementById('editEmail').value,
            phone: document.getElementById('editPhone').value
        };

        localStorage.setItem('userProfile', JSON.stringify(this.userProfile));
        this.loadUserProfile();
        this.closeModal();
        this.showNotification('Профиль успешно сохранен!');
    }

    closeModal() {
        document.getElementById('profileModal').style.display = 'none';
    }

    viewOrderHistory() {
        const orderHistory = document.getElementById('orderHistory');
        if (!orderHistory) return;
        
        orderHistory.style.display = orderHistory.style.display === 'none' ? 'block' : 'none';
        if (orderHistory.style.display === 'block') {
            document.getElementById('ordersList').innerHTML = `
                <div class="order-item">
                    <p>Заказов пока нет</p>
                </div>
            `;
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed; top: 20px; right: 20px; background: #4CAF50; color: white;
            padding: 1rem 2rem; border-radius: 5px; z-index: 3000; box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
}

// Глобальные функции
let store;

function showTab(tabName) { 
    if (store) {
        store.showTab(tabName);
        if (tabName === 'cart') {
            store.selectedItems.clear();
            store.isAllSelected = false;
            store.updateSelectionInfo();
        }
    }
}

function searchProducts() { store?.performSearch(); }
function editProfile() { store?.editProfile(); }
function closeModal() { store?.closeModal(); }
function viewOrderHistory() { store?.viewOrderHistory(); }

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    store = new OnlineStore();
    
    document.getElementById('profileForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        store.saveProfile();
    });
    
    ['categoryFilter', 'priceFilter'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', () => store.performSearch());
    });
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', () => store.performSearch());
    }
    
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('profileModal');
        if (e.target === modal) store.closeModal();
    });
});