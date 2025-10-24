import { generatePhotos } from './generation.js';
import { renderThumbnails } from './thumbnail.js';

const userPhotos = generatePhotos();
const picturesContainer = document.querySelector('.pictures');
renderThumbnails(userPhotos, picturesContainer);

export { userPhotos };

userPhotos();

