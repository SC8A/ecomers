const socket = io(); //We make reference to socket.io
const productList = document.getElementById("productsList");
const addForm = document.getElementById("addForm");
const title = document.getElementById("title");
const price = document.getElementById("price");
const stock = document.getElementById("stock");
const code = document.getElementById("code");
const category = document.getElementById("category");
const description = document.getElementById("description");
const thumbnails = document.getElementById("thumbnails");
const deleteForm = document.getElementById("deleteForm");

socket.on("products", (data) => {
  console.log(data);
  // Emptying the DOM
  productList.innerHTML = "";
  // Load the products

  data.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("m-4");
    card.innerHTML = `
        <div class="card-body row justify-content-center">
            <h5 class="card-title">${product.title}</h5>            
            <p class="card-text">id: ${product.id}</p>
            <p class="card-text">${product.description}</p>
            <p class="card-text">$${product.price}</p>
            <p class="card-text">stock: ${product.stock}</p>
            <p class="card-text">code: ${product.code}</p>
            <p class="card-text">categoria: ${product.category}</p>
        </div>
      `;
    productList.appendChild(card);
  });
});

//Send the product to the server
addForm.addEventListener("submit", async (event) => {
  //this does not permit to refresh the page
  event.preventDefault();

  await fetch("/realtimeproducts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title.value,
      price: price.value,
      description: description.value,
      stock: stock.value,
      code: code.value,
      category: category.value,
      thumbnails: thumbnails.value
    }),
  });
});

deleteForm.addEventListener("submit", async (event) => {
  //this does not permit to refresh the page
  event.preventDefault();
  const id = document.getElementById("id");
  await fetch("/realtimeproducts", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id.value }),
  });
});
