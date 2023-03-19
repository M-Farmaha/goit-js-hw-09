import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

let selectedTime = null;
let currentTime = null;

const startBtn = document.querySelector('[data-start]');
const timerDaysEl = document.querySelector('[data-days]');
const timerHoursEl = document.querySelector('[data-hours]');
const timerMinutesEl = document.querySelector('[data-minutes]');
const timerSecondssEl = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedTime = selectedDates[0];
    currentTime = Date.now();
    if (selectedTime - currentTime <= 0) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.setAttribute('disabled', 'true');
    } else {
      startBtn.removeAttribute('disabled', 'true');
    }
  },
};

flatpickr('#datetime-picker', options);

startBtn.setAttribute('disabled', 'true');
startBtn.addEventListener('click', onStartBtn);

function onStartBtn() {
  const timerIntervalId = setInterval(() => {
    currentTime = Date.now();
    if (selectedTime - currentTime > 0) {
      const resultTime = addLeadingZero(convertMs(selectedTime - currentTime));
      updateClockInterface(resultTime);
    }
    return;
  }, 1000);
}

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
}

function addLeadingZero({ days, hours, minutes, seconds }) {
  const d = String(days).padStart(2, '0');
  const h = String(hours).padStart(2, '0');
  const m = String(minutes).padStart(2, '0');
  const s = String(seconds).padStart(2, '0');

  return { d, h, m, s };
}

function updateClockInterface({ d, h, m, s }) {
  timerDaysEl.textContent = d;
  timerHoursEl.textContent = h;
  timerMinutesEl.textContent = m;
  timerSecondssEl.textContent = s;
}
