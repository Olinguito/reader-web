/**
 * App
 * main entry point
 */
export class App {

    configureRouter(config, router) {
        this.router = router;
        config.title = '';
        config.map([
            {route: '', moduleId: 'reader/home/interests'},
            {route: 'home', moduleId: 'reader/home/home', nav: true},
            {route: 'profile', moduleId: 'reader/profile/profile', nav: true},
            {route: 'read', moduleId: 'reader/read/read'}
        ]);
    }
}
