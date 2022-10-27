import 'slick-carousel/slick/slick';
import $ from "jquery";
import { Fancybox } from "@fancyapps/ui";

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

// данные из формы 
document.querySelector('.form__btn').addEventListener('click', submitForm);

// function submitForm(e) {
//   e.preventDefault();

//   let clientName = document.querySelector('.client-name').value;
//   let clientTel = document.querySelector('.client-phone').value;
//   console.log(clientName + '\n' + clientTel);
// };

// function submitForm(e) {  //Заменим на массив:
//   e.preventDefault();

//   const nodes = document.forms["form"].querySelectorAll("input");
//   const clientData = [].map.call(nodes, function(item) {
//     return {name : item.name, value : item.value};
//   });
//   console.log(clientData);
// }

// Отправка данных из формы на сервер 

const API_PATH = 'https://beauty-saloon-server.herokuapp.com/api';

function submitForm(e) {  
  e.preventDefault();

  const nodes = document.forms["form"].querySelectorAll("input");
  const clientData = [].map.call(nodes, function (item) {
    return { name: item.name, value: item.value };
  });
  console.log(clientData);

  // fetch(`${API_PATH}/orders`, {
  //   method: 'POST',
  //   body: JSON.stringify(clientData)
  // })

  //   .then(() => {
  //     console.log('Successful');
  //   });

  fetch(`${API_PATH}/login`, {
    method: 'POST',
    body: JSON.stringify(
      {
        userName: 'admin',
        password: 'admin'
      }
    ),
    headers: {
      'Content-type': 'application/json'
    }
  })

    .then(response => response.json())
    .then(async ({ access_token }) => {
      const response = await fetch(`${API_PATH}/orders`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      const orders = await response.json();
      console.log(orders);

    })


}

//надо отправить clientData