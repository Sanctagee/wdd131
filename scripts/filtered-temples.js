// Hamburger menu functionality
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');


menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    menuToggle.textContent = mainNav.classList.contains('active') ? '✕' : '☰';
});

// Footer content
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

// Temple data array (7 provided + 3 additional)
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "images/aba_nigeria_temple_lds.webp"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  // Additional temples
  {
    templeName: "Berlin",
    location: "Germany, Berlin",
    dedicated: "2004, January, 11",
    area: 17500,
    imageUrl: "images/Berlin.jpg"
  },
  {
    templeName: "Campinas",
    location: "Campinas, Brazil",
    dedicated: "2019, March, 10",
    area: 40000,
    imageUrl: "images/campinas_brazil_temple_lds.webp"
  },
  {
    templeName: "Salt Lake",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl: "images/boston_temple_lds.webp"
  },
  {
    templeName: "Abidjan Ivory Coast",
    location: "Abidjan, Ivory Coast",
    dedicated: "1995, July, 6",
    area: 20500,
    imageUrl: "images/abidjan_ivory_coast_temple.webp"
  },
  {
    templeName: "Adelaide Australia",
    location: "Adelaide, Australia",
    dedicated: "1899, March, 30",
    area: 74792,
    imageUrl: "images/adelaide_australia_temple.webp"
  }
];

// DOM Elements
const pageHeading = document.getElementById('page-heading');
const templeContainer = document.getElementById('temple-container');
const navHome = document.getElementById('home');
const navOld = document.getElementById('old');
const navNew = document.getElementById('new');
const navLarge = document.getElementById('large');
const navSmall = document.getElementById('small');

// Create temple card element
function createTempleCard(temple) {
  const card = document.createElement('div');
  card.className = 'temple-card';
  
  card.innerHTML = `
    <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy">
    <div class="temple-info">
      <h3>${temple.templeName}</h3>
      <p><strong>Location:</strong> ${temple.location}</p>
      <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
      <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
    </div>
  `;
  
  return card;
}

// Display temples
function displayTemples(templesArray) {
  templeContainer.innerHTML = '';
  templesArray.forEach(temple => {
    templeContainer.appendChild(createTempleCard(temple));
  });
}

// Filter functions
// Helper function to animate heading changes
function updateHeading(text) {
  pageHeading.classList.remove('heading-animate');
  // Trigger reflow to restart animation
  void pageHeading.offsetWidth;
  pageHeading.textContent = text;
  pageHeading.classList.add('heading-animate');
}

// Updated filter functions with animation
function filterOld() {
  const oldTemples = temples.filter(temple => {
    const year = parseInt(temple.dedicated.split(',')[0]);
    return year < 1900;
  });
  displayTemples(oldTemples);
  setActiveNav(navOld);
  updateHeading("Old Sacred Places Collection");
}

function filterNew() {
  const newTemples = temples.filter(temple => {
    const year = parseInt(temple.dedicated.split(',')[0]);
    return year > 2000;
  });
  displayTemples(newTemples);
  setActiveNav(navNew);
  updateHeading("New Sacred Places Collection");
}

function filterLarge() {
  const largeTemples = temples.filter(temple => temple.area > 90000);
  displayTemples(largeTemples);
  setActiveNav(navLarge);
  updateHeading("Large Sacred Places Collection");
}

function filterSmall() {
  const smallTemples = temples.filter(temple => temple.area < 10000);
  displayTemples(smallTemples);
  setActiveNav(navSmall);
  updateHeading("Small Sacred Places Collection");
}

function showAll() {
  displayTemples(temples);
  setActiveNav(navHome);
  updateHeading("Sacred Places Collection");
}

// Set active navigation
function setActiveNav(activeElement) {
  const navItems = [navHome, navOld, navNew, navLarge, navSmall];
  navItems.forEach(item => item.classList.remove('active'));
  activeElement.classList.add('active');
  pageHeading.textContent = "Sacred Places Collection";
}

// Event listeners
navHome.addEventListener('click', showAll);
navOld.addEventListener('click', filterOld);
navNew.addEventListener('click', filterNew);
navLarge.addEventListener('click', filterLarge);
navSmall.addEventListener('click', filterSmall);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  showAll();
});