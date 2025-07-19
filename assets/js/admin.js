const form = document.querySelector("#productsForm")
const productName = document.querySelector("#productName")
const productPrice = document.querySelector("#productPrice")
const productCategory = document.querySelector("#productType")
const productImage = document.querySelector("#productImage")
const tableBody = document.querySelector("#productsTable tbody");

const initialItems = [
    { name: "Laptop", price: 899.99, category: "electronics", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRME6yxTqHoQH1UVWuuBdTKPKm1m7zCSd21Yw&s" },
    { name: "Smartphone", price: 499.99, category: "electronics", image: "https://m.media-amazon.com/images/I/71s72QE+voL.jpg" },
    { name: "Headphones", price: 149.99, category: "electronics", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmHcEKd3Nqr3Nm3_3hSezsH6Z4wtiriGK6TA&s" },
    { name: "T-shirt", price: 19.99, category: "clothes", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlp-Ltk9qnyjnLsGhF5p4Tx5n8T83yCg9Zfg&s" },
    { name: "Jeans", price: 39.99, category: "clothes", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy6MFdX1tf1GV22pvB58eNZdTFsfWoD11-SA&s" },
    { name: "Jacket", price: 79.99, category: "clothes", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPyLiQRnRFOD7dWwAfjoCjco_4v2jxAqcWng&s" },   
    { name: "Guitar", price: 299.99, category: "music", image: "https://img.kirstein.de/out/pictures/generated/product/1/2000_2000_75/db6665e09ac8ca1fc7bc3cd91f9d6cf0_1.jpg" },
    { name: "Microphone", price: 89.99, category: "music", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDObzFHCXkt1XdWNG5Ois5TTksA9lHOAXFdA&s" },
    { name: "Speaker", price: 129.99, category: "music", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYd55QDetQ4OZir82uxJPJ-9X_TINi49UpLA&s" },   
    { name: "Board Game", price: 29.99, category: "games", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf0lHkL69iUMaF9LZTA8poT4n_xJR4ER9UeA&s" },
    { name: "VR Headset", price: 199.99, category: "games", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSchDvvM-X3y8mA5la_c-lY0SnhIDoEm6amGg&s" },
    { name: "Gamepad", price: 49.99, category: "games", image: "https://snakebyte.com/cdn/shop/files/01GAMEPADPROXBLACK.png?v=1691497844" },    
    { name: "Water Bottle", price: 9.99, category: "other", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6W8hSpqi4IsrDts2orDQaSByw0PqYsCwjLQ&s" },
    { name: "Backpack", price: 59.99, category: "other", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJkFZIXfWIXt7jIf5iFUGsH3J2ifvtIKyiEA&s" },
    { name: "Notebook", price: 4.99, category: "other", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Aq3Do_EAlUFeeqoh9CzjU8Rm93SxZQD03A&s" }
]

let products = JSON.parse(localStorage.getItem("products")) || []
if (!Array.isArray(products)) {
    products = [];
}

if (products.length === 0) {
    localStorage.setItem("products", JSON.stringify(initialItems));
    products = initialItems;
}

let lastId = products[products.length - 1]?.id || 0;

function saveToLocalStorage(){
    localStorage.setItem("products",JSON.stringify(products))
}

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
    saveToLocalStorage()
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
        <img src="${product.image}">
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
        saveToLocalStorage()
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

    const updateItem = prompt(`Enter a new value for ${field}:`,productToEdit[field]);
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
    saveToLocalStorage()
    displayItems();
};
