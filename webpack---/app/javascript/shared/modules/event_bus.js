import Vue from 'vue/dist/vue.runtime.esm';

class EventBus {
    constructor() {
        this.initialize();
    }

    initialize() {
        if (typeof Dribbble.EventBus === 'undefined') {
            Dribbble.EventBus = new Vue();
        }
        return Dribbble.EventBus;
    }
}

export default new EventBus();