const phoneInputField = document.querySelector("#phone");
const emailInputField = document.querySelector("#email");
const phoneInput = window.intlTelInput(phoneInputField, {
    utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});
let userId = 0;



const info = document.querySelector(".alert-info");

function process(event, mode) {
    const _apiURL = 'https://api.matriclive.com/';
    event.preventDefault();
    // window.location.href = "./confirm_otp.html";
    
    if (mode === 'email'){
        const email = emailInputField.value;
        axios.get(`${_apiURL}/v1/sendcodeemail/${email}`).then((res)=>{
            const code = res.data.data[0].code;
            userId = res.data.data[0].userId;
            if(code !== 0 && code !== "new user"){
                sendEmail(email, code);
            }
            else {
                console.log('user not found')
            }
        });
    }
    else if (mode === 'phone') {
        const phone = phoneInput.value;
    
        info.style.display = "";
        info.innerHTML = `Phone number format: <strong>${phone}</strong>`;
    }
    else if (mode === 'confirm'){
        const fst = document.querySelector("#first");
        const snd = document.querySelector("#second");
        const third = document.querySelector("#third");
        const forth = document.querySelector("#fourth");
        const fifth = document.querySelector("#fifth");
        const sixth = document.querySelector("#sixth");

        const code = `${fst.value}${snd.value}${third.value}${forth.value}${fifth.value}${sixth.value}`;
        console.log(code);
        axios.get(`${_apiURL}/v1/verifyresetcode/${code}/${userId}`).then((res)=>{
            const canReset = res.data.data;
            if(canReset){
                console.log('can reset password')
                // redirect the reset screen here
                // window.location.href = "./confirm_otp.html";
            }
            else {
                console.log('not verified')
            }
        });
    }
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

function sendEmail(emailAddress, code) {
    console.log('sending mail')
    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "tafadzwa.m@matriclive.com",
        Password: "BA899882A16F0FD876A570E771682975F0CF",
        To: emailAddress,
        From: "tafadzwa.m@matriclive.com",
        Subject: "Password rest",
        Body: `Hello, your Matric Live password rest code is <b>${code}</b>, do not share this code with anyone`,
    })
        .then(function (message) {
            console.log(message);
            window.location.href = "./confirm_otp.html";
        });
}
