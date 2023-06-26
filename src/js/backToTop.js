import { scrollToTop } from './scroll.js';

const backToTopBtn = document.getElementById('topBtn');

const showToTopBtn = () => {
	window.scrollY > window.innerHeight
		? backToTopBtn.classList.add('visible')
		: backToTopBtn.classList.remove('visible');
};

window.addEventListener('scroll', showToTopBtn);
backToTopBtn.addEventListener('click', scrollToTop);
