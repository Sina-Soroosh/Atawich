import * as database from "./database.js";
// Select the required elements
const ordertype = $.querySelector(".Ordertype");
const inBranchApproach = $.querySelector(".inBranchApproach");
const deliveryApproach = $.querySelector(".deliveryApproach");
const branchs = $.querySelector(".Branchs");
const btnsBranch = $.querySelector(".btns-Branch");
const backToOrdertype = $.querySelector(".back");
const btnConfirmationBranchs = $.querySelector(".Branchs button");
// Required variables
let arrayBtnsBranch = null;
let now = null;
let branchSelect = null;
let types = null;
// Sweet Alert

//Functions

function clickInBranchApproach(e) {
  indexCookieLogin = $.cookie.indexOf("login");
  if (indexCookieLogin == -1) {
    clickDeliveryApproach();
  } else {
    showBranchs();
  }
  types = "branch";
}
function clickDeliveryApproach(e) {
  indexCookieLogin = $.cookie.indexOf("login");
  if (indexCookieLogin == -1) {
    boxInputs.fire({}).then((result) => {
      if (!result.dismiss) {
        if (result.value.length == 11 && !isNaN(result.value)) {
          showModalName(result.value);
        } else {
          boxError.fire({}).then((result) => {
            clickDeliveryApproach();
          });
        }
      }
    });
  } else {
    showBranchs();
  }
  types = "sending";
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
          showBranchs();
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
function addToBranchs() {
  database.addressOfBranches.forEach((address) => {
    btnsBranch.insertAdjacentHTML(
      "beforeend",
      `
    <div class="Branch">
      <p><i class="fas fa-location-dot"></i> ${address.title}</p>
    </div>
  `
    );
  });
  arrayBtnsBranch = $.querySelectorAll(".Branch");
  arrayBtnsBranch.forEach((btn) => {
    btn.addEventListener("click", selectBranch);
  });
}
function selectBranch(e) {
  arrayBtnsBranch.forEach((btn) => {
    btn.classList.remove("select-branch");
  });
  if (e.target.tagName == "DIV") {
    e.target.classList.add("select-branch");
  } else {
    if (e.target.tagName == "P") {
      e.target.parentElement.classList.add("select-branch");
    } else {
      e.target.parentElement.parentElement.classList.add("select-branch");
    }
  }
}
function funcBackToOrdertype() {
  arrayBtnsBranch.forEach((btn) => {
    btn.classList.remove("select-branch");
  });
  branchs.style.display = "none";
  ordertype.style.display = "block";
}
function showBranchs() {
  branchs.style.display = "block";
  ordertype.style.display = "none";
}
function goToOnlineOrder() {
  branchSelect = $.querySelector(".select-branch");
  if (branchSelect) {
    location.href = `onlineOrderFood.html?${branchSelect.children[0].outerText}=${types}`;
  } else {
    boxError.fire({
      title: "Please select one of the branches",
      toast: true,
      position: "bottom-right",
    });
  }
}
//Calling the required function when uploading the site
addToBranchs();
//Add events be elements

inBranchApproach.addEventListener("click", clickInBranchApproach);
deliveryApproach.addEventListener("click", clickDeliveryApproach);
backToOrdertype.addEventListener("click", funcBackToOrdertype);
btnConfirmationBranchs.addEventListener("click", goToOnlineOrder);
