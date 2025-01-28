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
    <div className="feed-event-list" >
      {newsData.map((event, index) => {
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

          // Format the date and time
          const formattedDate = date.toLocaleDateString('en-GB', dateOptions); // 6 Jan 2024
          const formattedTime = date.toLocaleTimeString('en-GB', timeOptions); // 02:52

          // Combine date and time
          const finalFormattedDate = `${formattedDate}, ${formattedTime} UTC`;
          return (
            <EventInsightContainer
              key={index}
              industries={industriesArray}
              title={event?.title}
              source={event?.source}
              date={finalFormattedDate}
              sentiment={event?.sentiment}
              stocks={stockArray}
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
