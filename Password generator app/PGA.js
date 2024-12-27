const length_input = document.getElementById("length-input");
const length_num = document.getElementById("length");
const copy = document.querySelector(".copy-icon");
const copy_text = document.getElementById("copy-text");
const password = document.getElementById("password");

function updateInputBackground(){
    const value = length_input.value;
    length_input.style.background = `linear-gradient(to right, #A4FFAF ${value * 5}%, #18171F ${value * 5}%)`;
}

length_input.addEventListener('input', () => {
    updateInputBackground();
    length_num.textContent = length_input.value;
});

copy.addEventListener('click', () => {
    const toCopy = password.textContent;
    if(toCopy == "")
        return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(toCopy).then(() => {
            copy_text.style.display = "block";
        }).catch((err) => {
            console.log("Copy error: ", err);
        });
    } else {
        console.log("Clipboard API not supported");
    }
});

const button = document.querySelector(".button");
const empty_pass = document.querySelector(".empty-password");
const letters = 'qwertyuiopasdfghjklzxcvbnm';
const numbers = '1234567890';
const symbols = '!@#%&*.,/?$';

const levels = [
    document.getElementById('empty-strength'),
    document.getElementById('too-weak'),
    document.getElementById('weak'),
    document.getElementById('medium'),
    document.getElementById('strong')
];
function putLevel(newLevel){
    levels.forEach((level) => {
        level.style.display = "none";
    });
    newLevel.style.display = "flex";
}

button.addEventListener('click', () => {
    copy.className = "copy-icon";
    copy_text.style.display = "none";
    putLevel(levels[0]);
    password.textContent = "";
    password.style.display = "none";
    empty_pass.style.display = "block";

    let Upper = (document.getElementById("uppercase-check").checked ? true : false);
    let Lower = (document.getElementById("lowercase-check").checked ? true : false);
    let number = (document.getElementById("numbers-check").checked ? true : false);
    let symbol = (document.getElementById("symbols-check").checked ? true : false);

    const ChLength = length_input.value;
    if(ChLength == 0)
        return;
    if(!Upper && !Lower && !number && !symbol)
        return;

    let newPass = "";

    // at least 1
    if(Upper){
        newPass += letters[Math.floor(Math.random()*letters.length)].toUpperCase();
    }
    if(Lower){
        newPass += letters[Math.floor(Math.random()*letters.length)].toLowerCase();
    }
    if(number){
        newPass += numbers[Math.floor(Math.random()*numbers.length)];
    }
    if(symbol){
        newPass += symbols[Math.floor(Math.random()*symbols.length)];
    }

    if(ChLength < newPass.length)
        return;

    while(newPass.length < ChLength){
        let rand = Math.ceil(Math.random()*4);
        if(Upper && rand === 1){
            newPass += letters[Math.floor(Math.random()*letters.length)].toUpperCase();
        }else if(Lower && rand === 2){
            newPass += letters[Math.floor(Math.random()*letters.length)].toLowerCase();
        }else if(number && rand === 3){
            newPass += numbers[Math.floor(Math.random()*numbers.length)];
        }else if(symbol && rand === 4){
            newPass += symbols[Math.floor(Math.random()*symbols.length)];
        }else{
            continue;
        }
    }
    newPass = newPass.split('').sort(()=>{
        return Math.random() - 0.5;
    }).join('');
    
    empty_pass.style.display = "none";
    password.textContent = newPass;
    password.style.display = "block";
    copy.className = "copy-icon1";

    // password strength check
    let score = 0;
    if(newPass.length > 14){
        score += 3;
    }else if(newPass.length > 10){
        score += 2;
    }else if(newPass.length > 6){
        score++;
    }else if(newPass.length <= 4){
        score -= 3;
    }
    let Uppercheck = false;
    let Lowercheck = false;
    let Numbercheck = false;
    let Symbolcheck = false;
    for(let i = 0; i < newPass.length; i++){
        if(!Uppercheck && letters.toUpperCase().includes(newPass[i])){
            Uppercheck = true;
            score += 2;
        }
        if(!Lowercheck && letters.toLowerCase().includes(newPass[i])){
            Lowercheck = true;
            score++;
        }
        if(!Numbercheck && numbers.includes(newPass[i])){
            Numbercheck = true;
            score += 2;
        }
        if(!Symbolcheck && symbols.includes(newPass[i])){
            Symbolcheck = true;
            score += 2;
        }
    }
    if(score > 7){
        putLevel(levels[4]);
    }else if(score > 4){
        putLevel(levels[3]);
    }else if(score > 2){
        putLevel(levels[2]);
    }else{
        putLevel(levels[1]);
    }
});