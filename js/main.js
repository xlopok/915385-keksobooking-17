'use strict';

// 1. Создайте массив, состоящий из 8 сгенерированных JS объектов

var housingTypeArray = ['palace', 'flat', 'house', 'bungalo'];
var pinWidth = 50;
var pinHeight = 70;

// Получить рандомное число от и до
function myRandom(from, to) {
  return Math.floor((Math.random() * (to - from + 1)) + from);
}

// Получить рандомное значение Х метки в зависисости от ширины блока
var getMapWidth = function (block) {
  return myRandom(0, block.offsetWidth);
};

var mockerDataGenerator = function () {
  var dataArray = [];

  for (var i = 0; i < 8; i++) {

    dataArray[i] = {
      'author': {
        'avatar': 'img/avatars/user' + '0' + (i + 1) + '.png'
        // строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
      },
      'offer': {
        'type': myRandom(0, housingTypeArray.length - 1)
        // строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
      },

      'location': {
        'x': (getMapWidth(map) + (pinWidth / 2) + 'px'),
        //  случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
        'y': (myRandom(130, 630) + pinHeight + 'px')
        // случайное число, координата y метки на карте от 130 до 630.
      }
    };
  }
  return dataArray;
};

// 2. У блока .map уберите класс .map--faded.

var map = document.querySelector('.map');
// Временно вернули страницу в исходное состояние (неактивное)
// map.classList.remove('map--faded');

// 3. На основе данных, созданных в первом пункте, создайте DOM-элементы, соответствующие меткам на карте, и заполните их данными из массива. Итоговую разметку метки .map__pin можно взять из шаблона #pin.

var labelsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderLabels = function (label) {
  var labelElement = labelsTemplate.cloneNode(true);

  labelElement.style.left = label.location.x;
  labelElement.style.top = label.location.y;
  labelElement.querySelector('img').src = label.author.avatar;
  labelElement.querySelector('img').alt = label.offer.type;

  return labelElement;
};

// Вызываем функцию для создания массива объектов с данными (пока не получаем данные с сервера)
var mocker = mockerDataGenerator();

// 4. Отрисуйте сгенерированные DOM-элементы в блок .map__pins. Для вставки элементов используйте DocumentFragment.

var labelsEmbeded = map.querySelector('.map__pins');

var fragment = document.createDocumentFragment();
for (var i = 0; i < mocker.length; i++) {
  fragment.appendChild(renderLabels(mocker[i]));
}
// Временно вернули страницу в исходное состояние (неактивное)
// labelsEmbeded.appendChild(fragment);


// Добавляем неактивное состояние формы

var form = document.querySelector('.ad-form');

var formFieldsets = form.querySelectorAll('fieldset');
for (i = 0; i < formFieldsets.length; i++) {
  formFieldsets[i].setAttribute('disabled', 'disabled');
}


// Начинаем активировать страницу

var mainLabel = document.querySelector('.map__pin--main');
var inputAddress = form.querySelector('#address');

var enablePage = function () {
  form.classList.remove('ad-form--disabled');
  map.classList.remove('map--faded');
  labelsEmbeded.appendChild(fragment);
  for (i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].removeAttribute('disabled', 'disabled');
  }
};

inputAddress.value = mainLabel.offsetLeft + ', ' + mainLabel.offsetTop;

mainLabel.addEventListener('click', enablePage);
mainLabel.addEventListener('mouseup', function () {
  inputAddress.value = mainLabel.offsetLeft + ', ' + mainLabel.offsetTop;
});


// Валидация формы

// Тип жилья влияет на цену за ночь

var selectType = form.querySelector('#type');
var inputPrice = form.querySelector('#price');

selectType.addEventListener('change', function () {
  var selectedOption = selectType.options[selectType.selectedIndex].value;
  if (selectedOption === 'bungalo') {
    inputPrice.min = 0;
    inputPrice.placeholder = 0;
  } else if (selectedOption === 'flat') {
    inputPrice.min = 1000;
    inputPrice.placeholder = 1000;
  } else if (selectedOption === 'house') {
    inputPrice.min = 5000;
    inputPrice.placeholder = 5000;
  } else if (selectedOption === 'palace') {
    inputPrice.min = 10000;
    inputPrice.placeholder = 10000;
  }
});

// Время заезда и выезда

var timeIn = form.querySelector('#timein');
var timeOut = form.querySelector('#timeout');

timeIn.addEventListener('change', function () {
  var selectedOption = timeIn.options[timeIn.selectedIndex].value;

  for (i = 0; i < timeOut.options.length; i++) {
    if (selectedOption === timeOut.options[i].value) {
      timeOut.options[i].selected = 'selected';
      timeIn.options[i].selected = 'selected';
    }
  }
});

timeOut.addEventListener('change', function () {
  var selectedOption = timeOut.options[timeOut.selectedIndex].value;

  for (i = 0; i < timeIn.options.length; i++) {

    if (selectedOption === timeIn.options[i].value) {
      timeOut.options[i].selected = 'selected';
      timeIn.options[i].selected = 'selected';
    }
  }
});
