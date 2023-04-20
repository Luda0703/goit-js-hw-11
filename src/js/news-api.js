

export default class NewsApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.per_page = 40;

    }

    fetchArticles() {
        console.log(this)
        const KEY = "35573875-4d45445cc9cc07d3b69f02897";
        const BASE_URL = 'https://pixabay.com/api/';
        const URL = `${BASE_URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.per_page}`;
        return fetch(URL)
        .then(response => response.json())
        .then(({ hits }) => {
            
            this.incrementPage();
            return hits;
        });
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}