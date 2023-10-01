import * as database from "./database.js";
// Select the required elements
const container = $.querySelector(".container");
// Required variables
let serarchLocation = location.search.split("=")[1];
let news = null;
let variables1 = null;
//Functions
function check() {
  if (!serarchLocation) {
    location.href = "index.html";
  } else {
    find();
  }
}
function find() {
  news = database.newsWeblog.find((weblog) => {
    return weblog.id == serarchLocation;
  });
  container.insertAdjacentHTML(
    "beforeend",
    `
              <div class="header">
                <h1>${news.title}</h1>
                <div class="text">
                    <p>
                    ${news.text}
                    </p>
                </div>
            </div>
            <div class="basic-content">
                <img src="${news.img}" alt="">
                <div class="content">
                    <h2>${news.title}</h2>
                    <p>
                     ${news.textBasic}
                    </p>
                </div>
            </div>  `
  );
  createElem(news.content);
}
function createElem(item) {
  item.forEach((content) => {
    container.insertAdjacentHTML(
      "beforeend",
      `
        <div class="box ${content.class}">
            <h2>${content.title}</h2>
        </div>
      `
    );
    variables1 = $.querySelector(`.container .${content.class}`);
    content.item.forEach((content) => {
      if (!content.includes("Img/")) {
        variables1.insertAdjacentHTML(
          "beforeend",
          `
                <p>${content}</p>
            `
        );
      } else {
        variables1.insertAdjacentHTML(
          "beforeend",
          `
          <img src="${content}" alt="${content.class}">
            `
        );
      }
    });
  });
}
//Calling the required function when uploading the site
check();
//Add events be elements
