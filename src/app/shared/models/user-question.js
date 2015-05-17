import {resource, property} from 'lib/backend/decorators';

@resource
export class UserQuestion {
    @property reading;
    @property author;
    @property title;
    @property content;
    @property answers;
    @property downVotes;
    @property upVotes;
    @property date;

    get votes() {
        return this.upVotes - this.downVotes;
    }
}
