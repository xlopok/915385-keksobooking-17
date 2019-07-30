'use strict';

// модуль, который работает с формой объявления

(function () {

  // module5-task1: В этом задании мы решим задачу перемещения главного маркера (.map__pin--main) по карте.
  var map = window.data.map;
  var mainLabel = window.map.mainLabel;
  var inputAddress = window.form.inputAddress;

  mainLabel.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      window.form.enablePage();
      inputAddress.value = mainLabel.offsetLeft + ', ' + mainLabel.offsetTop;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainLabel.style.top = (mainLabel.offsetTop - shift.y) + 'px';
      mainLabel.style.left = (mainLabel.offsetLeft - shift.x) + 'px';

      var limits = {
        top: map.offsetTop,
        left: map.offsetLeft,
        right: map.offsetWidth + map.offsetLeft,
        bottom: map.offsetTop + map.offsetHeight

      };

      var pinCoordsRelative = {
        x: parseInt(mainLabel.style.left, 10) + limits.left,
        y: parseInt(mainLabel.style.top, 10) + limits.top
      };

      // left:
      if (pinCoordsRelative.x < limits.left) {
        mainLabel.style.left = 0;
      }
      // top:
      if (pinCoordsRelative.y < limits.top + 130) {
        mainLabel.style.top = 130 + 'px';
      }

      // right
      if (pinCoordsRelative.x > limits.right - mainLabel.offsetWidth) {
        mainLabel.style.left =
          limits.right - mainLabel.offsetWidth - map.offsetLeft + 'px';
      }

      // bottom:
      if (pinCoordsRelative.y > limits.top + 630) {
        mainLabel.style.top =
        limits.top + 630 + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
