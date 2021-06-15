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
const scrollBtn = document.getElementById('scroll-btn');
const hamburgerIcon = document.getElementById('hamburger-icon');

// variable to store the active section throughout the code
let activeSection = document.querySelector('.your-active-class');
// variable to store the active anchor tag
let activeAnchor;
let navElementCount = 0;


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
function createNavElement(secName) {
    const navElement = document.createElement('li');
    const anchorTag = document.createElement('a');
    navElementCount++;

    anchorTag.setAttribute('id', 'anchor' + navElementCount);
    anchorTag.classList.add('menu__link');
    anchorTag.textContent = secName;
    anchorTag.style.cursor = 'pointer';

    navElement.appendChild(anchorTag);

    return navElement;
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

    // set the first link as active link
    const activeAnch = document.getElementById('anchor1');
    activeAnch.classList.add('menu__link--active');
    activeAnchor = activeAnch;
}

/**
* @description  Set section and its anchor tag as active
* @param {Node} inactiveSection
*/
function activateSection(inactiveSec) {
    if (inactiveSec !== activeSection) {
        // activate section 
        inactiveSec.classList.add('your-active-class');
        activeSection.classList.remove('your-active-class');
        activeSection = inactiveSec;
        
        // activate anchor tag
        let anchorId = inactiveSec.getAttribute('id');
        anchorId = anchorId.replace('section', 'anchor');
        const anchor = document.getElementById(anchorId);
        
        anchor.classList.add('menu__link--active');
        activeAnchor.classList.remove('menu__link--active');
        activeAnchor = anchor;
    }
}

// Add class 'active' to section when near top of viewport
onscroll = function() {
    let scrollPoss = this.document.documentElement.scrollTop;

    for (let section of sections) {
        if (scrollPoss >= section.offsetTop - 100 && scrollPoss <= section.offsetTop - 200 + section.offsetHeight) {
            activateSection(section);
        }
    }
};


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
        activateSection(sec);

        window.scrollTo({
            top: secPoss + startPoss - 40,
            behavior: 'smooth'
        });

        navList.classList.toggle('visible');
    }
});

// Scroll to the top of the page on button click
scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
});

// Toggle the nav bar on click
hamburgerIcon.addEventListener('click', () => {
    navList.classList.toggle('visible');
});