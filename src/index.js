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
const spinner = document.querySelector('.spinner')


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
       loadMoreBtn.hide()
    });
}

// async function fetchHits() {
//     loadMoreBtn.disable()
//     try {
//         const awaitFetch = await newsApiService.fetchArticles();
//         const appendHits = await awaitFetch.appendHitsMarkup(hits);
//         loadMoreBtn.enable();
//         scrollOn();
//        return appendHits
//     } catch {
//         Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
//        loadMoreBtn.hide()
//     };
// }


function appendHitsMarkup(hits) {
    renderGallary(hits);
    // if (newsApiService.perPage * newsApiService.page > awaitFetch.data.totalHits) {
    //     loadMoreBtn.classList.add("is-hidden");
    //     Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
    // }
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







       









    
