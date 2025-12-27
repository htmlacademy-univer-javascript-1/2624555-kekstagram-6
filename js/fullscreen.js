import { getUserPhotos } from './main.js';

const COMMENTS_PER_PAGE = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bigImgElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentsCountElement = bigPictureElement.querySelector('.comments-count');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const socialCommentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');

const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const avatarImg = document.createElement('img');
  avatarImg.classList.add('social__picture');
  avatarImg.src = comment.avatar;
  avatarImg.alt = comment.name;
  avatarImg.width = 35;
  avatarImg.height = 35;

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = comment.message;

  commentElement.appendChild(avatarImg);
  commentElement.appendChild(commentText);

  return commentElement;
};

const createCountSpan = (count) => {
  const span = document.createElement('span');
  span.className = 'comments-count';
  span.textContent = count;
  return span;
};

const updateCommentCounter = (shown, total) => {
  socialCommentCountElement.textContent = '';

  const shownText = document.createTextNode(`${shown} из `);
  const totalSpan = createCountSpan(total);
  const commentText = document.createTextNode(' комментариев');

  socialCommentCountElement.appendChild(shownText);
  socialCommentCountElement.appendChild(totalSpan);
  socialCommentCountElement.appendChild(commentText);
};

const renderFullscreenPhoto = (photoData) => {
  socialCommentCountElement.classList.remove('hidden');
  commentsLoaderElement.classList.remove('hidden');

  bigImgElement.src = photoData.url;
  bigImgElement.alt = photoData.description;
  likesCountElement.textContent = photoData.likes;
  commentsCountElement.textContent = photoData.comments.length;
  socialCaptionElement.textContent = photoData.description;

  socialCommentsElement.innerHTML = '';

  let shownComments = 0;

  const renderCommentsPage = () => {
    const commentsToShow = photoData.comments.slice(shownComments, shownComments + COMMENTS_PER_PAGE);
    commentsToShow.forEach((comment) => {
      const commentElement = createCommentElement(comment);
      socialCommentsElement.appendChild(commentElement);
    });

    shownComments += commentsToShow.length;
    updateCommentCounter(shownComments, photoData.comments.length);

    if (shownComments >= photoData.comments.length) {
      commentsLoaderElement.classList.add('hidden');
    }
  };

  renderCommentsPage();

  const onCommentsLoaderClick = () => {
    renderCommentsPage();
  };

  commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);

  bigPictureElement._commentsLoaderHandler = onCommentsLoaderClick;

  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closeFullscreenPhoto = () => {
  if (bigPictureElement._commentsLoaderHandler) {
    commentsLoaderElement.removeEventListener('click', bigPictureElement._commentsLoaderHandler);
    delete bigPictureElement._commentsLoaderHandler;
  }

  if (bigPictureElement._escapeHandler) {
    document.removeEventListener('keydown', bigPictureElement._escapeHandler);
    delete bigPictureElement._escapeHandler;
  }

  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onThumbnailClick = (photoData) => {
  renderFullscreenPhoto(photoData);
};

const initFullscreenView = () => {
  const picturesContainer = document.querySelector('.pictures');

  picturesContainer.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('.picture');
    if (thumbnail) {
      evt.preventDefault();
      const currentId = parseInt(thumbnail.dataset.id, 10);
      const currentData = getUserPhotos().find((item) => item.id === currentId);
      if (currentData) {
        onThumbnailClick(currentData);
      }
    }
  });

  closeButtonElement.addEventListener('click', () => {
    closeFullscreenPhoto();
  });

  const onDocumentKeydown = (evt) => {
    if (evt.key === 'Escape') {
      closeFullscreenPhoto();
    }
  };

  bigPictureElement._escapeHandler = onDocumentKeydown;
  document.addEventListener('keydown', onDocumentKeydown);
};

export { initFullscreenView };
