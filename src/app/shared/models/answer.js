import {resource, property} from 'lib/backend/decorators';

@resource
export class Answer {
    @property author;
    @property content;
    @property question;
    @property downVotes;
    @property upVotes;
    @property date;

    get votes() {
        return this.upVotes - this.downVotes;
    }
}
