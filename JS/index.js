import * as database from "./database.js";
// Select the required elements
const weblog = $.querySelector(".weblog");
const cuntainerWeblog = $.querySelector(".cuntainer-weblog");
const rnbtn = $.querySelector(".rnbtn");
// Required variables
let showNewsWeblog = 4;
let btnNumberPage = Math.ceil(database.newsWeblog.length / showNewsWeblog);
let numberPage = 1;
let lastShow = numberPage * showNewsWeblog;
let oneShow = lastShow - showNewsWeblog;
let btnsChangePage = null;
let elementVariable = null;
//Functions
function addToWeblog(e) {
  cuntainerWeblog.innerHTML = "";
  for (let i = oneShow; i < lastShow; i++) {
    if (database.newsWeblog[i]) {
      cuntainerWeblog.insertAdjacentHTML(
        "beforeend",
        `
              <div class="newsWidget">
                  <div>
                      <div class="imgnews">
                          <a href="blogs.html?id=${database.newsWeblog[i].id}">
                              <img src="${database.newsWeblog[i].img}" alt="">
                          </a>
                      </div>
                      <div class="newsinfo">
                          <div class="text">
                              <a href="blogs.html?id=${database.newsWeblog[i].id}"><h3>${database.newsWeblog[i].title}</h3></a>
                              <div class="textder">
                                  <p>
                                  ${database.newsWeblog[i].text}
                                  </p>
                              </div>
                              <div class="btnnews">
                                  <a href=" blogs.html?id=${database.newsWeblog[i].id}"><span class="btn-news">
                                      <span>Read more</span>
                                  </span></a>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              `
      );
    }
  }
  if (!e) {
    rnbtn.innerHTML = "";
    rnbtn.insertAdjacentHTML(
      "beforeend",
      `
      <button  class="dynamicPaginationLink">
        <span><<</span>
      </button>
      <button  class="dynamicPaginationLink">
        <span><</span>
      </button>
    `
    );
    for (let i = 1; i <= btnNumberPage; i++) {
      rnbtn.insertAdjacentHTML(
        "beforeend",
        `
      <button  class="${i == numberPage ? "sel" : ""} dynamicPaginationLink">
          <span>${i}</span>
      </button>
      `
      );
    }
    rnbtn.insertAdjacentHTML(
      "beforeend",
      `
      <button  class="dynamicPaginationLink">
        <span>></span>
      </button>
      <button  class="dynamicPaginationLink">
        <span>>></span>
      </button>
      `
    );
    addEventToBtnsChangePage();
  }
}
function addEventToBtnsChangePage() {
  btnsChangePage = $.querySelectorAll(".dynamicPaginationLink");
  btnsChangePage.forEach((btn) => {
    btn.addEventListener("click", changePage);
  });
}
function changePage(e) {
  if (isNaN(e.target.outerText)) {
    if (e.target.outerText == "<") {
      if (numberPage != 1) {
        numberPage--;
        lastShow = numberPage * showNewsWeblog;
        oneShow = lastShow - showNewsWeblog;
        addToWeblog(e);
      }
    } else if (e.target.outerText == ">") {
      if (numberPage != btnNumberPage) {
        numberPage++;
        lastShow = numberPage * showNewsWeblog;
        oneShow = lastShow - showNewsWeblog;
        addToWeblog(e);
      }
    } else if (e.target.outerText == "<<") {
      numberPage = 1;
      lastShow = numberPage * showNewsWeblog;
      oneShow = lastShow - showNewsWeblog;
      addToWeblog(e);
    } else if (e.target.outerText == ">>") {
      numberPage = btnNumberPage;
      lastShow = numberPage * showNewsWeblog;
      oneShow = lastShow - showNewsWeblog;
      addToWeblog(e);
    }
  } else {
    numberPage = e.target.outerText;
    lastShow = numberPage * showNewsWeblog;
    oneShow = lastShow - showNewsWeblog;
    addToWeblog(e);
  }
  btnsChangePage.forEach((btn) => {
    btn.classList.remove("sel");
    btn.outerText == numberPage ? (elementVariable = btn) : "";
  });
  elementVariable.classList.add("sel");
}

//Calling the required function when uploading the site
addToWeblog();
//Add events be elements
