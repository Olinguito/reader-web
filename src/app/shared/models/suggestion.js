import {resource, property} from 'lib/backend/backend';

export const type = {READING: 0, SONG: 1, VIDEO: 2};

@resource
class Suggestion {
    @property title;
    @property description;
    @property type = type.READING;
    @property link;
}
