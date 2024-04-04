
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
    confirmationMessage()
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

// function toLocaleString({ item }) {
//   return Intl.NumberFormat("en-NG", {
//     style: "currency",
//     currency: "NGN",
//   }).format(item)
// }
// console.log(toLocaleString(405000))


function displayCart() {
  let cartItems = localStorage.getItem('productInCart')

  // convert from JSON object to JavaScript object
  cartItems = JSON.parse(cartItems)

  const itemContainer = document.querySelector(".item-list")
  const totalContainer = document.querySelector(".total-container")
  const cartCost = localStorage.getItem("totalCost")
  if (cartItems && itemContainer && totalContainer) {
    itemContainer.innerHTML = ""
    Object.values(cartItems).map(item => {
      itemContainer.innerHTML +=
        `<tr class="*:p-3 text-sm tracking-tight text-gray-600 even:bg-alabaster-100 font-normal">
            <td>${item.name}</td>
            <td height=50 width=100><img src="/images/${item.img}" alt="${item.name}"></td>
            <td><span>&#x20A6;</span>${item.price}</td>
             <td class="text-center"><span class="border border-1 border-alabaster-300">${item.inCart}</span> </td>
           <td class=""><span>&#x20A6;</span>${item.inCart * item.price}</td>
           <td class="text-center"><a href="#" class="text-red-500 cursor-pointer">X</td>
        </tr>
      `
    })

    totalContainer.innerHTML += `
    <div class="flex justify-end m-auto w-full py-2 *:mx-2 bg-alabaster-200">
        <h4 class="basket-total bg-alasbaster-700">
             Basket Total 
        </h4>
        <h4 class="basket-total bg-alasbaster-700">
            <span>&#x20A6;</span>${cartCost}
       </h4>
    </div>
     `
  }


  console.log(cartItems)
}




// show confrimation message
function confirmationMessage() {
  const confirmationMessage = document.querySelector(".message")
  confirmationMessage.style.display = "block"
  
  //  hide a message after a delay
  setTimeout(() => {
    confirmationMessage.style.display = "none"
  }, 3000) // hides message after three seconds
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
    price: 50000,
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