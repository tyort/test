import { makeSomething } from "./components/somemodule";

// использую функцию, которую импортировал как модуль
makeSomething("use make something");

console.log(
  "использую jquery так импортировал его в vendor.js",
  window.$("h1").parent()
);
