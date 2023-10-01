// Select the required elements
const form = $.querySelector("form")
const nameInput = $.querySelector("#name")
const emailInput = $.querySelector("#email")
const phoneInput = $.querySelector("#phone")
const issueInput = $.querySelector("#issue")
const descriptionInput = $.querySelector("#description")
// Required variables
// Sweet Alert 
let sweet = Swal.mixin({
    toast :true ,
    icon: "error",
    position: "bottom-right",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: "#be0b29",
    color: "#fff",
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});
//Functions
function submitForm (e) {
    e.preventDefault()
    if(nameInput.value.trim().length< 3){
        sweet.fire({
            title : "Please enter your name correctly"
        })
        nameInput.focus()
    }else if(phoneInput.value.trim().length != 11 || isNaN(phoneInput.value)){
        sweet.fire({
            title : "Please enter the correct number"
        })
        phoneInput.focus()
    }else if(issueInput.value.trim().length < 3){
        sweet.fire({
            title : "Please enter the subject correctly"
        })
        issueInput.focus()
    }else if (descriptionInput.value.trim().length < 10){
        sweet.fire({
            title : "Your comment must be more than 10 characters"
        })
        descriptionInput.focus()
    }else {
        sweet.fire({
            title:"Your comment was recorded",
            toast : false,
            position : "center",
            icon:"success",
        })
        nameInput.value = ""
        emailInput.value = ""
        phoneInput.value = ""
        issueInput.value = ""
        descriptionInput.value = ""
    }
}
//Calling the required function when uploading the site
//Add events be elements
form.addEventListener("submit",submitForm)