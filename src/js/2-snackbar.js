
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(`form`)
const button = document.querySelector(`button`);
const delayInput = document.querySelector(`input[name=delay]`);

button.addEventListener(`click`, (event) => {
    if (!form.checkValidity()) {
        return;
    }
    event.preventDefault();
    const delay = delayInput.value;
    const selectedRadioVal = document.querySelector(`input[name=state]:checked`).value
    const newPromise = new Promise((res, rej) => {
        setTimeout(() => {
            if (selectedRadioVal === `fulfilled`) {
                res(delay);
            } else {
                rej(delay);
            }
        }, delay);
    });

    newPromise
        .then(res => {
            iziToast.show({
            message: `✅ Fulfilled promise in ${res}ms`
            });
        })
        .catch(rej => {
            iziToast.show({
            message: `❌ Rejected promise in ${rej}ms`
            });
        });
    delayInput.value = ""
})
