import { useRouter } from 'next/router';
import EventLogistics from '@/components/event-detail/event-logistics';
import EventSummary from '@/components/event-detail/event-summary';
import EventContent from '@/components/event-detail/event-content';
import ErrorAlert from '@/components/ui/error-alert';

async function getData() {
  const response = await fetch(
    'https://nextjs-course-bd5d1-default-rtdb.firebaseio.com/events.json'
  );
  const data = await response.json();
  return data;
}

function EventDetailPage(props) {
  const { eventId } = useRouter().query;
  const { AllEvents } = props;

  const event = AllEvents.find((event) => event.id === eventId);

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

export async function getStaticProps() {
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

export async function getStaticPaths() {
  const data = await getData();

  const eventIds = [];
  for (let key in data) {
    eventIds.push(key);
  }

  return {
    paths: eventIds.map((id) => ({ params: { eventId: id } })),
    fallback: 'blocking',
    /*
    fallback: blocking （首选）
        当请求到一个尚未生成的页面时，Next.js将在第一次请求中对该页面进行服务器渲染。
        以后的请求将从缓存中提供静态文件。
    fallback: true
        当向一个尚未生成的页面发出请求时，Next.js将在第一次请求时立即提供一个具有加载状态的静态页面。
        当数据加载完毕后，页面将以新的数据重新渲染并被缓存。未来的请求将从缓存中提供静态文件。    
    */
  };
}
