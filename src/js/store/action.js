export default {
    addItem(context, payload) {
        return context.commit('addItem', payload);
    },

    clearItem(context, payload) {
        return context.commit('clearItem', payload);
    },

    updateItem(context, payload) {
        return context.commit('updateItem', payload);
    }
};
