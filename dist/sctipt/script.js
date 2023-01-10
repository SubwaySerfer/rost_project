'use strict';

const dataObj = {
  tel: '',
  name: '',
  text: '',
};

// Расскоментируйте, чтобы опробовать автоподставление данных. Телефон не будет подставляться, чтобы дать возможность ввести актуальный.
// const serverData = {
//   tel: '8(351)999-99-99',
//   name: 'Игорь Дмитриевич',
//   text: 'Челябинский городской округ является городским округом с внутригородским делением. Соответствует административно-территориальной единице «город Челябинск»',
// };

//Раскоментируйте, если хотите взглянуть на заголовок + текст с сервера
// const serverLabel = {
//   label: 'Label',
//   text: 'Заполните анкету',
// };

let telCorrect = false;
let textCorrect = false;
let nameCorrect = false;

const modalTextArea = document.getElementById('modal_textarea');
const TextAreaError = document.querySelector('#modal_textarea + span.error');

const NameArea = document.getElementById('modal_name');
const NameAreaError = document.querySelector('#modal_name + span.error_name');

const TelArea = document.getElementById('modal_tel');
const TelAreaError = document.querySelector('#modal_tel + span.error_tel');

const mainForm = document.forms.main;

const showButton = document.getElementById('showDialog');
const favDialog = document.getElementById('favDialog');
const contactSubmit = document.getElementById('contact-submit');

const labelForm = document.getElementById('label_form');
const labelText = document.getElementById('text_form');
const showBtn = document.getElementById('show_btn');

// Открытие мод. окна по кнопке, если есть Данные с сервера, то автозаполнение. Так же фиктивное очищение при новом нажатии кнопки
showButton.addEventListener('click', () => {
  favDialog.showModal();
  modalTextArea.value = '';
  NameArea.value = '';
  TelArea.value = '';

  // Нужно добавить доп проверку ,мб могут вкинуть неккоректные данные с сервера\подменить
  if (typeof serverData !== 'undefined') {
    dataObj.text = modalTextArea.value = serverData.text;
    dataObj.name = NameArea.value = serverData.name;
  }

  if (typeof serverLabel !== 'undefined') {
    labelForm.textContent = serverLabel.label;
    console.log(labelForm);
    labelText.textContent = serverLabel.text;
    // console.log(mainForm.getElementsByClassName('data_form')[0]);
    // mainForm.getElementsByClassName('.data_form')[0].stylе.visibility = visible;
  }
});

NameArea.addEventListener('input', (event) => {
  dataObj.name = NameArea.value;
  let value = NameArea.value;
  let modal = NameAreaError;

  nameCorrect = isValid(value, modal);
  if (nameCorrect) {
    NameArea.style.backgroundColor = 'palegreen   ';
  } else {
    NameArea.style.backgroundColor = 'transparent';
  }
});

modalTextArea.addEventListener('input', (event) => {
  dataObj.text = modalTextArea.value;
  let value = modalTextArea.value;
  let modal = TextAreaError;
  textCorrect = isValid(value, modal);
  if (textCorrect) {
    modalTextArea.style.backgroundColor = 'palegreen';
  } else {
    modalTextArea.style.backgroundColor = 'transparent';
  }
});

TelArea.addEventListener('input', (event) => {
  dataObj.tel = '+' + TelArea.value.replace(/[^0-9]/g, '');

  if (validatePhone(TelArea.value) == false) {
    TelAreaError.textContent = 'Правильный формат: +7 (999) 999-99-99';
    TelAreaError.className = 'error active';
    telCorrect = false;
  } else {
    telCorrect = true;
    TelAreaError.textContent = '';
    TelAreaError.className = 'error';
    TelArea.style.backgroundColor = 'palegreen';
  }
});

contactSubmit.addEventListener('click', (e) => {
  console.log('finally ', dataObj);

  NameArea.style.backgroundColor = 'transparent';
  TelArea.style.backgroundColor = 'transparent';
  modalTextArea.style.backgroundColor = 'transparent';

  var containerDiv = document.querySelector('div.container');
  let elem = document.createElement('h2');
  let elemText = document.createTextNode('Форма отправлена');
  elem.classList.add('success-send');
  elem.appendChild(elemText);
  containerDiv.appendChild(elem);
  showBtn.classList.add('visabil');
  setTimeout(() => {
    containerDiv.removeChild(elem);
    showBtn.classList.remove('visabil');
  }, 2000);
});

mainForm.addEventListener(
  'submit',
  function (event) {
    if (!telCorrect || !nameCorrect || !textCorrect) {
      event.preventDefault();
    }
  },
  true
);

function isValid(value, modal) {
  if (/[@#$&*%]/.test(value)) {
    modal.textContent = 'Не используйте символы: @#$&*%';
    modal.className = 'error active';
    return false;
  } else {
    modal.textContent = ''; // Сбросить содержимое сообщения
    modal.className = 'error'; // Сбросить визуальное состояние сообщения
    return true;
  }
}

function validatePhone(phone) {
  let regex =
    /^(\+7|7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
  return regex.test(phone);
}
