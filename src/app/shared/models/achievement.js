import {resource, property} from 'lib/backend/backend';

@resource
class Achievement {
    @property name;
    @property description;
    @property expPoints;
}
