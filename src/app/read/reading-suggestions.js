import {Suggestion} from 'reader/shared/models';

export class ReadingSuggestions {

    suggestions = [];

    activate(params) {
        var {id} = params;
        return Suggestion.find({reading: id})
            .then(ss=>this.suggestions = ss);
    }
}
