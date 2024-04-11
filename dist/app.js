// Image slider
let slideIndex = 0

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
const btn = document.querySelector('button.mobile-menu-button');
const menu = document.querySelector('.mobile-menu');
const addtoCartBtn = document.querySelectorAll("#add-to-cart");



// Toggle the hidden class on click
btn.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});

for (let i = 0; i < addtoCartBtn.length; i++) {
  addtoCartBtn[i].addEventListener('click', () => {
    cartNumber(products[i])
    totalCost(products[i])
    withFlatRate()
    confirmationMessage()
  });
}

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
    price: 85000,
    description: "American Eskimo",
    inCart: 0,
    tag: "AmericanEskimo"

  },
  {
    id: 4,
    name: "Border Collie",
    price: 90000,
    description: "Border Collie",
    inCart: 0,
    tag: "BorderCollie",
    img: "Border-Collie.jpeg"
  },
  {
    id: 5,
    name: "Jack Rusell Terrier",
    price: 85000,
    description: "Alaskan Malamute",
    inCart: 0,
    tag: "AlaskaMalamute",
    img: "JackRusell-terrier.webp"
  },
  {
    id: 6,
    name: "Shiba Inu",
    price: 120000,
    description: "Shiba Inu",
    inCart: 0,
    tag: "ShibaInu",
    img: "Shiba-Inu-2.webp"


  },
  {
    id: 7,
    name: "Rottweiler",
    price: 130000,
    description: "Rottweiler",
    inCart: 0,
    tag: "Rottweiler",
    img: "Rottweiler-4.avif"
  },
  {
    id: 8,
    name: "Dalmatian",
    price: 150000,
    description: "Dalmatian",
    inCart: 0,
    tag: "Dalmatian",
    img: "dalmatian-5.jpeg"
  }
  ]
// show confrimation message when product is added
function confirmationMessage() {
  const confirmationMessage = document.querySelector(".message")
  confirmationMessage.style.display = "block"

  //  hide a message after a delay
  setTimeout(() => {
    confirmationMessage.style.display = "none"
    // hides message after one second
  }, 1000)
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
  let cartItems = localStorage.getItem('productInCart');
  if (productNumbers) {
    document.getElementById("items-count").textContent = productNumbers;
  }
  if (!cartItems) {
    localStorage.setItem('cartNumbers', 0)
    document.getElementById("items-count").textContent = 0
  }
}
onloadsCartNumbers()

// call display cart
displayCart()




function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");
  // console.log(cartCost)
  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}


function withFlatRate() {
  let rate = 3000

  let totalCost = localStorage.getItem("totalCost");
  totalCost = parseInt(totalCost);

  let costWithFlatRate = totalCost + rate;

  localStorage.setItem("costWithFlatRate", costWithFlatRate);
}


