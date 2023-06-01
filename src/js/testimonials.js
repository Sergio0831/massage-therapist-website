// Testimonials data
const testimonials = [
	{
		id: 1,
		name: 'Sergejs',
		img: './img/testimonials/person1.jpg',
		text: 'Оксана - мастер своего дела. Перепробовал почти все виды массажа в её исполнении. Любимый - класический.Боль в спине после тяжелого рабочего дня, которая была раньше, пропадает.))',
	},
	{
		id: 2,
		name: 'Ineta',
		img: './img/testimonials/person2.jpg',
		text: 'Ļoti profesionāla, patīkama, relaksējošā masāža. Oksana ir brīnišķīgs cilvēks ar zeltam rokām. Noteikti iesāku!',
	},
	{
		id: 3,
		name: 'Peter',
		img: './img/testimonials/person3.jpg',
		text: 'Оксана прекрасный специалист, владеющий разными техниками массажа и обладающий, как отличными практическими навыками, так и глубокими медицинскими знаниями. Оксане, спасибо)',
	},
];

// Items
const img = document.getElementById('person-img');
const firstName = document.getElementById('firstName');
const review = document.getElementById('review');

// Buttons
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

// Set starting Item
let currentItem = 0;

// Get current Item
window.addEventListener('DOMContentLoaded', function () {
	showPerson(currentItem);
});

// Show Person
function showPerson() {
	const item = testimonials[currentItem];
	img.src = item.img;
	firstName.textContent = item.name;
	review.textContent = item.text;
}

// Show next person
nextBtn.addEventListener('click', function () {
	currentItem++;
	if (currentItem > testimonials.length - 1) {
		currentItem = 0;
	}
	showPerson();
});

// Show prev person
prevBtn.addEventListener('click', function () {
	currentItem--;
	if (currentItem < 0) {
		currentItem = testimonials.length - 1;
	}
	showPerson();
});
