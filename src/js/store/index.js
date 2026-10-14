import Store from './store.js';
import actions from './action.js';
import mutations from './mutation.js';
import state, { storageKey, storageError } from './state.js';

const store = new Store({
    actions,
    mutations,
    state,
    persist(nextState) {
        // Do not overwrite saved data if it could not be read.
        if (storageError) throw new Error(storageError);
        localStorage.setItem(storageKey, JSON.stringify(nextState.items));
    }
});

export default store;
