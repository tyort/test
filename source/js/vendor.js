import $ from "jquery";
window.$ = $;
import 'slick-carousel';
import LazyLoad from "vanilla-lazyload";

// eslint-disable-next-line no-unused-vars
const myLazyLoad = new LazyLoad({
  // eslint-disable-next-line camelcase
  elements_selector: `.lazyload`
});
