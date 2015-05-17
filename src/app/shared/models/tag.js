import {resource, property} from 'lib/backend/decorators';

@resource
export class Tag {
    @property slug;
    @property name;
    @property icon;
}
