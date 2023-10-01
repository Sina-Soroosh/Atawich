"use strict";
let $ = document;
// Select the required elements
const menu = $.querySelector("#menu");
const header = $.querySelector("header");
const logoShowMenu = $.querySelector("#logo-menu");
const logoCloseMenu = $.querySelector("#close-menu");
const layoutLoginWraper = $.querySelector(".layout-login-wraper");
const nameLogin = $.querySelector("#open-loginRegister")
// Required variables
let indexCookieLogin = $.cookie.indexOf("login");
let now = null
// Sweet Alert
let boxInputs = Swal.mixin({
  title: "Enter your mobile number",
  input: "text",
  inputAttributes: {
    autocapitalize: "off",
    style: "background-color: #fff;color:#000;text-align:center",
    placeholder: "(...091) Mobile Number",
  },
  imageUrl: "Img/WebsiteLogo.png",
  imageWidth: "200px",
  imageAlt: "logo",
  background: "#be0b29",
  color: "#fff",
  confirmButtonText: "confirmation",
});
let boxError = Swal.mixin({
  title: "Please enter the correct mobile number",
  icon: "error",
  position: "center",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
//Functions
function showMenu() {
  menu.style.visibility = "visible";
  menu.style.right = "0";
}
function hideMenu() {
  menu.style.visibility = "hidden";
  menu.style.right = "-100%";
}
function goToLogin() {
  if(indexCookieLogin == -1){
    showModalPhone()
  }
}
function login () {
  indexCookieLogin = $.cookie.indexOf("login");
  if(indexCookieLogin != -1){
    nameLogin.innerHTML = `<span>${$.cookie.slice(indexCookieLogin).split("=")[1].split("/")[1]}</span`
  }
}
function scrollSite(e) {
  if (this.documentElement.scrollTop) {
    header.classList.add("scorlled");
  } else {
    header.classList.remove("scorlled");
  }
}
function showModalPhone(e) {
  indexCookieLogin = $.cookie.indexOf("login");
  if (indexCookieLogin == -1) {
    boxInputs.fire({}).then((result) => {
      if (!result.dismiss) {
        if (result.value.length == 11 && !isNaN(result.value)) {
          showModalName(result.value);
        } else {
          boxError.fire({}).then((result) => {
            showModalPhone();
          });
        }
      }
    });
  } else {
    showBranchs();
  }
}
function showModalName(number) {
  boxInputs
    .fire({
      title: "Enter your Name",
      inputAttributes: {
        autocapitalize: "off",
        style: "background-color: #fff;color:#000;text-align:center",
        placeholder: "Name",
      },
    })
    .then((result) => {
      if (!result.dismiss) {
        if (result.value && result.value.length > 2) {
          showModalAddress(number, result.value);
        } else {
          boxError
            .fire({
              title: "Please enter the correct Name",
            })
            .then((result) => {
              showModalName(number);
            });
        }
      }
    });
}
function showModalAddress(number, name) {
  boxInputs
    .fire({
      title: "Enter your Address",
      inputAttributes: {
        autocapitalize: "off",
        style: "background-color: #fff;color:#000;text-align:center",
        placeholder: "Address",
      },
    })
    .then((result) => {
      if (!result.dismiss) {
        if (result.value.length > 7) {
          now = new Date();
          now.setTime(now.getTime() + 365 * 24 * 60 * 60 * 1000);
          $.cookie = `login=${
            number + "/" + name + "/" + result.value
          };path=/;expires=${now}`;
          login()
        } else {
          boxError
            .fire({
              title: "Please enter the correct Address",
            })
            .then((result) => {
              showModalAddress(number, name);
            });
        }
      }
    });
}
//Calling the required function when uploading the site
login()
//Add events be elements
document.addEventListener("scroll", scrollSite);
logoShowMenu.addEventListener("click", showMenu);
logoCloseMenu.addEventListener("click", hideMenu);
layoutLoginWraper.addEventListener("click", goToLogin);
