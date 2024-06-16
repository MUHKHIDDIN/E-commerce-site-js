// Komentariya
// bunda yani biz Htmll elementlarini  tanlab olamz..

const categories = document.querySelector(".categories");
const products = document.querySelector(".products");
const modal = document.querySelector(".modal");
const span = document.querySelector(".close");

///////////////////////////////////////////////

//  Komentariya
// yani biz  bunda  esa  mahsulotlarni render qilib brauzerga chiqarib olamz..

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

  //  Komentariya
  //  yani biz bunda esa  savatchaga qo'shib olamz yani bu bizda nima qiladi
  // bizda  bu har bir savtcha ikonkasi uchun bosganda modal oyna chiqarib beradi..

  const cartIcons = document.querySelectorAll(".cart-icon");
  cartIcons.forEach((icon) => {
    icon.addEventListener("click", (event) => {
      modal.style.display = "block";
    });
  });

  ////////////////////////////////////////////////////////////

  //  Komentariya
  // yani bunda ham esa har bir Buy tugmasini bosganda mahsulotni savatchaga
  // qoshib modal oyna korsatib beradi...

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

//  Komentariya
// yani bu funksiya esa tavarlarni brzauzerning mahaliy xotirasida yani local storage ga saqalab beradi..

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

//  Komentariya
// yani bu funksiya kategoriyalarni va barcha mahsulotlarni yuklaydi sahifada korsatib beradi ..

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

//  Komentariya
// yani bu funksiya esa bizda kategoriya tugmasiga boslganda kategoriya nomini olib tegishli mahsulotlarni
// yuklab sahifada korsatadi

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

//  Komentariya
// yani bunda esa modal oynani yopsh tugmaini bosganda oynani yopib beradi
// qanday qilib desangiz ustoz span elementni bosganda modal oynasini ko'rnishni none qilib qo'yadi
span.onclick = function () {
  modal.style.display = "none";
};

////////////////////////////////////////////////

//  Komentariya
// yani bunda esa modal oynadan tashqaridagi joyni boslganda oynani yopib beradi
// yani sahifani boshqa joyni bosganda modal oyna yopilib qoladi

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
