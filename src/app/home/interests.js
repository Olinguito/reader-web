import {Tag} from 'reader/shared/models';

export class Interests {
    tags = [];

    activate() {
        return Tag.find().then(tt => this.tags = tt);
    }
}
