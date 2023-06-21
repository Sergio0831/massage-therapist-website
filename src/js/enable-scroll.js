import vars from './vars.js';

export const enableScroll = () => {
	const fixBlocks = document?.querySelectorAll('.fixed-block');
	fixBlocks.forEach((el) => {
		el.style.paddingRight = '0px';
	});
	vars.bodyEl.style.paddingRight = '0px';
	vars.bodyEl.classList.remove('dis-scroll');
};
