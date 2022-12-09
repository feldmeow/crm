'use strict';
const modalTitle = document.querySelector('.modal__title');
const modalForm = document.querySelector('.modal__form');
const modalCheckbox = document.querySelector('.modal__checkbox');
const modalDiscount = document.querySelector('.modal__input_discount');
const table = document.querySelector('.table__body');
const addBtn = document.querySelector('.panel__add-goods');
const overlay = document.querySelector('.overlay');
const modalCloseBtn = document.querySelector('.modal__close');
const modalWindow = document.querySelector('.modal');
const modalInputs = document.querySelectorAll('.modal__input');
const vendorIdSpan = document.querySelector('.vendor-code__id');
const totalPriceSpan = document.querySelector('.crm__total-price');
const modalTotalPrice = document.querySelector('.modal__total-price');
let vendorId;
// массив с объектами
const goods = [
  {
    id: 1,
    title: 'Смартфон Xiaomi 11T 8/128GB',
    price: 27000,
    description:
      'Смартфон Xiaomi 11T – это представитель флагманской линейки, выпущенной во второй половине 2021 года. И он полностью соответствует такому позиционированию, предоставляя своим обладателям возможность пользоваться отличными камерами, ни в чем себя не ограничивать при запуске игр и других требовательных приложений.',
    category: 'mobile-phone',
    discont: false,
    count: 3,
    units: 'шт',
    images: {
      small: 'img/smrtxiaomi11t-m.jpg',
      big: 'img/smrtxiaomi11t-b.jpg',
    },
  },
  {
    id: 2,
    title: 'Радиоуправляемый автомобиль Cheetan',
    price: 4000,
    description:
      'Внедорожник на дистанционном управлении. Скорость 25км/ч. Возраст 7 - 14 лет',
    category: 'toys',
    discont: 5,
    count: 1,
    units: 'шт',
    images: {
      small: 'img/cheetancar-m.jpg',
      big: 'img/cheetancar-b.jpg',
    },
  },
  {
    id: 3,
    title: 'ТВ приставка MECOOL KI',
    price: 12400,
    description:
      'Всего лишь один шаг сделает ваш телевизор умным, Быстрый и умный MECOOL KI PRO, прекрасно спроектированный, сочетает в себе прочный процессор Cortex-A53 с чипом Amlogic S905D',
    category: 'tv-box',
    discont: 15,
    count: 4,
    units: 'шт',
    images: {
      small: 'img/tvboxmecool-m.jpg',
      big: 'img/tvboxmecool-b.jpg',
    },
  },
  {
    id: 4,
    title: 'Витая пара PROConnect 01-0043-3-25',
    price: 22,
    description:
      'Витая пара Proconnect 01-0043-3-25 является сетевым кабелем с 4 парами проводов типа UTP, в качестве проводника в которых используется алюминий, плакированный медью CCA. Такая неэкранированная витая пара с одножильными проводами диаметром 0.50 мм широко применяется в процессе сетевых монтажных работ. С ее помощью вы сможете обеспечить развертывание локальной сети в домашних условиях или на предприятии, объединить все необходимое вам оборудование в единую сеть.',
    category: 'cables',
    discont: false,
    count: 420,
    units: 'v',
    images: {
      small: 'img/lan_proconnect43-3-25.jpg',
      big: 'img/lan_proconnect43-3-25-b.jpg',
    },
  },
];

// создание строки
const createRow = (obj, index) => {
  const newElem = document.createElement('tr');
  newElem.innerHTML = `
    <td class="table__cell">${index + 1}</td>
    <td class="table__cell table__cell_left table__cell_name" data-id="${
      obj.vendorId ? obj.vendorId : 24601654816512
    }">
      <span class="table__cell-id">id: ${
        obj.vendorId ? obj.vendorId : 24601654816512
      }</span>
      ${obj.title}
    </td>
    <td class="table__cell table__cell_left">${obj.category}</td>
    <td class="table__cell">${obj.units}</td>
    <td class="table__cell">${obj.count}</td>
    <td class="table__cell">$${obj.price}</td>
    <td class="table__cell">$${obj.price * obj.count}</td>
    <td class="table__cell table__cell_btn-wrapper">
      <button class="table__btn table__btn_pic"></button>
      <button class="table__btn table__btn_edit"></button>
      <button class="table__btn table__btn_del"></button>
    </td>
  `;
  return newElem;
};
const generateId = () => {
  const num = Math.round(Math.random() * 99999999999999);
  return num;
};
const calculateTotalPrice = (arr) => {
  let totalPrice = 0;
  arr.forEach((el) => {
    totalPrice += el.price * el.count;
  });
  return totalPrice;
};
// рендер
const renderGoods = (arr) => {
  totalPriceSpan.textContent = '';
  table.innerHTML = '';
  arr.forEach((el, index) => {
    table.append(createRow(el, index));
  });
  totalPriceSpan.textContent = '$ ' + calculateTotalPrice(goods);
};

renderGoods(goods);

const openModal = () => {
  overlay.classList.add('active');
  vendorId = generateId();
  vendorIdSpan.textContent = vendorId;
  modalForm.total.value = '$ 0';
};

const closeModal = () => {
  overlay.classList.remove('active');
  clearInputs(modalInputs);
};

const clearInputs = (nodeList) => {
  nodeList.forEach((item) => {
    item.value = '';
  });
};

// евентеры
const eventListeners = () => {
  addBtn.addEventListener('click', openModal);

  overlay.addEventListener('click', (event) => {
    if (
      !event.target.closest('.modal') ||
      event.target.closest('.modal__close')
    ) {
      closeModal();
    }
  });

  table.addEventListener('click', (e) => {
    const target = e.target;
    const deleteBtn = Array.from(
      document.getElementsByClassName('table__btn_del')
    );
    if (target.closest('.table__btn_del')) {
      const index = deleteBtn.indexOf(target);
      target.closest('tr').remove();
      goods.splice(index, 1);
      console.log(goods);
      renderGoods(goods);
    }
  });
  modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    formData.vendorId = vendorId;
    goods.push(formData);
    renderGoods(goods);
    clearInputs(modalInputs);
    closeModal();
  });

  modalForm.discount.addEventListener('change', () => {
    if (modalForm.discount.checked) modalForm.discount_count.disabled = 0;
    else modalForm.discount_count.disabled = 1;
  });

  modalForm.addEventListener(
    'change',
    () => {
      modalForm.count === 0
        ? (modalForm.total.value = '$ ' + modalForm.price.value)
        : (modalForm.total.value =
            '$ ' + modalForm.price.value * modalForm.count.value);
    },
    true
  );
};
eventListeners();
