const switch_key = document.getElementById("slider");
const body = document.body;

let theme = 1;
switch_key.addEventListener("click", () => {
    theme++;
    if(theme === 4){
        theme = 1;
    }

    if(theme === 1){
        body.classList.remove("Theme3");
    }else if(theme === 2){
        body.classList.add("Theme2");
    }else{
        body.classList.remove("Theme2");
        body.classList.add("Theme3");
    }
});