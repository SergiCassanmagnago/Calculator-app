const oper = document.querySelector('.op');
const res = document.querySelector('.result');
const nums = document.querySelectorAll('.number');
const d = document.querySelector('.Del');
const a = document.querySelector('.AC');
const tim = document.querySelector('.times');
const div = document.querySelector('.division');
const sum = document.querySelector('.sum');
const min = document.querySelector('.minus');
const pow = document.querySelector('.power');
const dot = document.querySelector('.dot');
const eq = document.querySelector('.equals');

let operations = {
    firstop : 0,
    operation : '',
    secondop : 0,
    decimal : [false, 0]
};

//equal = after clicking eq, change = adding operation sign causes shifting of operands
let result, equal = true, change = false, err = false;

function op_clear(){
    operations.firstop = 0;
    operations.operation = ''; 
    operations.secondop = 0; 
    operations.decimal = [false, 0];
};

 
function changeop(sig) {
    if(equal){
        oper.textContent = operations.firstop;
        oper.textContent += sig;
        operations.operation = sig;
        equal = false; change = true;
    }
    else if(change && operations.operation != sig){
        operations.operation = sig;
        oper.textContent = oper.textContent.substring(0, oper.textContent.length-1);
        oper.textContent += sig;
    }
    else if(!change){
        change = true;
        oper.textContent += operations.secondop;        
        oper.textContent += sig;
        if(operations.operation != '')switch(operations.operation){
            case '*': 
                operations.firstop *= operations.secondop;
            break;
            case '÷': 
                operations.firstop /= operations.secondop;
            break;
            case '+': 
                operations.firstop += operations.secondop;
            break;
            case '-': 
                operations.firstop -= operations.secondop;
            break;
            case '^': 
                operations.firstop = Math.pow(operations.firstop, operations.secondop);
            break;
        }
        else operations.firstop = operations.secondop;
        operations.operation = sig;
        res.textContent = operations.firstop;
    }
};


for(let i = 0; i < nums.length; i++)nums[i].addEventListener('click', e => {
    if(equal){
        equal = false;
        res.textContent = nums[i].textContent;
        oper.textContent = '';
        op_clear();
    }
    else if(change){
        change = false;
        operations.decimal = [false, 0];
        res.textContent = nums[i].textContent;
        operations.secondop = 0;
    }
    else res.textContent += nums[i].textContent;

    if(operations.decimal[0]){
        operations.secondop += Math.pow(10, operations.decimal[1])*parseInt(nums[i].textContent);
        operations.decimal[1]--;
    }
    else{
        operations.secondop *= 10;
        operations.secondop += parseInt(nums[i].textContent);
    }
});

a.addEventListener('click', e => {
    op_clear();
    oper.textContent = '';
    res.textContent = '0';
    equal = true;
    err = false;
    change = false;
});

d.addEventListener('click', e => {
    if(operations.secondop != 0 && !equal && !change){
        operations.secondop = parseInt(operations.secondop/10);
        if(operations.secondop == 0) equal = true;
        res.textContent = '';
        res.textContent = operations.secondop;
    }
})


eq.addEventListener('click', e => {
    if(!equal){
        if((operations.operation == '÷' && operations.secondop == 0)||(operations.operation == '^' && operations.secondop > 10)){
            res.textContent = 'Math Error';
            op_clear();
            oper.textContent = '';
            err = true;
        }
        else switch(operations.operation){
                case '*': 
                    operations.firstop *= operations.secondop;
                break;
                case '÷': 
                    operations.firstop /= operations.secondop;
                break;
                case '+': 
                    operations.firstop += operations.secondop;
                break;
                case '-': 
                    operations.firstop -= operations.secondop;
                break;
                case '^': 
                    operations.firstop = Math.pow(operations.firstop, operations.secondop);
                break;
                default:
                    operations.firstop = operations.secondop;
                break;
        }
        oper.textContent += operations.secondop;
        oper.textContent += '=';
        res.textContent = operations.firstop;
        equal = true; change = false;
    }
})

tim.addEventListener('click', e => {
    if(!err){
        changeop('*');
    }
})

div.addEventListener('click', e => {
    if(!err){
        changeop('÷');
    }
})

pow.addEventListener('click', e => {
    if(!err){
        changeop('^');
    }
})

sum.addEventListener('click', e => {
    if(!err){
        changeop('+');
    }
})

min.addEventListener('click', e => {
    if(!err){
        changeop('-');
    }
})

dot.addEventListener('click', e => {
    if(!err && !operations.decimal[0]){
        if(equal){
            equal = false;
            oper.textContent = '';
            res.textContent = '0';
            op_clear();
        }
        else if(change){
            change = false;
            res.textContent = '0';
            operations.secondop = 0;
        }
        res.textContent += '.';
        operations.decimal = [true, -1];
    }
})