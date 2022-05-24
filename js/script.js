const phoneInputField = document.querySelector("#phone");
const emailInputField = document.querySelector("#email");
const phoneInput = window.intlTelInput(phoneInputField, {
    utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});


const info = document.querySelector(".alert-info");

function process(event) {
    event.preventDefault();
    window.location.href = "C:\\Users\\Proline\\Downloads\\icons new\\Forgot_Password\\confirm_otp.html";

    const phoneNumber = phoneInput.getNumber();
    const emailInputField = emailInputField.getNumber();

    info.style.display = "";
    info.innerHTML = `Phone number format: <strong>${phoneNumber}</strong>`;

}


function Validate(otpCode) {
    console.log("You have entered this OTP:")
    console.log(otpCode)
}









document.addEventListener("DOMContentLoaded", function (event) {

    function OTPInput() {
        console.log("OTP Called");
        const inputs = document.querySelectorAll('#otp > *[id]');
        for (let i = 0; i < inputs.length; i++) { inputs[i].addEventListener('keydown', function (event) { if (event.key === "Backspace") { inputs[i].value = ''; if (i !== 0) inputs[i - 1].focus(); } else { if (i === inputs.length - 1 && inputs[i].value !== '') { return true; } else if (event.keyCode > 47 && event.keyCode < 58) { inputs[i].value = event.key; if (i !== inputs.length - 1) inputs[i + 1].focus(); event.preventDefault(); } else if (event.keyCode > 64 && event.keyCode < 91) { inputs[i].value = String.fromCharCode(event.keyCode); if (i !== inputs.length - 1) inputs[i + 1].focus(); event.preventDefault(); } } }); }
    }


    OTPInput();


});
