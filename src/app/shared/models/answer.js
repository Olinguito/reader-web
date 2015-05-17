import {resource, property} from 'lib/backend/backend';

@resource
class Answer {
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
