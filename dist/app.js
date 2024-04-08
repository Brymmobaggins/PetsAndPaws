
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



// function clearItem(product) {
//   let cartItems = localStorage.getItem("productInCart");
//   cartItems = JSON.parse(cartItems);

//   if (cartItems[product.tag] != undefined) {
//     cartItems[product.tag];
//     localStorage.setItem("productInCart", JSON.stringify(cartItems));
//     displayCart();
//   }
// }


// document.querySelector(".item-list").addEventListener("click", (e) => {
//   deleteItem(e.target)
// })
// function deleteItem(el) {
//   if (el.classList.contains("delete")) {
//     el.parentElement.parentElement.remove()
//   }
// }

// function deleteItem(el) {
//   if (el.classList.contains("delete")) {
//     let product = el.parentElement.parentElement;
//     product.remove();

//     let cartItems = localStorage.getItem("productInCart");
//     cartItems = JSON.parse(cartItems);

//     let productTag = product.querySelector(".product-title");
//     // console.log(productTag)

//     if (cartItems[productTag] != undefined) {
//       delete cartItems[productTag];
//       localStorage.setItem("productInCart", JSON.stringify(cartItems));
//     }
//   }
// }



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
        `<tr class="tr *:p-3 text-sm tracking-tight text-gray-600 even:bg-alabaster-100 font-normal">
            <td>${item.name}</td>
            <td height=50 width=100><img src="/images/${item.img}" alt="${item.name}"></td>
            <td><span>&#x20A6;</span>${item.price}</td>
             <td class="text-center">
              <span id="decrease"> - </span>
              <span class="font-bold text-base pq">${item.inCart}</span>
              <span id="increase"> + </span>
             </td>
           <td class=""><span>&#x20A6;</span>${item.inCart * item.price}</td>
           <td class="text-center">
           
              <svg xmlns="http://www.w3.org/2000/svg" fill="#ff9494" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-6 text-red-400 hover:text-red-400 hover:cursor-pointer">
               <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>

         </td>
        </tr>
      `
    })

    totalContainer.innerHTML += `
    <div class="flex justify-end m-auto w-full py-2 *:mx-2 bg-alabaster-400">
        <h4 class="basket-total bg-alasbaster-700">
             Basket Total 
        </h4>
        <h4 class="basket-total bg-alasbaster-700">
            <span>&#x20A6;</span>${cartCost}
       </h4>
    </div>
     `
  } else {
    document.querySelector("table").remove()
    // document.querySelector("table").style.display = "none"
    document.querySelector(".total-container").innerHTML = `
    <div class="border border-1 *:mt-3">
       <div class="text-center text-base">
          <h5>Your cart is currently empty</h5>
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

// document.querySelector("#remove-item").addEventListener("click", function () {
//   document.querySelector("tbody").remove()
// })







// show confrimation message
function confirmationMessage() {
  const confirmationMessage = document.querySelector(".message")
  confirmationMessage.style.display = "block"

  //  hide a message after a delay
  setTimeout(() => {
    confirmationMessage.style.display = "none"
    // hides message after one second
  }, 1000)
}



// Product data








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
