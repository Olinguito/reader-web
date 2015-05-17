import {resource, property} from 'lib/backend/backend';

@resource
class Reading {
    @property question;
    @property title;
    @property content;
    @property author;
    @property related;
    @property userQuestions;
    @property tags;
    @property source;
}
