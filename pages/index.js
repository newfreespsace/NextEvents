import EventList from '@/components/events/event-list';

function HomePage(props) {
  const { FeaturedEvents } = props;

  return <EventList items={FeaturedEvents} />;
}

export default HomePage;

export async function getStaticProps() {
  const response = await fetch(
    'https://nextjs-course-bd5d1-default-rtdb.firebaseio.com/events.json'
  );
  const data = await response.json();

  const FeaturedEvents = [];
  for (let key in data) {
    if (data[key].isFeatured) {
      FeaturedEvents.push({ ...data[key], id: key });
    }
  }
  return {
    props: {
      FeaturedEvents,
    },
    revalidate: 10,
  };
}
