(function () {
  'use strict';

  function makeSomething(data) {
    console.log("makeSomething:", data);
  }

  // использую функцию, которую импортировал как модуль
  makeSomething("use make something");

  console.log(
    "использую jquery так импортировал его в vendor.js",
    window.$("h1").parent()
  );

}());

//# sourceMappingURL=main.js.map
