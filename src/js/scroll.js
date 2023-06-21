import { closeMenu, navMenu } from './mobileMenu.js';

const fixedMenu = document.querySelector('.menu');
const homeButton = document.querySelector('.home-button');
const logo = document.querySelector('.menu__logo');
const pricesBtn = document.querySelectorAll('.article-btn');
const navLinks = navMenu.querySelectorAll('a');
const topBtn = document.getElementById('topBtn');

// Scroll to element
const scrollToElement = (event, element, offset = 0) => {
	event.preventDefault();

	const target = element.getAttribute('href');
	const targetElement = document.querySelector(target);
	const top = targetElement.offsetTop;

	window.scrollTo({
		top: top - offset,
		behavior: 'smooth',
	});
};

// Scroll to top
const scrollToTop = (e) => {
	e.preventDefault();
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	});
};

topBtn.addEventListener('click', scrollToTop);

// Make nav menu transparent when scroll down
window.addEventListener('scroll', () => {
	if (window.scrollY > 60) {
		fixedMenu.style.opacity = 0.9;
	} else {
		fixedMenu.style.opacity = 1;
	}
});

// Scroll from home banner to about section
homeButton.addEventListener('click', (e) => scrollToElement(e, homeButton, 60));

// Scroll from services to prices
pricesBtn.forEach((btn) =>
	btn.addEventListener('click', (e) => scrollToElement(e, btn, 20)),
);

// Scroll to top click to logo
logo.addEventListener('click', scrollToTop);

// Scroll top button

// Scroll to section on click menu link
navLinks.forEach((link) =>
	link.addEventListener('click', (e) => {
		navLinks.forEach((link) => {
			link.classList.remove('active');
		});
		closeMenu();
		scrollToElement(e, link, 20);

		link.classList.add('active');
	}),
);
