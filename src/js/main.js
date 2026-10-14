import store from './store/index.js';
import { storageError } from './store/state.js';
import List from './component/list.js';
import Status from './component/status.js';
import BookmarkForm from './component/form.js';

const list = new List();
const status = new Status();
const form = new BookmarkForm();
const message = document.querySelector('#message');

message.textContent = storageError;
store.events.subscribe('storageError', () => {
    message.textContent = 'Could not save. Check your browser storage and try again.';
});
store.events.subscribe('stateChange', () => {
    message.textContent = '';
});

// Only swap the two containers, never reload the document.
function showView() {
    const hash = location.hash;
    const editRoute = hash.match(/^#edit\/(\d+)$/);
    let editIndex = editRoute ? Number(editRoute[1]) : null;
    if (editIndex !== null && !store.state.items[editIndex]) editIndex = null;
    const showForm = hash === '#add' || editIndex !== null;

    if (!showForm && hash !== '#all') history.replaceState(null, '', '#all');
    document.querySelector('#all-view').hidden = showForm;
    document.querySelector('#add-view').hidden = !showForm;
    document.querySelector('#all-link').classList.toggle('active', !showForm);
    document.querySelector('#add-link').classList.toggle('active', showForm);
    if (showForm) form.open(editIndex);
}

list.render();
status.render();
window.addEventListener('hashchange', showView);
showView();
