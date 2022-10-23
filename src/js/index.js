import 'slick-carousel/slick/slick';
import $ from 'jquery';
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

function submitForm(e) {
  e.preventDefault();

  let clientName = document.querySelector('.client-name').value;
  let clientTel = document.querySelector('.client-phone').value;
  console.log(clientName + '\n' + clientTel);
};