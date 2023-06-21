import { disableScroll } from './disable-scroll.js';
import { enableScroll } from './enable-scroll.js';

export const menuBtn = document.querySelector('.menu__btn');
export const navMenu = document.querySelector('.nav-menu');

const toggleMenu = () => {
	menuBtn.classList.toggle('close');
	navMenu.classList.toggle('active-menu');
	if (navMenu.classList.contains('active-menu')) {
		disableScroll();
	} else {
		enableScroll();
	}
};

export const closeMenu = () => {
	menuBtn.classList.remove('close');
	navMenu.classList.remove('active-menu');
	enableScroll();
};

menuBtn.addEventListener('keydown', (e) => {
	if (e.key === 'Tab' || e.keyCode === 9) {
		// Set focus to the button div
		menuBtn.focus();
	}

	// Open and close menu enter key tab on button
	if (e.key === 'Enter' || e.keyCode === 13) {
		e.preventDefault();
		toggleMenu();
	}
});

menuBtn.addEventListener('click', toggleMenu);
