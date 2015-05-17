import {resource, property} from 'lib/backend/decorators';

export const type = {READING: 0, SONG: 1, VIDEO: 2};

@resource
export class Suggestion {
    @property title;
    @property description;
    @property type = type.READING;
    @property link;
}
