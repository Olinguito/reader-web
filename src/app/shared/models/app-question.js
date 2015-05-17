import {resource, property} from 'lib/backend/backend';

const level = {BEG: 0, MED: 1, PRO: 2};

@resource
class AppQuestion {
    @property title;
    @property content;
    @property answers;
    @property rightAnswer;
    @property level;

    get votes() {
        return this.upVotes - this.downVotes;
    }

    answer(answer) {
        // TODO send answer to backend
        return answer === 0 ? Promise.resolve() : Promise.reject();
    }
}
