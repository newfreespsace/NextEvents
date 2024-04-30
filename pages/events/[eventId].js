import EventLogistics from '@/components/event-detail/event-logistics';
import EventSummary from '@/components/event-detail/event-summary';
import EventContent from '@/components/event-detail/event-content';
import ErrorAlert from '@/components/ui/error-alert';

import { getFeaturedEvents, getEventById } from '@/helpers/api-util';

function EventDetailPage(props) {
  const event = props.selectedEvent;

  if (!event)
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
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

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);
  return {
    props: {
      selectedEvent: event,
    },
  };
}

export async function getStaticPaths() {
  const allEvents = await getFeaturedEvents();

  const paths = allEvents.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths,
    fallback: true,
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

export default EventDetailPage;
