import axios from 'axios';
import Notiflix from 'notiflix';




KEY = "35573875-4d45445cc9cc07d3b69f02897";
BASE_URL = "https://pixabay.com/api/";
URL = `${BASE_URL}?key=${KEY}&q={inputText}&image_type="photo"&orientation="horizontal"&safesearch="true"`;



const form = document.querySelector('#search-form');
const input = document.querySelector('[text]');
const btn = document.querySelector('[submit]');
const gallery = document.querySelector('.gallery');



function createGalleryItemsMarkup(galleryItems) {
    
    return galleryItems
    .map(({ largeImageURL, tags }) => {
        return `
        <div class="gallery">
        <img src="${largeImageURL}" alt="${tags}" loading="lazy" />
        </div>`
    })
    .join(' ');
    
}

function galleryItemIcon(galleryItems) {
    console.log(galleryItems)
    return galleryItems.map(
        ({ webformatURL, tags, likes, views, comments, downloads }) =>
          ` <div class="photo-card">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>${likes}</b>
            </p>
            <p class="info-item">
              <b>${views}</b>
            </p>
            <p class="info-item">
              <b>${comments}</b>
            </p>
            <p class="info-item">
              <b>${downloads}</b>
            </p>
          </div>
        </div>`
      );
}

function insertContent(gallery) {
    if (gallery.length === 1) {
        resetMarkup(input);
        form.innerHTML = galleryItemIcon(gallery);
    } else {
        resetMarkup(form);
        input.innerHTML = createGalleryItemsMarkup(gallery);
    }
  };

const getPosts = async () => {
    onSubmitForm()
    try {
        console.log(response.data)
        const response = await axios.get(URL);
        if (data.length > 10) {
            Notiflix.Notify.info(
              'Too many matches found. Please enter a more specific name'
            );
            return;
            }
            
        insertContent(response.data);
       

    } catch {
        resetMarkup(text);
        resetMarkup(form);
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    }
}

form.addEventListener('submit', getPosts);

const onSubmitForm = (e) => {
    e.preventDefault();
    let inputText = e.currentTarget.text.value.trim();
    if(!inputText) {
        resetMarkup(text);
        resetMarkup(form);
        return;
    }
}

function resetMarkup(el) {
    el.innerHTML = '';
  }








    
