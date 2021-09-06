"use strict";

import countTimer from "./modules/countTimer";
import toggleMenu from "./modules/toggleMenu";
import togglePopUp from "./modules/togglePopUp";
import tabs from "./modules/tabs";
import slider from "./modules/slider";
import changeTeamPhotos from "./modules/changeTeamPhotos";
import checkInputs from "./modules/checkInputs";
import calc from "./modules/calc";
import sendForm from "./modules/sendForm";
import validator from "./modules/validator";

// Timer
countTimer("13 november 2021");
// Menu
toggleMenu();
// Popup
togglePopUp();
// Tabs
tabs();
// Slider
slider();
// Change command photos
changeTeamPhotos();
// Checking inputs
checkInputs();
//Calculator
calc(100);
// send form
sendForm();
// Validator
validator();
