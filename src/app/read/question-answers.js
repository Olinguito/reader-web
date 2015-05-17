import {UserQuestion} from 'reader/shared/models';

class QuestionAnswers {

    question;
    answers = [];

    activate(params) {
        var {id} = params;
        return UserQuestion.get(id)
            .then(q=>this.question = q)
            .then(q=>this.answers = q.answers);
    }
}
