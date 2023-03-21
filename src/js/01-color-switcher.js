const bodyEl = document.querySelector('body')
const btcStartEl = document.querySelector('[data-start]');
const btnStopEl = document.querySelector('[data-stop');

let generateId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

btcStartEl.addEventListener('click', onStartGenerateColor);
btnStopEl.addEventListener('click', onStopGenerateColor);

function onStartGenerateColor(){
    generateId = setInterval(() => bodyEl.style.backgroundColor = getRandomHexColor(), 1000);
    btcStartEl.disabled = true;
    btnStopEl.disabled = false;
}

function onStopGenerateColor(){
    clearInterval(generateId);
    btcStartEl.disabled = false;
    btnStopEl.disabled = true;
}