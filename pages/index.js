import EventList from '@/components/events/event-list';
import DateIcon from '@/components/icons/date-icon';

function HomePage(props) {
  const { FeaturedEvents, datenow } = props;

  return (
    <>
      <EventList items={FeaturedEvents} />
      <h1>{datenow}</h1>
    </>
  );
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

  const now = new Date();

  // 获取当前的年份、月份、日期、小时、分钟、秒钟
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 月份是从 0 开始计数的，所以要加 1
  const date = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const datenow = `当前页面构建时间：${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

  return {
    props: {
      FeaturedEvents,
      datenow,
    },
    revalidate: 1,
  };
}
