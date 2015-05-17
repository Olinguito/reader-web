import {Reading} from 'reader/shared/models';

export class Home {

    activate() {
        return Reading.getDaily().then(rr=>this.readings = rr);
    }
}
