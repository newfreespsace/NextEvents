import { useRouter } from 'next/router';

import EventList from '@/components/events/event-list';
import EventsSearch from '@/components/events/event-search';

function AllEventsPage(props) {
  const router = useRouter();
  const { events } = props;

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

export async function getStaticProps() {
  console.log('页面重新构建中...');
  const response = await fetch(
    'https://nextjs-course-bd5d1-default-rtdb.firebaseio.com/events.json'
  );
  const data = await response.json();

  const AllEvents = [];
  for (let key in data) {
    AllEvents.push({ ...data[key], id: key });
  }
  return {
    props: {
      events: AllEvents,
    },
  };
}
