import Component from '../library/component.js';
import store from '../store/index.js';

export default class Status extends Component {
    constructor() {
        super({ store, element: document.querySelector('.js-status') });
    }

    render() {
        const total = store.state.items.length;
        this.element.textContent = `Total: ${total} bookmark${total === 1 ? '' : 's'}`;
    }
}
