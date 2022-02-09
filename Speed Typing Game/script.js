const Random_Quote = 'http://api.quotable.io/random';

const quoteDisplayTxt = document.getElementById("quoteDisplay");
const quoteInput = document.getElementById("quoteInput");
const timer = document.getElementById('timer');



quoteInput.addEventListener('input',()=>{
    const arrayQuote = quoteDisplayTxt.querySelectorAll('span');
    const arrayValue = quoteInput.value.split('');

    let correct = true;
    arrayQuote.forEach((elementSpan,index)=>{
        const element = arrayValue[index]
        if(element == null){
            elementSpan.classList.remove('correct')
            elementSpan.classList.remove('incorrect')
            correct = false;
        }
        else if(element === elementSpan.innerText){
            elementSpan.classList.add('correct')
            elementSpan.classList.remove('incorrect')
        }else{
            elementSpan.classList.remove('correct')
            elementSpan.classList.add('incorrect')
            correct = false;
        }
    })
    if(correct){
         getNextQuote();
     }
})

function getRandomQuotes(){
    return fetch(Random_Quote)
    .then(response =>response.json())
    .then(data=>data.content);
}

async function getNextQuote(){
    const quote = await getRandomQuotes();
    // console.log(quote);
    quoteDisplayTxt.innerHTML = '';
    quote.split('').forEach(element =>{
        const elementSpan =document.createElement('span'); 
        elementSpan.innerText = element;
        quoteDisplayTxt.appendChild(elementSpan);
    })

    quoteInput.value = null;
    startTimer();
}
getNextQuote()

let startTime;
function startTimer(){
    timer.innerText = 0;
     startTime = new Date();
    setInterval(()=>{
       timer.innerText = getTimer();
    },1000)
}
function getTimer(){
    return Math.floor((new Date()- startTime)/1000);
}
