import * as database from "./database.js";
// Select the required elements
const menufood = $.querySelector(".menu-food");
const container = $.querySelector(".container");
const endShop = $.querySelector(".end-shop");
const numberOfAddedFoods = $.querySelector(".end-shop p span");
const pageCover = $.querySelector("#pageCover");
const cartElem = $.querySelector(".cart");
const closeCart = $.querySelector(".cart .head .fa-xmark");
const mainCartElem = $.querySelector(".cart .main");
// Required variables
let variablesElem = null;
let variables1 = null;
let variables2 = null;
let variables3 = null;
let btnPlusOrMinus = null;
let cart = null;
let btnPlusOrMinusCart = null;
let hrefSearch = location.search.split("=");
let sum = 0;
// Sweet Alert
let boxSwal = Swal.mixin({
  imageUrl: "Img/WebsiteLogo.png",
  imageWidth: "200px",
  imageAlt: "logo",
  background: "#be0b29",
  color: "#fff",
  confirmButtonText: "confirmation",
  timer : 5000
});
//Functions
function chack() {
  if (!hrefSearch[0] || !hrefSearch[1] || indexCookieLogin == -1) {
    location.href = "onlineOrder.html";
  }
}

function addToMenuFood() {
  database.foods.forEach((food) => {
    menufood.insertAdjacentHTML(
      "beforeend",
      `
    <a href="#${food[0]}" class="list-food">
      <img src="${food[1]}" alt="">
      <p>${food[0]}</p>
    </a>
    `
    );
  });
}
function addToMain() {
  database.foods.forEach((food) => {
    container.insertAdjacentHTML(
      "beforeend",
      `
    <div class="foods" id="${food[0]}">
      <h2>${food[0]}</h2>
      <div class="list-foods">
      </div>
    </div>
  `
    );
    variablesElem = $.querySelector(`#${food[0]} .list-foods`);
    food[2].forEach((content) => {
      variablesElem.insertAdjacentHTML(
        "beforeend",
        `
    <div class="food" id="${content.id}">
    <img src="${content.img}" alt="">
    <h3>${content.title}</h3>
    <p>${content.text}</p>
    <span class="price" id="${content.price}">Toman ${separtateTheNumber(
          content.price
        )}</span>
    <div class="btn">
        <div id="plus">
            <i class="fas fa-plus"></i>
        </div>
        <span>0</span>
        <div id="minus">
            <i class="fas fa-minus"></i>
        </div>
    </div>
    </div>
    `
      );
    });
  });
  btnPlusOrMinus = $.querySelectorAll(".food .btn div");
  btnPlusOrMinus.forEach((btn) => {
    btn.addEventListener("click", plusOrMinus);
  });
}
function separtateTheNumber(num) {
  variables1 = String(num).split("").reverse();
  variables2 = "";
  variables3 = "";
  for (let i = 1; i < variables1.length + 1; i++) {
    variables2 += variables1[i - 1];
    if (i % 3 == 0 && i != variables1.length) {
      variables2 += ",";
    }
  }
  variables2 = variables2.split("").reverse();
  variables2.forEach((char) => {
    variables3 += char;
  });
  return variables3;
}
function plusOrMinus(e, flag) {
  if (e.target.tagName == "I") {
    if (e.target.parentElement.id == "plus") {
      e.target.offsetParent.children[1].innerHTML++;
      if (!flag) {
        e.target.offsetParent.parentElement.classList.add("addToCart");
      }
      numberOfAddedFoods.innerHTML++;
    } else {
      if (e.target.offsetParent.children[1].innerHTML != 0) {
        e.target.offsetParent.children[1].innerHTML--;
        numberOfAddedFoods.innerHTML--;
      }
      if (e.target.offsetParent.children[1].innerHTML == 0 && !flag) {
        e.target.offsetParent.parentElement.classList.remove("addToCart");
      }
    }
  } else {
    if (e.target.id == "plus") {
      e.target.parentElement.children[1].innerHTML++;
      if (!flag) {
        e.target.parentElement.parentElement.classList.add("addToCart");
      }
      numberOfAddedFoods.innerHTML++;
    } else {
      if (e.target.parentElement.children[1].innerHTML != 0) {
        e.target.parentElement.children[1].innerHTML--;
        numberOfAddedFoods.innerHTML--;
      }
      if (e.target.parentElement.children[1].innerHTML == 0 && !flag) {
        e.target.parentElement.parentElement.classList.remove("addToCart");
      }
    }
  }
}
function endShopping() {
  sum = 0;
  cart = $.querySelectorAll(".addToCart");
  cartElem.style.left = "0";
  pageCover.style.display = "block";
  cart.forEach((food) => {
    sum += food.children[3].id * food.children[4].children[1].innerHTML;
  });
  if (cart.length) {
    mainCartElem.innerHTML = "";
    cart.forEach((food) => {
      mainCartElem.insertAdjacentHTML(
        "beforeend",
        `
      <div class="food-cart">
        <p>${food.children[1].innerHTML}</p>
        <p class="price">${food.children[3].innerHTML}</p>
        <div class="btn">
            <div id="plus" class="${food.id}">
                <i class="fas fa-plus"></i>
            </div>
            <span>${food.children[4].children[1].innerHTML}</span>
            <div id="minus" class="${food.id}">
                <i class="fas fa-minus"></i>
            </div>
        </div>
      </div>`
      );
    });
    mainCartElem.insertAdjacentHTML(
      "beforeend",
      `
    <div class="sum">
      <p>The amount payable : <span>${separtateTheNumber(sum)}</span></p>
    </div>
    <button class="order">Order</button>
    `
    );
    btnPlusOrMinusCart = $.querySelectorAll(".food-cart .btn div");
    btnPlusOrMinusCart.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        plusOrMinus(e, true);
        changeFoodCart(
          e.target.parentElement.classList[0] != "btn"
            ? e.target.parentElement.classList[0]
            : e.target.classList[0],
          e.target.offsetParent.children[1].innerHTML
        );
      });
    });
  }else{
    mainCartElem.innerHTML = `
    <p class="error">There is no product in the shopping cart!</p>
    `
  }
}
function closeFromCartElem() {
  cartElem.style.left = "-100%";
  pageCover.style.display = "none";
}
function changeFoodCart(id, value) {
  cart.forEach((food) => {
    food.id == id ? (variables1 = food) : "";
  });
  variables1.children[4].children[1].innerHTML = value;
  if (value == 0) {
    variables1.classList.remove("addToCart");
  }
  endShopping();
}
function order (e) {
  if(e.target.tagName == "BUTTON"){
    closeFromCartElem()
    if(hrefSearch[1] == "branch"){
      boxSwal.fire({
        text : "The food will be ready in 45 minutes, you can come and pick it up"
      }).then(() => {
        location.href = "index.html"
      })
    }else{
      boxSwal.fire({
        text : "Food will be sent to you within 1 hour"
      }).then(() => {
        location.href = "index.html"
      })
    }
  }
}
//Calling the required function when uploading the site
chack();
addToMenuFood();
addToMain();
//Add events be elements
endShop.addEventListener("click", endShopping);
pageCover.addEventListener("click", closeFromCartElem);
closeCart.addEventListener("click", closeFromCartElem);
mainCartElem.addEventListener("click", order)