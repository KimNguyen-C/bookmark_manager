import Component from '../library/component.js';
import store from '../store/index.js';
import { validURL } from '../store/state.js';

export default class BookmarkForm extends Component {
    constructor() {
        super({ store, element: document.querySelector('#bookmark-form') });
        this.editIndex = null;
        this.title = document.querySelector('#title');
        this.url = document.querySelector('#url');
        this.category = document.querySelector('#category');

        this.element.addEventListener('submit', event => this.save(event));
        this.title.addEventListener('input', () => this.title.setCustomValidity(''));
        this.url.addEventListener('input', () => this.url.setCustomValidity(''));
    }

    // Routing calls this when opening the add or edit view.
    open(index = null) {
        this.editIndex = index;
        this.element.reset();
        this.title.setCustomValidity('');
        this.url.setCustomValidity('');
        document.querySelector('#form-heading').textContent =
            index === null ? 'Add Bookmark' : 'Edit Bookmark';

        if (index !== null) {
            const bookmark = store.state.items[index];
            this.title.value = bookmark.title;
            this.url.value = bookmark.url;
            this.category.value = bookmark.category;
        }
    }

    save(event) {
        event.preventDefault();
        const title = this.title.value.trim();
        const url = this.url.value.trim();
        this.title.setCustomValidity(title ? '' : 'Please enter a title.');
        this.url.setCustomValidity(validURL(url) ? '' : 'Use an http:// or https:// URL.');
        if (!this.element.reportValidity()) return;

        const bookmark = { title, url, category: this.category.value };
        const saved = this.editIndex === null
            ? store.dispatch('addItem', bookmark)
            : store.dispatch('updateItem', { index: this.editIndex, bookmark });

        if (saved) location.hash = 'all';
    }
}
