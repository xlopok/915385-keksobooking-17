'use strict';

// модуль, который работает с формой объявления

(function () {

  var map = window.data.map;
  var labelsEmbeded = window.map.labelsEmbeded;
  // var fragment = window.map.fragment;
  // Добавляем неактивное состояние формы
  var mainLabel = window.map.mainLabel;
  var form = document.querySelector('.ad-form');

  var formFieldsets = form.querySelectorAll('fieldset');
  for (var i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].setAttribute('disabled', 'disabled');
  }

  // Начинаем активировать страницу

  var inputAddress = form.querySelector('#address');

  var enablePage = function () {
    form.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
    window.backend.getPins(function (pins) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < pins.length; i++) {
        fragment.appendChild(window.map.renderLabels(pins[i]));
      }
      labelsEmbeded.appendChild(fragment);
    })
    // labelsEmbeded.appendChild(fragment);
    for (i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].removeAttribute('disabled', 'disabled');
    }
  };

  inputAddress.value = mainLabel.offsetLeft + ', ' + mainLabel.offsetTop;

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

  window.form = {
    enablePage: enablePage,
    inputAddress: inputAddress
  };

})();
