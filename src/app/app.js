/**
 * App
 * main entry point
 */
export class App {

    configureRouter(config, router) {
        this.router = router;
        config.title = '';
        config.map([
            {route: 'interests', moduleId: 'reader/home/interests'},
            {route: 'home', moduleId: 'reader/home/home', nav: true},
            {route: 'profile', moduleId: 'reader/profile/profile', nav: true},
            {route: 'read/:id', moduleId: 'reader/read/read'},
            {route: 'read/:id/questions', moduleId: 'reader/read/reading-questions'},
            {route: 'questions/:id', moduleId: 'reader/read/question-answers'},
            {route: 'read/:id/suggestions', moduleId: 'reader/read/reading-suggestions'}
        ]);
    }
}
