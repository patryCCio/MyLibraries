import { Animation } from "../../AnimationPS/js/main.js";

const liEl = document.querySelectorAll('.ul-li');
const navbar = document.querySelector('[data-navbarps]');
const burger = document.querySelector('[data-burgerps]');

const elements = document.querySelectorAll('[data-hrefposps]');
console.log(navbar);

Animation.scroll('ease', 1000, 10, elements, false, null, true, liEl, true, navbar, 200, true, burger);
