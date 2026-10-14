import Component from '../library/component.js';
import store from '../store/index.js';
import { categories } from '../store/state.js';

export default class List extends Component {
    constructor() {
        super({ store, element: document.querySelector('.js-items') });
    }

    render() {
        const list = this.element;
        const bookmarks = store.state.items;
        list.replaceChildren();
        if (bookmarks.length === 0) {
            list.textContent = 'No bookmarks yet.';
            return;
        }

        // Group the bookmarks under category headings.
        categories.forEach(category => {
            const items = bookmarks.filter(bookmark => bookmark.category === category);
            if (items.length === 0) return;

            const heading = document.createElement('h3');
            heading.textContent = category;
            const group = document.createElement('ul');

            bookmarks.forEach((bookmark, index) => {
                if (bookmark.category !== category) return;
                const item = document.createElement('li');
                const link = document.createElement('a');
                link.textContent = bookmark.title;
                link.href = bookmark.url;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';

                const address = document.createElement('p');
                address.textContent = bookmark.url;

                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.addEventListener('click', () => {
                    location.hash = 'edit/' + index;
                });

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => {
                    store.dispatch('clearItem', { index });
                });

                item.append(link, address, editButton, deleteButton);
                group.append(item);
            });
            list.append(heading, group);
        });
    }
}
