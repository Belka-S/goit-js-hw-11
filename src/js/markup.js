import { photoApiService, refs } from './api-service';
import { createGallery } from './on-action';
import { notifySearchEnd } from './notify';
import imageMarkup from '../templates/gallery.hbs';
import controlsMarkup from '../templates/controls.hbs';

export function renderControlsMarkup() {
  const bodyEl = document.querySelector('script');
  bodyEl.insertAdjacentHTML('beforebegin', controlsMarkup());
}

// Render Gallery Markup
export function renderGalleryMarkup(data) {
  const galleryMarkup = data.reduce((acc, el) => acc + imageMarkup(el), '');
  refs.galleryDiv.innerHTML = galleryMarkup;
}

// Create LoadMore Button
export function renderLoadMoreBtn() {
  if (refs.loadMoreBtn) {
    return;
  }
  const btnMarkup = '<button class="more" type="button" >Load more</button>';
  refs.galleryDiv.insertAdjacentHTML('afterend', btnMarkup);
  refs.loadMoreBtn = document.querySelector('button.more');
  refs.loadMoreBtn.addEventListener('click', createGallery);
}

// Remove LoadMore Button
export function removeLoadMoreBtn() {
  refs.loadMoreBtn.remove();
  refs.loadMoreBtn.removeEventListener('click', createGallery);
  refs.loadMoreBtn = null;

  const { page, normalData, searchOptions } = photoApiService;
  normalData.length !== page * searchOptions.perPage && notifySearchEnd();
}
