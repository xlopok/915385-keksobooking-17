'use strict';

// модуль, который управляет карточками объявлений и пинами: добавляет на страницу нужную карточку, отрисовывает пины и осуществляет взаимодействие карточки и метки на карте;

(function () {

  // 2. У блока .map уберите класс .map--faded.

  var map = window.data.map;
  var mainLabel = document.querySelector('.map__pin--main');

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
  // var mocker = window.data.mockerDataGenerator;
  // mockerDataGenerator();

  // 4. Отрисуйте сгенерированные DOM-элементы в блок .map__pins. Для вставки элементов используйте DocumentFragment.

  var labelsEmbeded = map.querySelector('.map__pins');

  // var fragment = document.createDocumentFragment();
  // for (var i = 0; i < mocker.length; i++) {
  //   fragment.appendChild(renderLabels(mocker[i]));
  // }

  // window.backend.getPins(function (pins) {
  //   var fragment = document.createDocumentFragment();
  //   for (var i = 0; i < pins.length; i++) {
  //     fragment.appendChild(renderLabels(pins[i]));
  //     // console.log(pins);
  //   }
  //   return fragment;

  // })

  window.map = {
    mainLabel: mainLabel,
    labelsEmbeded: labelsEmbeded,
    renderLabels: renderLabels,
    // fragment: fragment
    // dataPins: dataPins
  };

})();
