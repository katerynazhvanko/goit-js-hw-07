import { galleryItems } from "./gallery-items.js";
// Change code below this line
const galleryList = document.querySelector(".gallery");

const galleryOfImages = createGalleryOfImagesMarkup(galleryItems);

galleryList.insertAdjacentHTML("beforeend", galleryOfImages);
galleryList.addEventListener("click", onGalleryListClick);

function createGalleryOfImagesMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>`;
    })
    .join("");
}

function onGalleryListClick(event) {
  event.preventDefault();
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }
  const originalImage = event.target.dataset.source;

  const instance = basicLightbox.create(`<img src="${originalImage}">`, {
    onShow: () => window.addEventListener("keydown", onCloseEsc),
    onClose: () => window.removeEventListener("keydown", onCloseEsc),
  });

  const onCloseEsc = (evnt) => {
    if (evnt.code === "Escape") {
      instance.close();
    }
  };

  instance.show();
}

console.log(galleryItems);
