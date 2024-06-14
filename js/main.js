const categories = document.querySelector(".categories");
const products = document.querySelector(".products");

const renderProducts = (data) => {
  products.innerHTML = data
    .map(
      (item) => `
    <div class="products">
   <div class="product_img_block">
   <img class="product_img" src="${item.image}" alt="${item.title}" />
   <h2 class=" product_title"> ${item.title}</h2>
   <p class="product_price"> $ ${item.price}  </p>
   </div>
    </div>
    `
    )
    .join("");
};

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

categories.addEventListener("click", (e) => {
  const key = e.target.dataset.name;
  if (key) {
    document
      .querySelectorAll(".categories button")
      .forEach((button) => button.classList.remove("active"));

    e.target.classList.add("active");

    fetch(`https://fakestoreapi.com/products/category/${key}`)
      .then((res) => res.json())
      .then((data) => renderProducts(data))
      .catch((error) =>
        console.error("Error fetching category products:", error)
      );
  }
});


