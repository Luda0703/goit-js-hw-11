// import axios from 'axios';
import Notiflix from 'notiflix';
import "./css/styles.css"
import NewsApiService from "./js/news-api";
import {renderGallary} from "./js/gallery";
import LoadMoreBtn from "./js/load-more-btn";


const searchForm = document.querySelector('#search-form');
const input = document.querySelector('[text]');
const btn = document.querySelector('[submit]');
const gallery = document.querySelector('.gallery');


const newsApiService = new NewsApiService();

const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});


searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchHits);

function onSearch (e) {
    e.preventDefault();
    
    newsApiService.resetPage();
    newsApiService.query = e.currentTarget.searchQuery.value.trim();

    loadMoreBtn.show();

    
    clearGalleryContainer();
    fetchHits();
    
}

function fetchHits() {
    loadMoreBtn.disable();
    newsApiService.fetchArticles().then(hits => {
        appendHitsMarkup(hits);
        loadMoreBtn.enable();
        scrollOn()
        
    }).catch(() => {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    });
}

function appendHitsMarkup(hits) {
    renderGallary(hits);
}

function clearGalleryContainer() {
    gallery.innerHTML = '';
}

function scrollOn() {
   const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
}







       









    
