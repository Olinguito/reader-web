import {resource, property} from 'lib/backend/backend';

@resource
export class Reader {
    @property level;
    @property exp;
    @property readings;
    @property tags;
    @property followers;
    @property following;
    @property achievements;
}
