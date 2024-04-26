import { useRouter } from 'next/router';

import { getAllEvents } from '@/dummy-data';
import EventList from '@/components/events/event-list';
import EventsSearch from '@/components/events/event-search';

function AllEventsPage() {
  const router = useRouter();
  const events = getAllEvents();

  function findEventHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <>
      <EventsSearch onSearch={findEventHandler} />
      <EventList items={events} />
    </>
  );
}
export default AllEventsPage;
