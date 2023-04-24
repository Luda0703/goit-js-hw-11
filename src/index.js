
import Notiflix from 'notiflix';
import "./css/styles.css"
import NewsApiService from "./js/news-api";
import {renderGallary} from "./js/gallery";
import LoadMoreBtn from "./js/load-more-btn";


const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const spinner = document.querySelector('.spinner')

const newsApiService = new NewsApiService();

const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});


searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

loadMoreBtn.hide()

async function onSearch (e) {
    e.preventDefault();
    newsApiService.query = e.currentTarget.searchQuery.value.trim();
    newsApiService.resetPage();
    clearGalleryContainer();
    try {
        const awaitFetch = await newsApiService.fetchArticles()
        console.log(awaitFetch.data);
        console.log(awaitFetch.data.hits);
        console.log(awaitFetch.data.totalHits);
        renderGallary(awaitFetch.data.hits);

        if (!newsApiService.query) {
            Notiflix.Notify.info('Fill the form for searching')
            return
          }

        if (awaitFetch.data.totalHits === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            loadMoreBtn.hide();
              return;
          }
          Notiflix.Notify.info(`Hooray! We found ${awaitFetch.data.totalHits} images.`)
         renderGallary(awaitFetch.data.hits);
         loadMoreBtn.show();

        if (newsApiService.per_page * newsApiService.page > awaitFetch.data.totalHits) {
            loadMoreBtn.hide();
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
            
        }
       
    } catch (error) {
        console.log(error.message);
    };
    
    
}

async function onLoadMore() {
    
    newsApiService.incrementPage()
    
    try {
        const awaitFetch = await newsApiService.fetchArticles()
        renderGallary(awaitFetch.data.hits);
        scrollOn();

        if (newsApiService.per_page * newsApiService.page > awaitFetch.data.totalHits) {
            loadMoreBtn.hide();
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
        }
       
    } catch (error) {
        console.log(error.message);
    };
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



// const title = document.querySelector('.counter');
// const subTitle = document.querySelector('.totelPages');
// function fetchHits() {
//     loadMoreBtn.disable();
    
//     newsApiService.fetchArticles().then(hits => {
//         appendHitsMarkup(hits);
//         // updateUi(data, per_page)
//         loadMoreBtn.enable();
//         scrollOn() 
//     }).catch(() => {
//         Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
//        loadMoreBtn.hide()
//     });
   
// }

// function appendHitsMarkup(hits) {  
//     renderGallary(hits);
// }

// const updateUi = (data, per_page) => {
//     title.textContent = `Всього знайдено ${data?.totalHits} карток`;

//     subTitle.textContent = `Знайдено новин на ${Math.ceil(data?.totalHits / per_page)} сторінках`

// }







       









    
