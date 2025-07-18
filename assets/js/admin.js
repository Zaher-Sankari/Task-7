const form = document.querySelector("#productsForm")
const productName = document.querySelector("#productName")
const productPrice = document.querySelector("#productPrice")
const productCategory = document.querySelector("#productType")
const productImage = document.querySelector("#productImage")
const tableBody = document.querySelector("#productsTable tbody");

const initialItems = []
let products = JSON.parse(localStorage.getItem("products")) || []
if (!Array.isArray(products)) {
    products = [];
}

if (products.length === 0) {
    localStorage.setItem("products", JSON.stringify(initialItems));
    products = initialItems;
}

let lastId = products[products.length - 1]?.id || 0;

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const addProducts = {
        id: lastId +1,
        name: productName.value,
        price:productPrice.value,
        category:productCategory.value,
        image:productImage.value
    };
    products.push(addProducts);
    lastId = addProducts.id;
    localStorage.setItem("products",JSON.stringify(products))
    form.reset()
    displayItems()
})
// to display items inside the table:
const displayItems = () =>{
    tableBody.innerHTML = ''
    products.forEach(product =>{
        const itemRow= document.createElement("tr")
        itemRow.innerHTML = `
        <td>
        <img src="${product.image}";">
        <button class="editBtn" onclick="editItem(${product.id},'image')">edit</button>
        </td>
        <td>${product.name}
        <button class="editBtn" onclick="editItem(${product.id},'name')">edit</button>
        </td>
        <td>${product.price}$
        <button class="editBtn" onclick="editItem(${product.id},'price')">edit</button>
        </td>
        <td>${product.category}
        <button class="editBtn" onclick="editItem(${product.id},'category')">edit</button>
        </td>
        <td>
        <button onclick="editButtons(this)">Modify</button>
        <button onclick="deleteItem(${product.id})">Delete</button>
        </td>
        `
    tableBody.appendChild(itemRow) 
    })
}

const deleteItem = (id) => {
    const confirmation = confirm ("Are you sure you want to delete this item?")
    if(confirmation){
        products = products.filter(product => product.id !== id);
        localStorage.setItem("products", JSON.stringify(products));
    }
    displayItems();
}
displayItems();

//show/hide edit buttons:
const editButtons = (button) => {
    const row = button.closest("tr");
    const editButtons = row.querySelectorAll(".editBtn");
    editButtons.forEach(btn => {
        btn.style.display = btn.style.display === "inline" ? "none" : "inline";
    });
}
//edit every data we want from inserted items (name, price, image and category)
const editItem = (id, field) => {
    const productToEdit = products.find(product => product.id === id);
    if (!productToEdit) return;

    const updateItem = prompt(`Enter a new value for ${field}:`);
    if (!updateItem) return;

    switch (field) {
        case "name":
            productToEdit.name = updateItem;
            break;
        case "category":
            productToEdit.category = updateItem;
            break;
        case "image":
            productToEdit.image = updateItem;
            break;
        case "price":
            productToEdit.price = updateItem;
            break;
        default:
            return;
    }

    localStorage.setItem("products", JSON.stringify(products));
    displayItems();
};
