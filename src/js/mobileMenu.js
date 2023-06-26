import { disableScroll } from './disable-scroll.js';
import { enableScroll } from './enable-scroll.js';

export const menuBtn = document.querySelector('.menu__btn');
export const navMenu = document.querySelector('.nav-menu');

// Toggle menu on click hamburger button
const toggleMenu = (e) => {
	e.stopPropagation();
	menuBtn.classList.toggle('close');
	navMenu.classList.toggle('active-menu');
	if (navMenu.classList.contains('active-menu')) {
		disableScroll();
	} else {
		enableScroll();
	}
};

// Close menu
export const closeMenu = () => {
	menuBtn.classList.remove('close');
	navMenu.classList.remove('active-menu');
	enableScroll();
};

// Close menu on click outside
document.addEventListener('click', (e) => {
	const target = e.target;

	if (!navMenu.contains(target)) {
		closeMenu();
	}
});

// Toggle hamburger button with enter
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
