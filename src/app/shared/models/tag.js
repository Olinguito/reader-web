import {resource, property} from 'lib/backend/backend';

@resource
class Tag {
    @property slug;
    @property name;
    @property icon;
}
