const mobileMenuBtn = document.querySelector('#mobile-menu-btn');
const mobileMenu = document.querySelector('.header__nav');

// Mobile Menu
mobileMenuBtn.addEventListener('click', function () {
  this.classList.toggle('active');
  mobileMenu.classList.toggle('mobile-open');
  document.body.classList.toggle('lock');
});

const links = Array.from(mobileMenu.children);
links.forEach((link) => {
  link.addEventListener("click", closeOnClick);
});

function closeOnClick() {
  mobileMenu.classList.remove('mobile-open');
  mobileMenuBtn.classList.remove('active');
  document.body.classList.remove('lock');
};

// TABS
const priceListBtn = document.querySelectorAll('.service-list__tab');
const priceList = document.querySelectorAll('.price-list');

priceListBtn.forEach(function (item) {
  item.addEventListener('click', function () {
    let currentBtn = item;
    let tabId = currentBtn.getAttribute('data-tab');
    let currentTab = document.querySelector(tabId);

    if (!currentBtn.classList.contains('active')) {
      priceListBtn.forEach(function (item) {
        item.classList.remove('active');
      });

      priceList.forEach(function (item) {
        item.classList.remove('active');
      });

      currentBtn.classList.add('active');
      currentTab.classList.add('active');
    };

  });
});

document.querySelector('.service-list__tab').click();
