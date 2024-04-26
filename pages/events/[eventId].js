import { useRouter } from 'next/router';
import { getEventById } from '@/dummy-data';
import EventLogistics from '@/components/event-detail/event-logistics';
import EventSummary from '@/components/event-detail/event-summary';
import EventContent from '@/components/event-detail/event-content';
import ErrorAlert from '@/components/ui/error-alert';

function EventDetailPage() {
  const { eventId } = useRouter().query;
  const event = getEventById(eventId);

  if (!event)
    return (
      <ErrorAlert>
        <p>there is no event!</p>;
      </ErrorAlert>
    );

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}
export default EventDetailPage;
