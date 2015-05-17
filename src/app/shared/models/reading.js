import {resource, property} from 'lib/backend/decorators';

@resource
export class Reading {
    @property question;
    @property title;
    @property content;
    @property author;
    @property related;
    @property userQuestions;
    @property tags;
    @property source;

    static getDaily() {
        // TODO get from backend
        return Promise.resolve([]);
    }
}
