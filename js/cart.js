
export function addToCart(product, color, size){
    let cart = JSON.parse(sessionStorage.getItem("cart")) || []
    
    const existingItem =  cart.find(item => item.id === product.id && item.color === color.name && item.size === size);

    if (existingItem){
        existingItem.quantity += 1;
    }else{
    cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: color.mainImage,
        color: color.name,
        size: size,
        quantity: 1
    })
    }
    sessionStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge();
}

export function displayCart(){
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    const cartItemsContainer = document.querySelector('.cart-items');
    const subtotalEl = document.querySelector('.subtotal');
    const grandTotalEl = document.querySelector('.grand-total');

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0){
        cartItemsContainer.innerHTML = "<p> Your Cart is empty </p>"
        subtotalEl.textContent = "$0";
        grandTotalEl.textContent = "$0";
        return;
    }

    let subtotal = 0;

    cart.forEach((item, index) => {
        const itemTotal = parseFloat(item.price.replace("$", "")) * item.quantity;
        subtotal += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.classList.add('each-item')
        cartItem.innerHTML = `
            
                <div class = "product">
                    <img src="${item.image}">
                    <div class = "item-detail">
                        <p>${item.title}</p>
                        <div class ="size-color-box">
                            <span class = "size">Size: ${item.size}</span>
                            <span class= "color">Color: ${item.color}</span>
                        </div>
                    </div>
                    
                </div>
                <span class="price"> ${item.price} </span>
                <div class="quantity">
                    <input type="number" value="${item.quantity}" min="1" data-index="${index}">
                </div>
                <span class ="total-price">$${itemTotal}</span>
                <button class="remove" data-index="${index}"><i class="ri-close-line"></i></button>
            
        `;
        cartItemsContainer.appendChild(cartItem)
    });

    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    grandTotalEl.textContent = `$${subtotal.toFixed(2)}`;

    removeCartItem();
    updateCartQuantity()

}


function removeCartItem(){
    document.querySelectorAll(".remove").forEach(button => {
        button.addEventListener('click', function(){
            let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
            const index = this.getAttribute('data-index')
            cart.splice(index, 1)
            sessionStorage.setItem('cart', JSON.stringify(cart));
            displayCart();
            updateCartBadge();
        })
    })
}

function updateCartQuantity(){
    document.querySelectorAll(".quantity input").forEach(input => {
        input.addEventListener('change', function(){
            let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
            const index = this.getAttribute('data-index')
            cart[index].quantity = parseInt(this.value)
            sessionStorage.setItem('cart', JSON.stringify(cart))
            displayCart();
            updateCartBadge();
        })
    })
}

export function updateCartBadge(){
    const cart = JSON.parse(sessionStorage.getItem('cart') || [])
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const badge = document.querySelector('.cart-item-count');

    if (badge){
        if(cartCount > 0 ){
            badge.textContent = cartCount;
            badge.style.display = "block"
            
        }else{
            badge.style.display = "none";
        }
    }
}

