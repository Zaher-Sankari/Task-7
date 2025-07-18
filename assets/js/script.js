const productsWrapper = document.getElementById("products-wrapper");

const products = JSON.parse(localStorage.getItem("products")) || []
console.log(products);

const displayItems = (products) =>{
    productsWrapper.innerHTML = ''
    if (products.length === 0) {
        productsWrapper.innerHTML = `<p>There's no items to show just yet D:</p>`;
        return
    }
    products.forEach(prodcut => {
        const card = document.createElement("div")
        card.className = ("product-card ")
        card.innerHTML = `
        <img src = "${prodcut.image}">
        <h3>${prodcut.name}</h3>
        <p>${prodcut.category}</p>
        <p>${prodcut.price}$</p>
        `
        productsWrapper.append(card)
    })
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

// slider
const sliderContainer = document.querySelector(".slides-container");
const dots = document.querySelector(".slider .dots");
let activeDote = 0;

products.forEach((product) => {
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
});

const slides = document.querySelectorAll(".slider .slide");

for (let i = 0; i < slides.length - 2; i++) {
    dots.innerHTML += `<span class="dote ${(i === 0) ? "active" : ""}" onclick="sliderMovment(${i})" id="dote${i}"></span>`;
}

function sliderMovment(index) {
    const dote = document.querySelector(`.slider #dote${index}`);
    const dotes = document.querySelectorAll(`.slider .dots .dote`);
    dotes.forEach(dot => dot.classList.remove("active"));
    dote.classList.add("active");

    slides.forEach(slide => {
    slide.style.transform = `translateX(calc(-${index * 100}%))`;
});

activeDote = index;
}