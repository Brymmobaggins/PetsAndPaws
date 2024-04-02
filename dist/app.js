
const btn = document.querySelector('button.mobile-menu-button');
const menu = document.querySelector('.mobile-menu');
const addtoCartBtn = document.querySelectorAll("#add-to-cart");

// Toggle the hidden class on click
btn.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});


// Loop through the add to cart buttons
for (let i = 0; i < addtoCartBtn.length; i++) {
  addtoCartBtn[i].addEventListener('click', () => {
    cartNumber(products[i])
    totalCost(products[i])
  });
}

// Update cart number and items
function cartNumber(product) {

  let productNumbers = localStorage.getItem('cartNumbers');

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.getElementById("items-count").textContent = productNumbers + 1;
  } else {
    localStorage.setItem('cartNumbers', 1);
    document.getElementById("items-count").textContent = 1;
  }

  setItems(product)
}

// Set items in localStorage
function setItems(product) {
  let cartItems = localStorage.getItem("productInCart")
  cartItems = JSON.parse(cartItems)

  if (cartItems != null) {

    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product
      }
    }
    cartItems[product.tag].inCart += 1
  } else {
    product.inCart = 1
    cartItems = {
      [product.tag]: product
    }
  }
  //  convert from JavaScript object to JSON and set to local Storage
  localStorage.setItem("productInCart", JSON.stringify(cartItems))
}



// On load, update cart numbers
function onloadsCartNumbers() {
  let productNumbers = localStorage.getItem('cartNumbers');
  if (productNumbers) {
    document.getElementById("items-count").textContent = productNumbers;
  }
}
onloadsCartNumbers()
// call display cart
displayCart()

function totalCost(product) {

  let cartCost = localStorage.getItem("totalCost");

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price)
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}
function displayCart() {
  let cartItems = localStorage.getItem('productInCart')

  // convert from JSON object ot JavaScript object
  cartItems = JSON.parse(cartItems)

  let productContainer = document.querySelector(".products")
  if (cartItems && productContainer) {
    productContainer.innerHTML = ""
    Object.values(cartItems).map(item => {
      productContainer.innerHTML +=
        `<div class="product">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 hover:text-red-600 cursor-pointer">
          <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
        </svg>
        
          <img src="/images/${item.img}" alt="${item.name}">
         <span>N${item.price}</span>
         <span class="quantity">${item.inCart}</span>
      </div>`
    })
  }

  console.log(cartItems)
}
// Product data
const products =
  [{
    id: 1,
    img: "Bedlington Terrier.webp",
    name: "Belington",
    price: 40000,
    description: "Belington",
    inCart: 0,
    tag: "Belington",


  },
  {
    id: 2,
    img: "Alaskan-Malamute.webp",
    name: "Alaskan Malamute",
    price: 750000,
    description: "Alaskan Malamute",
    inCart: 0,
    tag: "AlasKanMalamute"
  },
  {
    id: 3,
    img: "American-Eskimo.jpeg",
    name: "American Eskimo",
    price: 405000,
    description: "American Eskimo",
    inCart: 0,
    tag: "AmericanEskimo"

  },
  {
    id: 4,
    name: "Border Collie",
    price: 305000,
    description: "Border Collie",
    inCart: 0,
    tag: "BorderCollie",
    img: "Border-Collie.jpeg"
  },
  {
    id: 5,
    name: "Jack Rusell Terrier",
    price: 505000,
    description: "Alaskan Malamute",
    inCart: 0,
    tag: "AlaskaMalamute",
    img: "JackRusell-terrier.webp"
  },
  {
    id: 6,
    name: "Shiba Inu",
    price: 805000,
    description: "Shiba Inu",
    inCart: 0,
    tag: "ShibaInu",
    img: "Shiba-Inu-2.webp"


  },
  {
    id: 7,
    name: "Rottweiler",
    price: 650000,
    description: "Rottweiler",
    inCart: 0,
    tag: "Rottweiler",
    img: "Rottweiler-4.avif"
  },
  {
    id: 8,
    name: "Dalmatian",
    price: 465000,
    description: "Dalmatian",
    inCart: 0,
    tag: "Dalmatian",
    img: "dalmatian-5.jpeg"
  }
  ]








// Image slider
let slideIndex = 0;
// showSlides();

function showSlides() {
  let slides = document.getElementsByClassName("slide");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";

}