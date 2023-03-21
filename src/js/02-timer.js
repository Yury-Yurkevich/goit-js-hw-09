import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Report } from 'notiflix/build/notiflix-report-aio';

const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let inputDate = null;
let intervalId = null;

btnStart.disabled = true;
btnStart.addEventListener('click', onStartTimer);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        onSelectingValidDate(selectedDates[0]);
        console.log(selectedDates[0]);
    },
  };

flatpickr(input, options);

function onSelectingValidDate(selectedDates) {
    inputDate = selectedDates.getTime();
        if(inputDate < Date.now()) {
            btnStart.disabled = true;
            Report.failure('Please choose a date in the future');
            return;
        }
        btnStart.disabled = false;
};

function onStartTimer() {
    intervalId = setInterval(startTimer, 1000);
    btnStart.disabled = true;
};

function startTimer() {
    const deltaTime = inputDate - Date.now();
    const timeComponents = convertMs(deltaTime);
    updateClockface(timeComponents);
    if (secondsEl.textContent === '00' && minutesEl.textContent === '00' && hoursEl.textContent === '00' && daysEl.textContent === '00') {
        Report.success('Time is over!');
        clearInterval(intervalId);
        btnStart.disabled = false;
    }
};

function updateClockface({ days, hours, minutes, seconds }) {
    secondsEl.textContent = addLeadingZero(seconds);
    minutesEl.textContent = addLeadingZero(minutes);
    hoursEl.textContent = addLeadingZero(hours);
  if (days > 99) {
    daysEl.textContent = days;
  }
  daysEl.textContent = addLeadingZero(days);
};

function addLeadingZero(value){
  return String(value).padStart(2, '0');
};

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  };