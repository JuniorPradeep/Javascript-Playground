const apiKey = 'APIKEY'
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photosArray = [];
const count = 5;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
let totalImages = 0;
let loadedImages = 0;
let ready = false;


//const SECRET_KEY = '2-lfV2Ap6sox4Su070DRw9FuC05X4-4PhjnhnmBEqbA'
//const APP_ID = 681249

//Helper function
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function imageLoaded() {
    loadedImages += 1
    console.log(loadedImages);
    if (loadedImages === totalImages) {
        ready = true;
        loadedImages = 0;
        count = 30;
    }
}
//create Elements for photos
function displayPhotos() {
    const fragement = document.createDocumentFragment();
    totalImages = photosArray.length;
    photosArray.forEach(photo => {
        //create anchor element to link to unspash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        img.addEventListener('load', imageLoaded);
        item.appendChild(img);
        fragement.appendChild(item);
    });
    imageContainer.appendChild(fragement);

}



//Get photos from unsplash api 
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos()
    } catch (err) {
        console.log(err);
    }
}

window.addEventListener('scroll', (e) => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready === true) {
        ready = false;
        getPhotos();
    }
});

getPhotos();