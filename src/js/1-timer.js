import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



let userSelectedDate;
const button = document.querySelector(`button[data-start]`);
const input = document.querySelector(`#datetime-picker`)

function activateButton(currentDate) {
    
    if (userSelectedDate > currentDate) {
        button.disabled = false;
    } else {
        iziToast.show({
            title: `Error`,
            message: 'Illegal operation'
        });
        button.disabled = true;
    };
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    activateButton(options.defaultDate)
    
  },
};

flatpickr("#datetime-picker", options);

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

button.addEventListener(`click`, () => {
    button.disabled = true;
    input.disabled = true;
    const formatNumber = (num) => String(num).padStart(2, '0');
    const timerInterval = setInterval(() => {
        let deltaTime = userSelectedDate - new Date();
        if (deltaTime <= 0) {
            deltaTime = 0;
            clearInterval(timerInterval);
            input.disabled = false;
        } else {
            document.querySelector(`span[data-days]`).textContent = formatNumber(convertMs(deltaTime).days);
            document.querySelector(`span[data-hours]`).textContent = formatNumber(convertMs(deltaTime).hours);
            document.querySelector(`span[data-minutes]`).textContent = formatNumber(convertMs(deltaTime).minutes);
            document.querySelector(`span[data-seconds]`).textContent = formatNumber(convertMs(deltaTime).seconds);
        };
    }, 1000)
})

