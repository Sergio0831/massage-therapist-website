// Testimonials data
const testimonials = [
  {
    id: 1,
    name: "Sergejs Ivcenko",
    job: "Web Developer",
    img: (src = "./img/testimonials/person1.jpg"),
    text:
      "Edison bulb put a bird on it humblebrag, marfa pok pok heirloom fashion axe cray stumptown venmo actually seitan. VHS farm-to-table schlitz, edison bulb pop-up 3 wolf moon tote bag street art shabby chic.",
  },
  {
    id: 2,
    name: "Brad Bad",
    job: "Web Designer",
    img: (src = "./img/testimonials/person2.jpg"),
    text:
      "I'm baby meggings twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry",
  },
  {
    id: 3,
    name: "Peter Jones",
    job: "CEO",
    img: (src = "./img/testimonials/person3.jpg"),
    text:
      "Helvetica artisan kinfolk thundercats lumbersexual blue bottle. Disrupt glossier gastropub deep v vice franzen hell of brooklyn twee enamel pin fashion axe.photo booth jean shorts artisan narwhal.",
  },
];

// Items
const img = document.getElementById("person-img");
const name = document.getElementById("name");
const job = document.getElementById("job");
const info = document.getElementById("review");

// Buttons
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

// Set starting Item
let currentItem = 0;

// Get current Item
window.addEventListener("DOMContentLoaded", function () {
  showPerson(currentItem);
});

// Show Person
function showPerson() {
  const item = testimonials[currentItem];
  img.src = item.img;
  name.textContent = item.name;
  job.textContent = item.job;
  info.textContent = item.text;
}

// Show next person
nextBtn.addEventListener("click", function () {
  currentItem++;
  if (currentItem > testimonials.length - 1) {
    currentItem = 0;
  }
  showPerson();
});

// Show prev person
prevBtn.addEventListener("click", function () {
  currentItem--;
  if (currentItem < 0) {
    currentItem = testimonials.length - 1;
  }
  showPerson();
});

// setInterval(function startSlide() {
//   currentItem++;
//   if (currentItem > testimonials.length - 1) {
//     currentItem = 0;
//   }
//   showPerson();
// }, 1000);
