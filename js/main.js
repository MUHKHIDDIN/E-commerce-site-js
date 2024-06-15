const categories = document.querySelector(".categories");
const products = document.querySelector(".products");
const modal = document.querySelector(".modal");
const span = document.querySelector(".close");

///////////////////////////////////////////////
const renderProducts = (data) => {
  products.innerHTML = data
    .map(
      (item) => `
    <div class="product">
      <div class="product_img_block">
        <img class="product_img" src="${item.image}" alt="${item.title}" />
        <h2 class="product_title">${item.title}</h2>
        <p class="product_price">$ ${item.price}</p>
        <img class="cart-icon" data-id="${item.id}" data-title="${item.title}" data-price="${item.price}" data-image="${item.image}" src="https://e7.pngegg.com/pngimages/665/391/png-clipart-shopping-cart-online-shopping-icon-red-shopping-cart-service-orange.png" alt="Add " />

        <button class="cart-btn" data-id="${item.id}" data-title="${item.title}" data-price="${item.price}" data-image="${item.image}">Buy</button>
      </div>
    </div>
    `
    )
    .join("");

  ///////////////////////////////////////////////////////

  const cartIcons = document.querySelectorAll(".cart-icon");
  cartIcons.forEach((icon) => {
    icon.addEventListener("click", (event) => {
      modal.style.display = "block";
    });
  });
  ////////////////////////////////////////////////////////////
  const cartButtons = document.querySelectorAll(".cart-btn");
  cartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const product = {
        id: event.target.dataset.id,
        title: event.target.dataset.title,
        price: event.target.dataset.price,
        image: event.target.dataset.image,
      };
      addToLocalStorage(product);
      modal.style.display = "block";
    });
  });
};
////////////////////////////////////////////////////////////
const addToLocalStorage = (product) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const exists = cart.some((item) => item.id === product.id);
  if (!exists) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Product added to cart:", product);
  } else {
    console.log("Product already in cart:", product);
  }
};
/////////////////////////////////////////////////////////////
const getCategories = async () => {
  try {
    const resCat = await fetch("https://fakestoreapi.com/products/categories");
    const categoriesData = await resCat.json();

    categories.innerHTML = categoriesData
      .map((item) => `<button data-name="${item}">${item}</button>`)
      .join("");

    const resProd = await fetch("https://fakestoreapi.com/products");
    const allProducts = await resProd.json();
    renderProducts(allProducts);

    const firstCategoryButton = categories.querySelector("button");
    if (firstCategoryButton) {
      firstCategoryButton.classList.add("active");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

getCategories();
//////////////////////////////////////////////////////////////
categories.addEventListener("click", async (e) => {
  const key = e.target.dataset.name;
  if (key) {
    document
      .querySelectorAll(".categories button")
      .forEach((button) => button.classList.remove("active"));

    e.target.classList.add("active");

    try {
      const res = await fetch(
        `https://fakestoreapi.com/products/category/${key}`
      );
      const data = await res.json();
      renderProducts(data);
    } catch (error) {
      console.error("Error fetching category products:", error);
    }
  }
});
////////////////////////////////////////////////////
span.onclick = function () {
  modal.style.display = "none";
};

////////////////////////////////////////////////
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
