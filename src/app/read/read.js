import {Reading} from 'reader/shared/models';

export class Read {
    
    reading;
    paragraphs = [];

    activate(params) {
        var {id} = params;
        return Reading.get(id)
            .then(r=>this.reading = r)
            .then(r=>this.paragraphs = r.content.split(/\n+/));
    }
}
