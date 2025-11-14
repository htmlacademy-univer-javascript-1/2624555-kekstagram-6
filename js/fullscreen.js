import { userPhotos } from './main.js';

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

const renderFullscreenPhoto = (photoData) => {
  const bigPicture = document.querySelector('.big-picture');
  const bigImg = bigPicture.querySelector('.big-picture__img img');
  const likesCount = bigPicture.querySelector('.likes-count');
  const commentsCount = bigPicture.querySelector('.comments-count');
  const socialComments = bigPicture.querySelector('.social__comments');
  const socialCaption = bigPicture.querySelector('.social__caption');
  const socialCommentCount = bigPicture.querySelector('.social__comment-count');
  const commentsLoader = bigPicture.querySelector('.comments-loader');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  bigImg.src = photoData.url;
  bigImg.alt = photoData.description;
  likesCount.textContent = photoData.likes;
  commentsCount.textContent = photoData.comments.length;
  socialCaption.textContent = photoData.description;

  socialComments.innerHTML = '';

  photoData.comments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    socialComments.appendChild(commentElement);
  });

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closeFullscreenPhoto = () => {
  const bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onThumbnailClick = (photoData) => {
  renderFullscreenPhoto(photoData);
};

const initFullscreenView = () => {
  const thumbnails = document.querySelectorAll('.picture');
  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', (evt) => {
      evt.preventDefault();
      const photoData = userPhotos[index];
      onThumbnailClick(photoData);
    });
  });

  const closeButton = document.querySelector('.big-picture__cancel');
  closeButton.addEventListener('click', () => {
    closeFullscreenPhoto();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeFullscreenPhoto();
    }
  });
};

export { initFullscreenView };
