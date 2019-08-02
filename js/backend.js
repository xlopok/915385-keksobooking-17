'use strict';

(function () {

  window.backend = {
    getPins: function (onLoad) {

      var URL =  'https://js.dump.academy/keksobooking/data';
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        // if (xhr.status === 200) {
          onLoad(xhr.response);
        // } else {
        //   onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        // }
      });

      xhr.open('GET', URL);
      xhr.send();
    }
  }

})();
