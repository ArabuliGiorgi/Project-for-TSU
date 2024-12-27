const input = document.getElementById("input");
const operations = '+-x/';
let clear = false;

function addNum(num){
    if(clear){
        input.textContent = num.toString();
        clear = false;
        return;
    }
    let Str = input.textContent;
    let temp = "";
    for(let i = Str.length - 1; i >= 0; i--){
        if(!operations.includes(Str[i])){
            temp += Str[i];
        }else{
            break;
        }
    }

    if(temp === "0"){
        input.textContent = input.textContent.slice(0, input.textContent.length - 1) + num.toString();
        return;
    }

    temp = temp.split('').reverse().join('');
    let length = temp.length;
    Str = "";
    if(temp.includes('.')){
        Str = temp + num.toString();
    }else{
        temp = temp.split(',').join('') + num.toString();
        let ind = 0;
        for(let i = temp.length - 1; i >= 0; i--){
            if(ind % 3 === 0 && ind !== 0){
                Str += ',';
            }
            Str += temp[i];
            ind++;
        }
        Str = Str.split('').reverse().join('');
    }
    input.textContent = input.textContent.slice(0, input.textContent.length - length) + Str;
}

function addOperation(str){
    clear = false;
    let Str = input.textContent;
    if(Str === ""){
        return;
    }
    if(operations.includes(Str[Str.length - 1])){
        Str = Str.slice(0, Str.length - 1) + str;
    }else{
        Str = Str + str;
    }
    input.textContent = Str;
}

function addDot(){
    if(clear){
        input.textContent = "0.";
        clear = false;
        return;
    }
    let Str = input.textContent;
    let temp = "";
    for(let i = Str.length - 1; i >= 0; i--){
        if(!operations.includes(Str[i])){
            temp += Str[i];
        }else{
            break;
        }
    }
    if(temp === ""){
        input.textContent = Str + "0.";
    }else{
        if(!temp.includes('.')){
            input.textContent = Str + ".";
        }
    }
}

function Delete(){
    clear = false;
    let Str = input.textContent;
    if(operations.includes(Str[Str.length - 1])){
        Str = Str.slice(0, Str.length - 1);
    }else{
        let temp = "";
        for(let i = Str.length - 1; i >= 0; i--){
            if(!operations.includes(Str[i])){
                temp += Str[i];
            }else{
                break;
            }
        }
        temp = temp.split('').reverse().join('');
        let length = temp.length;
        Str = "";
        if(temp.includes('.')){
            Str = input.textContent.slice(0, input.textContent.length - length) + temp.slice(0, temp.length - 1);
        }else{
            temp = temp.split(',').join('');
            temp = temp.slice(0, temp.length - 1);
            let ind = 0;
            for(let i = temp.length - 1; i >= 0; i--){
                if(ind % 3 === 0 && ind !== 0){
                    Str += ',';
                }
                Str += temp[i];
                ind++;
            }
            Str = Str.split('').reverse().join('');
            Str = input.textContent.slice(0, input.textContent.length - length) + Str;
        }
    }
    input.textContent = Str;
}

function reset(){
    input.textContent = "";
    clear = false;
}

function result(){
    let Str = input.textContent;
    Str = Str.split(',').join('').split('x').join('*');
    if(Str == ""){
        return;
    }
    let result = eval(Str);
    if(result == Infinity){
        alert("Can't divide by zero.");
        return;
    }
    result = Math.round(result*100000)/100000;
    result = result.toString();
    let negative = false;
    if(result.startsWith("-")){
        negative = true;
        result = result.slice(1, result.length);
    }

    let first, second = "";
    if(result.includes('.')){
        first = result.split('.')[0];
        second = result.split('.')[1];
    }else{
        first = result;
    }
    Str = "";
    let ind = 0;
    for(let i = first.length - 1; i >= 0; i--){
        if(ind % 3 === 0 && ind !== 0){
            Str += ',';
        }
        Str += first[i];
        ind++;
    }
    Str = Str.split('').reverse().join('');
    Str = Str + (result.includes('.') ? '.' : '') + second;
    if(negative){
        Str = '-' + Str;
    }
    input.textContent = Str;
    clear = true;
}
