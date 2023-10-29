const openShopping = document.querySelector(".shopping"),
  closeShopping = document.querySelector(".closeShopping"),
  body = document.querySelector("body"),
  list = document.querySelector(".list"),
  listCart = document.querySelector(".listCart"),
  total = document.querySelector(".total"),
  quantity = document.querySelector(".quantity");

openShopping.addEventListener("click", () => {
  body.classList.add("active");
});

closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
});

let products = [
  {
    id: 1,
    name: "Adidas Red ",
    image: "1.png",
    price: 2000,
    description: "Good for running",
  },
  {
    id: 2,
    name: "Nike Sports Blue",
    image: "2.png",
    price: 2200,
    description: "Best for sports",
  },
  {
    id: 3,
    name: "Nike White ",
    image: "3.png",
    price: 2400,
    description: "Good for casual wear",
  },
  {
    id: 4,
    name: "Nike Purple Casual",
    image: "4.png",
    price: 2600,
    description: "Comfortable for Daily Use ",
  },
  {
    id: 5,
    name: "Nike Black Sports ",
    image: "5.png",
    price: 1400,
    description: "Perfect for sports",
  },
  {
    id: 6,
    name: "Adidas Red Casual ",
    image: "6.png",
    price: 1800,
    description: "Casual Daily wear ",
  },
];

let listCarts = [];

const initApp = () => {
  products.forEach((value, key) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("item");
    newDiv.innerHTML = `
            <img src = "img/${value.image}">
            <div class = "title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <div class = "description">${value.description}</div>
            
            <button onclick = "addToCart(${key})">Add To Cart</button>
        `;
    list.appendChild(newDiv);
  });
};

initApp();

const addToCart = (key) => {
  if (listCarts[key] == null) {
    listCarts[key] = JSON.parse(JSON.stringify(products[key]));

    listCarts[key].quantity = 1;

    alert("Shoe added to cart");
  }

  reloadCart();
};

const reloadCart = () => {
  listCart.innerHTML = "";
  let count = 0;
  let totalPrice = 0;

  listCarts.forEach((value, key) => {
    totalPrice = totalPrice + value.price;
    count = count + value.quantity;

    if (value != null) {
      let newDiv = document.createElement("li");
      newDiv.innerHTML = `
                <div><img src = "img/${value.image}"></div>
                <div class = "cartTitle">${value.name}</div>
                <div class = "cartPrice">${value.price.toLocaleString()}</div>

                <div>
                    <button style = "background-color:#560bad;" class = "cartButton" onclick = "changeQuantity(${key}, ${
        value.quantity - 1
      })">-</button>
                    <div class = "count">${value.quantity}</div>
                    <button style = "background-color:#560bad;" class = "cartButton" onclick = "changeQuantity(${key}, ${
        value.quantity + 1
      })">+</button>
                </div>
            `;
      listCart.appendChild(newDiv);
    }

    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
  });
};

const changeQuantity = (key, quantity) => {
  if (quantity == 0) {
    delete listCarts[key];
  } else {
    listCarts[key].quantity = quantity;
    listCarts[key].price = quantity * products[key].price;
  }
  reloadCart();
};