function displayCart() {
  let cartItems = localStorage.getItem('productInCart')
  // convert from JSON object to JavaScript object
  cartItems = JSON.parse(cartItems)

  const itemContainer = document.querySelector(".item-list")
  const totalContainer = document.querySelector(".total-container")
  const cartCost = localStorage.getItem("totalCost")
  const costWithFlatRate = localStorage.getItem("costWithFlatRate")
  if (cartItems && itemContainer && totalContainer) {
    itemContainer.innerHTML = ""
    Object.values(cartItems).map(item => {
      itemContainer.innerHTML +=
        `<tr class="tr *:p-3 text-sm tracking-tight text-gray-600 even:bg-alabaster-100 font-normal">
            <td>${item.name}</td>
            <td height=50 width=100><img src="/images/${item.img}" alt="${item.name}"></td>
            <td><span>&#x20A6;</span>${item.price}</td>
             <td class="text-center">
              <span id="decrease"> - </sp>
              <input class="border border-red-200 qantity" value="${item.inCart}">
              <span id="increase" onclick="increaseCartItemQuantity(this)"> + </span>
             </td>
           <td class=""><span>&#x20A6;</span>${item.inCart * item.price}</td>
           <td class="text-center delete">

              <svg xmlns="http://www.w3.org/2000/svg" fill="#ff9494" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-6 text-red-400 hover:text-red-400 hover:cursor-pointer">
               <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>

         </td>
        </tr>
      `
    })

    totalContainer.innerHTML += `
    <div class="flex justify-end border-1">
      <div class="w-1/2 py-2 *:mx-2 *:pt-1 *:text-sm font-bold">
          <div class="flex justify-between">
            <h4 class="basket-total bg-alasbaster-700">
              Subtotal
            </h4>
            <h4 class="basket-total bg-alasbaster-700">
             <span>&#x20A6;</span>${cartCost}
            </h4>
          </div><hr/>

          <div class="flex justify-between">
            <h4>Shipping Fee</h4>
            <h4>Flat rate: <span>&#x20A6;</span>3,000</h4>
          </div><hr/>
          <div class="flex justify-between text-base font-sm">
            <h4>Total</h4>
            <h4><span>&#x20A6;</span>${costWithFlatRate}</h4>
          </div><hr/>
          <a class="text-xs font-light text-amethyst-600 underline cursor-pointer" id="open">Enter discount or voucher code</a>
        </div>
        </div>
        <div class="flex text-center mt-1 p-2 *:w-1/2 ">
          <a href="index.html" class="border-4 border-double border-amethyst-600 rounded-full text-sm py-1 mx-1">Continue Shopping</a>
          <a  class="border-2 rounded-full bg-amethyst-600 hover:bg-amethyst-700 text-white text-sm py-1 mx-1" id="place-order">Place Order</a>
        </div>
     `
  } else {
    document.querySelector("table").remove()
    // document.querySelector("table").style.display = "none"
    document.querySelector(".total-container").innerHTML = `
    <div class="border border-1 *:mt-3">
       <div class="text-center text-base">
          <h4>Your cart is currently empty</h4>
       </div>
       <div class="flex h-[200px] item-center justify-center">
         <img src="/images/empty-cart-img.jpeg" alt="">       
         </div>
       <div class="text-center text-xs font-light">
          <span>You may check out some available product and buy in the shop</span>
       </div>
      <a href="index.html" class="border-2 rounded-full bg-amethyst-600 hover:bg-alabaster-300 text-center text-white text-sm block w-1/4 mb-2 m-auto py-1">Return to shop</a>

    </div>
    `
  }

  console.log(cartItems)
}
// function to control the modal
function modalControl() {
  const modal = document.querySelector("#modal");
  const modalOpenButton = document.querySelector("#open");
  const closeModalButton = document.querySelector("#close");
  const orderButton = document.querySelector("#place-order");

  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modalOpenButton.addEventListener("click", () => {
    modal.style.display = "block";
  });

  orderButton.addEventListener("click", () => {
    modal.style.display = "block";

    let confirmationNu
    document.querySelector("#modal-content").textContent = ""
    document.querySelector("#number").textContent = confirmationNumber()

  })

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

}
// call modal
modalControl()



const inputEl = document.querySelector("#my-input")
const codeButton = document.querySelector(".promo-button")

inputEl.addEventListener('input', () => {
  if (inputEl.value.length > 0) {
    codeButton.classList.remove("opacity-25")
    codeButton.classList.add("opacity-100")

  } else {
    codeButton.classList.remove("opacity-100")
    codeButton.classList.add("opacity-25")
  }
})

// function to generate random confirmation number

function generateConfirmationNumber() {
  const randomNumber = Math.floor(Math.random() * 1000000000)
  return randomNumber
}
























// handle submit of promo code
// const promoForm = document.querySelector("form")
// promoForm.addEventListener("submit", (e) => {

//   e.preventDefault()

//   const code = inputEl.value
//   if (code === "SUMMER50") {
//     const costWithFlatRate = localStorage.getItem("costWithFlatRate")
//     const totalCost = parseFloat(costWithFlatRate)
//     let discountAmount = totalCost * 0.5

//     FlatRate = costWithFlatRate - discountAmount
//     totalContainer.innerHTML = ""
//     totalContainer.innerHTML += `
//     <div>
//     <p>Discount applied! Your new total is <span >&#x20A6;</span>${costWithFlatRate}
//     </p>
//     </div>
// `
//     // const confirmationNumber = generateRandomConfirmationNumber()

//     totalContainer.innerHTML += `
//       <div>
//       <p>Discount applied! Your new total is <span>
//         &#x20A6;</span>${costWithFlatRate}</p>
//     </div>
//       `
//   }
// })