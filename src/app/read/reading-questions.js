import {UserQuestion} from 'reader/shared/models';

export class ReadingQuestions {
    questions = [];

    activate(params) {
        var {id} = params;
        UserQuestion.find({reading: id})
            .then(qq=>this.questions = qq);
    }
}
