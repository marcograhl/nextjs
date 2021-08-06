import NewsItem from './NewsItem';

export default function NewsList({ news, title = '' }) {
  return (
    <section className="news-list">
      {title && <h2 className="news-list__title">{title}</h2>}
      {news.map((item) => (
        <NewsItem key={item.url} {...item} />
      ))}
    </section>
  );
}
