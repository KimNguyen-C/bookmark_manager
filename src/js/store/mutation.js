// Return a new array so the store can save it before updating the screen.

// keep code from lecture

export default {
    addItem(state, payload) {
        return { items: [...state.items, payload] };
    },

    clearItem(state, payload) {
        return { items: state.items.filter((item, index) => index !== payload.index) };
    },

    updateItem(state, payload) {
        return {
            items: state.items.map((item, index) =>
                index === payload.index ? payload.bookmark : item)
        };
    }
};
