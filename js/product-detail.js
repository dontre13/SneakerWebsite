import { addToCart } from "./cart.js";

export function displayProductDetail(){
    const productData = JSON.parse(sessionStorage.getItem('selectedProduct'));
    
    const titleEl = document.querySelector('.title');
    const priceEl = document.querySelector('.price');
    const descriptioneEl = document.querySelector('.description');
    const mainImageContainer = document.querySelector('.main-img');
    const thumbnailContainer = document.querySelector('.thumbnail-list');
    const colorContainer = document.querySelector('.color-options');
    const sizeContainer = document.querySelector('.size-options');
    const addToCartBtn = document.querySelector('#add-cart-btn');

    let selectedColor = productData.colors[0];
    let selectedSize = selectedColor.sizes[0];

    function updateProductDisplay(colorData){
        if(!colorData.sizes.includes(selectedSize)) {
            selectedSize = colorData.sizes[0];
        }

        thumbnailContainer.innerHTML = "";
        mainImageContainer.innerHTML = `<img src = "${colorData.mainImage}">`;
        const allThumbnails = [colorData.mainImage].concat(colorData.thumbnails.slice(0, 3));
        allThumbnails.forEach(thumb => {
            const img = document.createElement('img');
            img.src = thumb;

            thumbnailContainer.appendChild(img)

            img.addEventListener('click', ()=> {
                mainImageContainer.innerHTML = `<img src = "${thumb}">`;
            })
        })

        colorContainer.innerHTML = "";
        productData.colors.forEach(color => {
            const img = document.createElement('img');
            img.src = color.mainImage;
            if(color.name === colorData.name) {
                img.classList.add('selected')
            }
            

            colorContainer.appendChild(img)
            img.addEventListener('click', ()=> {
                selectedColor = color;
                updateProductDisplay(color)
            })
        })
        sizeContainer.innerHTML = "";
        colorData.sizes.forEach(size => {
            const btn = document.createElement('button');
            btn.textContent = size;
            if(size === selectedSize) {
                btn.classList.add('selected');
            }

            sizeContainer.appendChild(btn);

            btn.addEventListener('click', ()=>{
                document.querySelectorAll('.size-options button').forEach(el => el.classList.remove('selected'));
                btn.classList.add('selected');
                selectedSize = size;
            })
        })
    }
    titleEl.textContent = productData.title;
    priceEl.textContent = productData.price;
    descriptioneEl.textContent = productData.description;

    updateProductDisplay(selectedColor);

    addToCartBtn.addEventListener("click", ()=>{
        addToCart(productData, selectedColor, selectedSize)
    });
}
