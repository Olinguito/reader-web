import {resource, property} from 'lib/backend/backend';

@resource
class UserQuestion {
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
