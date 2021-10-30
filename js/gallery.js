import galleryItems from './gallery-items.js';
const refs = {
  galleryRef: document.querySelector('.js-gallery'),
  lightboxRef: document.querySelector('.js-lightbox'),
  lightboxImageRef: document.querySelector('.lightbox__image-js'),
  overlayRef: document.querySelector('.lightbox__overlay'),
  closeModalBtnRef: document.querySelector('.lightbox__button-js'),
};

refs.galleryRef.addEventListener('click', openModalHandler);
refs.closeModalBtnRef.addEventListener('click', closeModalHandler);
refs.overlayRef.addEventListener('click', closeOverlayModal);

const markup = galleryItems
  .map(
    item => `<li class="gallery__item">
       <a href="${item.original}" class="gallery__link">
       <img  class="gallery__image"
       src="${item.preview}"
       data-source="${item.original}"
       alt="${item.description}">
       </a>
       </li>`,
  )
  .join('');

refs.galleryRef.insertAdjacentHTML('beforeend', markup);

let currentImageUrl = null;

let index = 0;
function findIndex() {
  index = galleryItems
    .map(item => item.original)
    .indexOf(refs.lightboxImageRef.src);
}

function openModalHandler(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    console.log('ne tyyyda!!!');
    return;
  }
  refs.lightboxRef.classList.add('is-open');
  currentImageUrl = event.target.dataset.source;

  refs.lightboxImageRef.src = currentImageUrl;

  document.addEventListener('keyup', changeImage);
}

function closeModalHandler() {
  refs.lightboxRef.classList.remove('is-open');
  document.removeEventListener('keyup', changeImage);
}

function closeOverlayModal() {
  closeModalHandler();
}
function changeImage({ key }) {
  findIndex();
  if (key !== 'ArrowLeft' && key !== 'ArrowRight' && key !== 'Escape') return;

  if (key === 'ArrowLeft') {
    if (index === 0) {
      index = galleryItems.length - 1;
    } else {
      index = index - 1;
    }
  }
  if (key === 'ArrowRight') {
    if (index === galleryItems.length - 1) {
      index = 0;
    } else {
      index = index + 1;
    }
  }
  if (key === 'Escape') {
    closeModalHandler();
  }
  refs.lightboxImageRef.src = galleryItems[index].original;
  refs.lightboxImageRef.alt = galleryItems[index].description;
}
