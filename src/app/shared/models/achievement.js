import {resource, property} from 'lib/backend/decorators';

@resource
export class Achievement {
    @property name;
    @property description;
    @property expPoints;
}
