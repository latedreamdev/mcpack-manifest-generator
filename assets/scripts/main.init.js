import {mcpackM} from "./libs/main.lib.js";
import {lang} from "./libs/lang.js";
import {cAS} from "./libs/copy.and.save.js";
import info from "./libs/info.js";
import sw from "./libs/sw.lib.js";
window.mcpackM = mcpackM, window.lang = lang, window.cAS = cAS;
window.findEle = (ele) => {return document.querySelector(ele);};
window.findEles = (ele) => {return document.querySelectorAll(ele);};

console.log("init service worker");
sw();

console.log("init mult-language");
lang.getSettings();

console.log("init info");
info();
