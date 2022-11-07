import 'slick-carousel/slick/slick';
import $ from "jquery";
import { Fancybox } from "@fancyapps/ui";
import ApiService from './services/ApiService';
import { API_PATH } from './constants';

// КАРУСЕЛЬ
function carousel() {
  $('.slider').slick({
    infinite: true,
    slidesToShow: 5,
    nextArrow: '#next',
    prevArrow: '#prev',
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
          infinite: true,
        }
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          centerMode: true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerMode: true,
        }
      }
    ]
  });
};
carousel();

// FULL FORM OPEN-CLOSE
const fullForm = document.querySelector('.full-form');
const createOrder = document.querySelectorAll('.create-order');

const buttonOpenForm = Array.from(document.querySelectorAll('.create-order'));
buttonOpenForm.forEach((button) => {
  button.addEventListener("click", function () {
    fullForm.classList.toggle('active');
    document.body.classList.toggle('lock');
  });
});

const exitFullForm = document.querySelector('.exit-fullform');
exitFullForm.addEventListener("click", function () {
  fullForm.classList.toggle('active');
  document.body.classList.remove('lock');
});

// SUBMIT FORMS

document.addEventListener("DOMContentLoaded", () => {

  function ajaxSend(formData) {
    fetch(`${API_PATH}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (!response.ok) {
          alert("Что-то пошло не так...");
        } else {
          alert('Ваша заявка отправлена! В ближайшее время с вами свяжется менеджер.');
        }

      })
  };

  if (document.getElementsByTagName("form")) {
    const forms = document.getElementsByTagName("form");

    for (let i = 0; i < forms.length; i++) {
      forms[i].addEventListener("submit", async function (e) {
        e.preventDefault();

        let formData = new FormData(this);
        formData = Object.fromEntries(formData);

        if (formData.name.length > 1 || formData.phone.length > 10) {
          ajaxSend(formData);
          fullForm.classList.toggle('active');
        } else {
          alert('Заполните обязательные поля')
        }
      });
    };
  }
});

// GET ORDERS 

// ДАННЫЕ ИЗ КРАТКОЙ ФОРМЫ (доработаю (лоадер, сообщение об ошибке/отправке))
// const API_PATH = 'https://beauty-saloon-server.herokuapp.com/api';
// document.querySelector('.form').addEventListener('submit', submitForm);
// document.querySelector('.full-form').addEventListener('submit', submitForm);

// function submitForm(e) {
//   e.preventDefault();

//   const order = {
//     name: document.querySelector('.client-name').value,
//     phone: document.querySelector('.client-phone').value,
//     // added
//     masterId: document.querySelector('.select-master').value,
//     serviceId: document.querySelector('.select-service').value,
//     visitDate:document.querySelector('.date-picker').value
//   };

//   console.log(order);

//   fetch(`${API_PATH}/orders`, {
//     method: 'POST',
//     body: JSON.stringify(order),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//     .then(() => {
//       console.log('Successful');
//     });
// };


// РАБОТАЛО ИЗ КРАТКОЙ ФОРМЫ

// document.querySelector('.form').addEventListener('submit', submitForm);
// document.querySelector('.full-form').addEventListener('submit', submitForm);

// function submitForm(e) {
//   e.preventDefault();

//   const order = {
//     name: document.querySelector('.client-name').value,
//     phone: document.querySelector('.client-phone').value,
//     // added
//     masterId: document.querySelector('#select-master').value,
//     serviceId: document.querySelector('#select-service').value,
//     visitDate:document.querySelector('.date-picker').value
//   };

//   console.log(order);

//   fetch(`${API_PATH}/orders`, {
//     method: 'POST',
//     body: JSON.stringify(order),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//     .then(() => {
//       console.log('Successful');
//     });
// };



// То, что работало!

// ДАННЫЕ ИЗ ПОЛНОЙ ФОРМЫ
// function toggleLoader() {
//   const loader = document.getElementById('loader');
//   loader.classList.toggle('hidden');
// };

// function onSuccess(formNode) {
//   alert('Ваша заявка отправлена! В ближайшее время с вами свяжется менеджер.');
//   formNode.classList.toggle('hidden');
// };

// function serializeForm(formNode) {
//   const { elements } = formNode;
//   const data = Array.from(elements)
//     .filter((item) => !!item.name)
//     .map((element) => {
//       const { name, value } = element;
//       return { name, value };
//     })
//   console.log(data);
//   // return data = {
//   //   name: data.name,
//   //   phone: data.phone,
//   //   masterId: data.masterId,
//   //   serviceId: data.serviceId,
//   //   visitDate: data.visitDate
//   // }
// };



// function checkValidity(event) {
//   const fullForm = event.target.form;
//   const isValid = fullForm.checkValidity();
//   formNode.querySelector('.close-fullform').disabled = !isValid;
// };

// async function sendData(data) {
//   return await fetch(`${API_PATH}/orders`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//   });
// };

// async function handleFormSubmit(event) {
//   event.preventDefault();
//   const data = serializeForm(event.target);

//   toggleLoader();
//   const response = await sendData(data);
//   toggleLoader();

// if (response.status === 200) {
//   onSuccess(event.target);
//   setTimeout(() => {
//     fullForm.classList.toggle('active');
//    }, 3000);
// } else {
//   alert("Что-то пошло не так...");
// };
// };

// fullForm.addEventListener('input', checkValidity);// Как заблокировать кнопку, если форма не валидна? Вот так не работает.
// document.querySelector('.form').addEventListener('input', checkValidity);
// fullForm.addEventListener('submit', handleFormSubmit); // Непонятно, почему форма не отправляется и выдает ошибку "необходимо заполнить имя клиента". Задали вопрос преподавателю, на момент сдачи д/з не ответил.

// добавить лоадер!!!!!!!!!!!!! + маску ввода (она слетела)