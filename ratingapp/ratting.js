'use strict'

const rattingContainer = document.querySelector('.ratting_container');
const ratting = document.getElementById('ratting');
let selectedRatting = 0;
let currentIndex = null;
const startUpdates = (elem) => {
    if (!elem) return null;
    let previousSibling = elem;
    while (previousSibling) {
        previousSibling.classList.add('active');
        previousSibling = previousSibling.previousElementSibling;
    }
    let nextsibling = elem.nextElementSibling;
    while (nextsibling) {
        nextsibling.classList.remove('active');
        nextsibling = nextsibling.nextElementSibling;
    }
}

const handleMouseOver = (event) => {
    if (event.target && event.target.tagName == 'SPAN') {
        startUpdates(event.target);
    }
}

const resetStarts = (ele) => {
    while (ele) {
        ele.classList.remove('active');
        ele = ele.previousElementSibling;
    }

}

const handleMouseOut = (event) => {
    if (event.target && event.target.tagName == 'SPAN') {
        if (selectedRatting > 0) {
            startUpdates(currentIndex);
        } else {
            resetStarts(event.target);
        }

    }
}


const handleClick = (event) => {
    if (event.target && event.target.tagName == 'SPAN') {
        currentIndex = event.target;
        selectedRatting = event.target.getAttribute('data-index');
        startUpdates(currentIndex);
        ratting.innerText = selectedRatting;

    }
}



rattingContainer.addEventListener('mouseover', handleMouseOver);
rattingContainer.addEventListener('click', handleClick);
rattingContainer.addEventListener('mouseout', handleMouseOut);