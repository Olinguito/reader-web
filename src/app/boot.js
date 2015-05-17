import {Backend, RemoteBackend, MemoryBackend} from 'lib/backend/backend';

const API_URL = '';

/**
 * Configures aurelia application(used by the framework)
 * @param {Aurelia} aurelia
 */
export function configure(aurelia) {
    var backend, di = aurelia.container;

    // Aurelia default modules
    aurelia.use
        .defaultBindingLanguage()
        .defaultResources()
        .router()
        .eventAggregator();

    // register default backend and configure it
    /* global DEV_MODE */
    if (typeof DEV_MODE !== 'undefined') {
        backend = di.invoke(MemoryBackend);
        // backend = di.invoke(RemoteBackend);
        // backend.config({baseUrl: 'http://localhost:3000/v1'});
    } else {
        backend = di.invoke(RemoteBackend);
        backend.config({baseUrl: API_URL});
    }
    di.registerInstance(Backend, backend);

    aurelia.start().then(a => a.setRoot('reader/app'));
}
