const btn = document.querySelector('button.mobile-menu-button');
const menu = document.querySelector('.mobile-menu');
const addtoCartBtn = document.querySelectorAll("#add-to-cart");

btn.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});


for (let i = 0; i < addtoCartBtn.length; i++) {
  addtoCartBtn[i].addEventListener('click', () => {
    cardNumber()
  });
}

function cardNumber() {
  let productNumbers = localStorage.getItem('cartNumbers');

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.getElementById("items-count").textContent = productNumbers + 1;
  } else {
    localStorage.setItem('cartNumbers', 1);
    document.getElementById("items-count").textContent = 1;
  }

}
const products =
  [{
    id: 1,
    name: "Belington",
    price: 40000,
    description: "Belington"
  },
  {
    id: 2,
    name: "Alaskan Malamute",
    price: 750000,
    description: "Alaskan Malamute"
  },
  {
    id: 3,
    name: "American Eskimo",
    price: 405000,
    description: "American Eskimo"
  },
  {
    id: 4,
    name: "Border Collie",
    price: 305000,
    description: "Border Collie"
  },
  {
    id: 5,
    name: "Jack Rusell Terrier",
    price: 505000,
    description: "Alaskan Malamute"
  },
  {
    id: 6,
    name: "Shiba Inu",
    price: 805000,
    description: "Shiba Inu"
  },
  {
    id: 7,
    name: "Rottweiler",
    price: 650000,
    description: "Rottweiler"
  },
  {
    id: 8,
    name: "Dalmatian",
    price: 465000,
    description: "Dalmatian"
  }
  ]








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

  setTimeout(showSlides, 2000); // Change image every 2 seconds
}

