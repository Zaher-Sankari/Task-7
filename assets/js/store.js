const productsWrapper = document.getElementById("products-wrapper");
const carouselInner = document.querySelector("#productCarousel .carousel-inner");
const carouselIndicators = document.querySelector("#productCarousel .carousel-indicators");

const products = JSON.parse(localStorage.getItem("products")) || [];

const displayItems = (products) => {
    productsWrapper.innerHTML = '';
    carouselInner.innerHTML = '';
    carouselIndicators.innerHTML = '';

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
        const item = document.createElement("div");
        item.className = "carousel-item" + (index === 0 ? " active" : "");
        item.innerHTML = `
            <div class="d-flex justify-content-center">
                <div class="product-card text-center">
                    <img src="${product.image}">
                    <h3>${product.name}</h3>
                    <p>${product.category}</p>
                    <p>${product.price}$</p>
                </div>
            </div>
        `;
        carouselInner.append(item);

        const indicator = document.createElement("button");
        indicator.type = "button";
        indicator.setAttribute("data-bs-target", "#productCarousel");
        indicator.setAttribute("data-bs-slide-to", index);
        if (index === 0) indicator.classList.add("active");
        carouselIndicators.append(indicator);
    });
};

displayItems(products);

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

//filter by category
const categorySelect = document.querySelector("#categoryFilter");
const dynamicCategoryFilter = () => {
  const products = JSON.parse(localStorage.getItem("products")) || [];
    const filteredCategories = []
    products.forEach(product => {
        if (!filteredCategories.includes(product.category)) {
            filteredCategories.push(product.category);
    }
      });
      filteredCategories.forEach(category => {
          const option = `<option value="${category}">${category}</option>`;
          categorySelect.innerHTML += option;
      })
};
categorySelect.addEventListener("change", () => {
    const selectedCategory = categorySelect.value;
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const filtered = selectedCategory? products.filter(p => p.category === selectedCategory): products;
    displayItems(filtered);
});
dynamicCategoryFilter()