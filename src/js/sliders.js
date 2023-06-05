import Swiper, { Navigation } from 'swiper';

let init = false;
let swiper;
const swiperCard = () => {
	if (window.innerWidth <= 768) {
		if (!init) {
			init = true;

			swiper = new Swiper('.services-slider', {
				modules: [Navigation],
				slidesPerView: 1,
				spaceBetween: 10,
				navigation: {
					nextEl: '.next-arrow',
					prevEl: '.prev-arrow',
				},
			});
		}
	} else if (init) {
		swiper.destroy();
		init = false;
	}
};
swiperCard();
window.addEventListener('resize', swiperCard);
// new Swiper('services-slider', {
// 	modules: [Navigation],
// 	slidesPerView: 1,
// 	spaceBetween: 10,
// 	navigation: {
// 		nextEl: '.next-arrow',
// 		prevEl: '.prev-arrow',
// 	},
// });
