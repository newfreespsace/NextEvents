import { useRouter } from 'next/router';

import EventList from '@/components/events/event-list';
import ResultsTitle from '@/components/events/result-title';
import Button from '@/components/ui/button';
import ErrorAlert from '@/components/ui/error-alert';

async function getData() {
  const response = await fetch(
    'https://nextjs-course-bd5d1-default-rtdb.firebaseio.com/events.json'
  );
  const data = await response.json();
  return data;
}

function FilteredEventsPage(props) {
  const { data } = props;

  const router = useRouter();

  const filterData = router.query.slug;

  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  // const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });
  if (!data) {
    return <h1>Loading....</h1>;
  }
  const filteredEvents = data.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  console.log(filteredEvents);

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      <ResultsTitle date={date}></ResultsTitle>
      <EventList items={filteredEvents} />
    </>
  );
}

export default FilteredEventsPage;

export async function getServerSideProps() {
  const data = await getData();

  const AllEvents = [];
  for (let key in data) {
    AllEvents.push({ ...data[key], id: key });
  }

  return {
    props: {
      AllEvents,
    },
  };
}
