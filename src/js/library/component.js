// Components render again whenever the store publishes a state change.
export default class Component {
    constructor({ store, element }) {
        this.element = element;
        store.events.subscribe('stateChange', () => this.render());
    }

    render() {}
}
