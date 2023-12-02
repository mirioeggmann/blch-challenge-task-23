import { Default } from 'components/layouts/Default';
import EventCreation from '../src/components/templates/eventCreation/EventCreation';

const EventCreationPage = () => {
    return (
        <Default pageName="Create Event">
            <EventCreation></EventCreation>
        </Default>
    );
};

export default EventCreationPage;
