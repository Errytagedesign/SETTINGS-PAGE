'use strict';

//TODO: Declare all required variables
const toogleOpen = document.querySelector('.toggle-open');
const toogleClose = document.querySelector('.toggle-close');
const menu = document.querySelector('.menu');
const body = document.body;
const heroSection = document.querySelector('.hero');
const jumpTopBtn = document.querySelector('.jump-top');
const jumpTopBtnIcon = document.querySelector('.jump-top i');
const sectionFade = document.querySelectorAll('.fade-in');
const ctaSection = document.querySelector('.cta');
const footer = document.querySelector('.footer');
const productsMenu = document.querySelector('.products-menu');
const productSection = document.querySelector('.products');

console.log(productsMenu);

//TODO: Dropdown menu (Header Section)

//* Deactivate toggle close button
toogleClose.classList.add('hidden');
//* Deactivate dropdown menu
menu.classList.add('menu-hidden');

//* Store Dropdown Actions in functions to avoid repetition
const openDropdown = function () {
    menu.classList.remove('menu-hidden');
    toogleOpen.classList.add('hidden');
    toogleClose.classList.remove('hidden');
    body.style.overflow = 'hidden';
}

const closeDropdown = function () {
    toogleClose.classList.add('hidden');
    toogleOpen.classList.remove('hidden');
    menu.classList.add('menu-hidden');
    body.style.overflow = 'auto';
}

//* Show Dropdown Menu (Add event listener to the toggle open button)
toogleOpen.addEventListener('click', openDropdown);

//* Hide Dropdown Menu (Add event listener to the toggle close button)
toogleClose.addEventListener('click', closeDropdown);

//* Hide Dropdown Menu when the ESCAPE key is pressed
document.addEventListener('keydown', e => {
    console.log(e.key);
    if (e.key == 'Escape') {
        closeDropdown();
    }
})


//TODO: Jump-to-top Smooth Scroll Functionality

//* Add event listener to jump-top button and perform a smooth scroll to the hero section
jumpTopBtn.addEventListener('click', e => {
    heroSection.scrollIntoView({behavior:"smooth"});
})


//TODO: Section Fade In On Scroll

const fadeCallback = function(entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.add('activate-section');

    observer.unobserve(entry.target);
}

const fadeOptions = {
    root: null,
    threshold: 0.1,
}

const fadeObserver = new IntersectionObserver(fadeCallback, fadeOptions);

sectionFade.forEach(s => {
    fadeObserver.observe(s);
})


//TODO: Change JumpToTop Button Color When It Moves Over The CTA Section

//* Initial State Of JumpToButton On Load

jumpTopBtn.style.backgroundColor = '#1b8381';
jumpTopBtnIcon.style.color = '#ffffff';

const ctaCallback = function(entries) {
    const [entry] = entries;

    if(entry.isIntersecting) {
        jumpTopBtn.style.backgroundColor = '#ffffff';
        jumpTopBtnIcon.style.color = '#1b8381';
    }
    else if (!entry.isIntersecting) {
        jumpTopBtn.style.backgroundColor = '#1b8381';
        jumpTopBtnIcon.style.color = '#ffffff';
    }
}

const ctaOptions = {
    root: null,
    threshold: 0,
}

const ctaObserver = new IntersectionObserver(ctaCallback, ctaOptions);

ctaObserver.observe(ctaSection);

//TODO: Change JumpToTop Button Color When It Moves Over The Footer Section

const footerCallback = function(entries) {
    const [entry] = entries;

    if (!entry.isIntersecting) {
        jumpTopBtn.style.backgroundColor = '#ffffff';
        jumpTopBtnIcon.style.color = '#1b8381';
    }
    else {
        jumpTopBtn.style.backgroundColor = '#1b8381';
        jumpTopBtnIcon.style.color = '#ffffff';
    }
}

const footerOptions = {
    root: null,
    threshold: 0,
}

const footerObserver = new IntersectionObserver(footerCallback, footerOptions);

footerObserver.observe(footer);



// //TODO: Scroll to Product Section On Click

// productsMenu.addEventListener('click', e => {
//     // e.preventDefault();
//     // productSection.scrollIntoView({behavior:"smooth"});
// }



