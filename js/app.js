/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const navList = document.getElementById('navbar__list');
const sections = document.getElementsByTagName('section');
const fregNavList = document.createDocumentFragment();

// variable to store the active section throughout the code
let activeSection = document.getElementsByClassName('your-active-class')[0];


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
* @description Create nav element 
* @param {string} sectionName
* @param {string} sectionId
* @returns {Node} list item 
*/
function createNavElement(secName, secId) {
    const navElement = document.createElement('li');
    const anchorTag = document.createElement('a');

    anchorTag.classList.add('menu__link');
    anchorTag.textContent = secName;
    // anchorTag.setAttribute('href', '#' + secId);
    anchorTag.style.cursor = 'pointer';

    navElement.appendChild(anchorTag);

    return navElement;
}

/**
* @description Deactivate the active section
* @param {Node} activeSection
*/
function deactivateSection(activeSec) {
    activeSec.classList.remove('your-active-class');
}

/**
* @description Activate section
* @param {Node} inactiveSection
*/
function activateSection(inactiveSec) {
    inactiveSec.classList.add('your-active-class');
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

/**
* @description Build the nav
* @param {HTMLCollection} sections
*/
function buildNavBar(sections) {
    for (let section of sections) {
        const secName = section.getAttribute('data-nav');
        const secId = section.getAttribute('id');
    
        fregNavList.appendChild(createNavElement(secName, secId));
    }
    navList.appendChild(fregNavList);
}

// Add class 'active' to section when near top of viewport



/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu
buildNavBar(sections);

// Scroll to section on link click
navList.addEventListener('click', (e) => {
    if (e.target.nodeName === 'A') {
        const sec = document.querySelector(`[data-nav = '${e.target.textContent}']`);
        const secPoss = sec.getBoundingClientRect().top;
        const startPoss = window.pageYOffset;

        window.scrollTo({
            top: secPoss + startPoss,
            behavior: 'smooth'
        });
    }
});

// Set sections as active
