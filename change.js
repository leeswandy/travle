let currencyRatio={
    USD:{
        KRW:1417.58,
        USD:1,
        JPY:149.76,
        VND:23875.00,
        unit:"달러"
    },
    KRW:{
        KRW:1,
        USD:0.00071,
        JPY:0.10,
        VND:16.84,
        unit:"원"
    },
    JPY:{
        KRW:9.58,
        USD:0.0067,
        JPY:1,
        VND:163.43,
        unit:"엔"
    },
    VND:{
        KRW:0.059,
        USD:0.000042,
        JPY:0.0061,
        VND:1,
        unit:"동"
    }
}
var unitWords = ["", "만", "억", "조", "경"]; 
var splitUnit = 10000;
let fromCurrency = "USD";
let toCurrency = "USD";

document.querySelectorAll("#from-currency-list a").forEach((menu)=>menu.addEventListener("click",function(){
    document.getElementById("from-button").innerHTML=this.innerHTML;
    fromCurrency = this.textContent;
    convert();
}));

document.querySelectorAll("#to-currency-list a").forEach((menu)=>menu.addEventListener("click",function(){
    document.getElementById("to-button").innerHTML=this.innerHTML;
    toCurrency = this.textContent;
    convert();
}));


function convert(){
   
    let amount = document.getElementById("from-input").value;
    let convertedAmount = amount * currencyRatio[fromCurrency][toCurrency];
    console.log("환전 결과는 ", convertedAmount);

    document.getElementById("to-input").value=convertedAmount;
    readNumKorean();
}

function reconvert(){
    let amount = document.getElementById("to-input").value;
    let convertedAmount = amount * currencyRatio[fromCurrency][toCurrency];

    document.getElementById("from-input").value=convertedAmount;

}

function readNumKorean(){
    document.getElementById("fromNumToKorea").textContent=
    readNum(document.getElementById("from-input").value)+
    currencyRatio[fromCurrency].unit;

    document.getElementById("toNumToKorea").textContent=
    readNum(document.getElementById("to-input").value)+
    currencyRatio[toCurrency].unit
}

// 숫자단위
function readNum(num){
    let resultString = "";
    let resultArray  = [];

    // 만단위로끊어내는 for문
    for(let i=0;i<unitWords.length;i++){
        let unitResult=(num%Math.pow(splitUnit, i+1))/Math.pow(splitUnit, i);
        unitResult=Math.floor(unitResult);
        if(unitResult>0){
            resultArray[i] = unitResult;
        }
    }

    for(let i=0;i<resultArray.length;i++){
        if(!resultArray[i]) continue;
        resultString=String(resultArray[i])+unitWords[i]+resultString;
    }
    return resultString;
}
