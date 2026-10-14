// Shared store: actions commit mutations, then publish state changes.
import PubSub from "../library/pubsub.js";

export default class Store {
    constructor(params) {
        let self = this;
        self.actions ={};
        self.mutations ={};
        self.state={}
        self.status = 'resting';
        self.persist = params.persist || (() => {});
        self.events = new PubSub();

        if(params.hasOwnProperty("actions")) {
            self.actions=params.actions
        }

        if(params.hasOwnProperty("mutations")) {
            self.mutations=params.mutations
        }

        self.state = new Proxy((params.state || {}),{
            set: function(state, key, value){

                state[key]=value;

                self.events.publish('stateChange',self.state);

                if(self.status !== 'mutation'){
                    console.log("mutated")
                }

                self.status = 'resting'

                return true

            }

        })



    }

    dispatch(actionKey, payload){

        let self = this;

        if(typeof self.actions[actionKey] !== "function"){
            return false
        }

        self.status = "action";

        return self.actions[actionKey](self, payload);

    }

    commit(mutationKey, payload){

        let self = this;

        if(typeof self.mutations[mutationKey] !== "function"){
            return false
        }

        self.status = "mutation";

        let newState = self.mutations[mutationKey](self.state,payload);

        try {
            self.persist(newState);
        } catch (error) {
            self.status = 'resting';
            self.events.publish('storageError', error);
            return false;
        }

        self.state = Object.assign(self.state, newState);

        return true;

    }
}
// can just copy and paste this file to future project