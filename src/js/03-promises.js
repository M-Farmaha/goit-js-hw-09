import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
const delayInput = formEl.querySelector('[name="delay"]');
const stepInput = formEl.querySelector('[name="step"]');
const amountInput = formEl.querySelector('[name="amount"]');

formEl.addEventListener('submit', onFormElSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}

function onFormElSubmit(e) {
  e.preventDefault();
  const firstDelay = delayInput.value;
  const step = stepInput.value;
  const amount = amountInput.value;
  let pos = 1;
  let del = Number(firstDelay);

  const timeoutId = setTimeout(() => {
    createPromise(pos, del)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    pos += 1;
    del += Number(step);

    const intervalId = setInterval(() => {
      createPromise(pos, del)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });

      if (pos == amount) {
        clearInterval(intervalId);
      }

      pos += 1;
      del += Number(step);
    }, step);
  }, firstDelay);
}
