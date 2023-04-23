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
const title = document.querySelector('.counter');
const subTitle = document.querySelector('.totelPages');


const newsApiService = new NewsApiService();

const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});


searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchHits);

// const updateUi = (data, per_page) => {
//     title.textContent = `Всього знайдено ${data?.totalHits} карток`;

//     subTitle.textContent = `Знайдено новин на ${Math.ceil(data?.totalHits / per_page)} сторінках`

// }

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
        // updateUi(data, per_page)
        loadMoreBtn.enable();
        scrollOn() 
    }).catch(() => {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
       loadMoreBtn.hide()
    });
   
}


// async function fetchHits() {
//     loadMoreBtn.disable()
//     newsApiService.incrementPage()
    
//     try {
//         const awaitFetch = await newsApiService.fetchArticles().appendHitsMarkup(awaitFetch.data.hits);
//         if (newsApiService.per_page * newsApiService.page > awaitFetch.data.totalHits) {
//             loadMoreBtn.classList.add("is-hidden");
//             Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
//         }
//         loadMoreBtn.enable();
//         scrollOn();
       
//     } catch {
//         Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
//        loadMoreBtn.hide()
//     };
// }


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







       









    
