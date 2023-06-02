const menuBtn = document.querySelector('.menu-btn');
const navMenu = document.querySelector('.nav-menu');
const navLinks = navMenu.querySelectorAll('a');

const toggleMenu = () => {
	menuBtn.classList.toggle('close');
	navMenu.classList.toggle('active-menu');
};

const closeMenu = () => {
	navMenu.classList.remove('active-menu');
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
