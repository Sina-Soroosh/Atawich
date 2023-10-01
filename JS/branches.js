import * as detabase from "./database.js";
// Select the required elements
const container = $.querySelector(".container");
// Required variables
//Functions

function addToDom() {
  detabase.addressOfBranches.forEach((branche) => {
    container.insertAdjacentHTML(
      "beforeend",
      `
        <div class="branche">
            <div class="head">
                <img src="Img/WebsiteLogo.png" alt="">
                <span>${branche.title}</span>
                <i class="fas fa-phone-flip"></i>
            </div>
            <ui class="main">
                <li>Address : <span>${branche.address}</span></li>
                <li>Tel : <span>${branche.tel} </span></li>
            </ui>
        </div>
        `
    );
  });
}
//Calling the required function when uploading the site
addToDom();
//Add events be elements
