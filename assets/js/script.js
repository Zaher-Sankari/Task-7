const productsWrapper = document.getElementById("products-wrapper");
const sliderContainer = document.querySelector(".slides-container");
const dots = document.querySelector(".slider .dots");
let activeDot = 0;

const products = JSON.parse(localStorage.getItem("products")) || []
console.log(products);

const displayItems = (products) => {
    productsWrapper.innerHTML = '';
    sliderContainer.innerHTML = '';
    dots.innerHTML = '';
    
    if (products.length === 0) {
        productsWrapper.innerHTML = `<p>There's no items to show just yet D:</p>`;
        return;
    }

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <img src="${product.image}">
            <h3>${product.name}</h3>
            <p>${product.category}</p>
            <p>${product.price}$</p>
        `;
        productsWrapper.append(card);
    });

    products.forEach((product, index) => {
        const slide = document.createElement("div");
        slide.className = "slide";
        slide.innerHTML = `
            <div class="product-card">
                <img src="${product.image}">
                <h3>${product.name}</h3>
                <p>${product.category}</p>
                <p>${product.price}$</p>
            </div>`;
        sliderContainer.appendChild(slide);

        if (index < products.length - 2) {
            const dot = document.createElement("span");
            dot.className = `dot ${index === 0 ? "active" : ""}`;
            dot.id = `dot${index}`;
            dot.onclick = () => sliderMovment(index);
            dots.appendChild(dot);
        }
    });

    activeDot = 0;
}

displayItems(products)

//sort cards by price (ascending or descending sort)
const sortPrice = document.querySelector("#sortFilter")
sortPrice.addEventListener("change",() =>{
    const products = JSON.parse(localStorage.getItem("products")) || []
    let sortValue = sortPrice.value;
    if(sortValue == "asc"){
        products.sort((a,b) => a.price - b.price)
    }
    else if (sortValue == 'desc'){
        products.sort((a,b) => b.price - a.price) 
    }
    displayItems(products);
})

//filter by input field
const searchInput = document.querySelector("#searchInput")
searchInput.addEventListener("keyup", () =>{
    const products = JSON.parse(localStorage.getItem("products")) || []
    let inputValue = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product => {
        let name = product.name.toLowerCase()
        let category = product.category.toLowerCase()
        return name.startsWith(inputValue) || category.startsWith(inputValue);
    })
    if (filteredProducts.length > 0) {
        displayItems(filteredProducts);
    }
    else {
    productsContainer.innerHTML = "<p>No Data to show</p>";
    }
})
displayItems(products);

//filter by category - not dynamic
const categorySelect = document.querySelector("#categoryFilter");

categorySelect.addEventListener("change", () => {
    const selectedCategory = categorySelect.value;
    const products = JSON.parse(localStorage.getItem("products")) || [];

    const filtered = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

    displayItems(filtered);
});

function sliderMovment(index) {
    const dot = document.querySelector(`.slider #dot${index}`);
    const dotes = document.querySelectorAll(`.slider .dots .dot`);
    const slides = document.querySelectorAll(".slider .slide");
    dotes.forEach(dot => dot.classList.remove("active"));
    dot.classList.add("active");

    slides.forEach(slide => {
        slide.style.transform = `translateX(calc(-${index * 100}%))`;
    });

    activeDot = index;
}