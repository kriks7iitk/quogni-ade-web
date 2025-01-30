import React , {useState, useEffect} from 'react';
import './feed-container.theme.scss';
import EventInsightContainer from './EventInsightContainer';
import newsData from '../../newsData.json';
import { eventAgentService } from '../../../../_services';
import { toast } from 'react-hot-toast';
import { useEventsFeeds } from './EventsFeedContainer';

export default function EventList() {

  const {eventsData, setEventsData, loading, setLoading, page, setPage, loadingNews, setLoadingNews, hasMore, setHasMore} = useEventsFeeds()

  // const [eventsData, setEventsData] = useState([])
  // const [loading, setLoading] = useState(false)
  // const [page, setPage] = useState(1)
  // const [loadingNews, setLoadingNews] = useState(false)
  // const [hasMore, setHasMore] = useState(true);

  
  

  return (
    <div className="feed-event-list">
      {eventsData.map((event, index) => {
        try {
          const formattedString = event?.industries?.replace(/'/g, '"');
          const stringStockList = event?.stocks?.replace(/'/g, '"');
          const stockArray = JSON.parse(stringStockList);
          const industriesArray = JSON.parse(formattedString);
          const date = new Date(event?.published_at);
          const dateOptions = {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          };
          const timeOptions = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          };

          const formattedDate = date.toLocaleDateString('en-GB', dateOptions);
          const formattedTime = date.toLocaleTimeString('en-GB', timeOptions);

          const finalFormattedDate = `${formattedDate}, ${formattedTime} UTC`;
          return (
            <EventInsightContainer
              key={index}
              id={event?.id}
              industries={industriesArray}
              title={event?.title}
              source={event?.source}
              date={finalFormattedDate}
              sentiment={event?.sentiment}
              stocks={stockArray}
              description={event?.description}
            ></EventInsightContainer>
          );
        } catch (error) {
          return;
        }
      })}
      {loadingNews && <p>Loading...</p>}
      {!hasMore && <p>No more events to load.</p>}
    </div>
  );
}
