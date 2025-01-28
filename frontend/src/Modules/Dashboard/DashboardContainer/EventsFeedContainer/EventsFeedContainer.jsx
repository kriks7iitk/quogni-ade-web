import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import './feed-container.theme.scss';
import EventList from './EventList';
import { eventAgentService } from '../../../../_services';
import { toast } from 'react-hot-toast';
import { throttle } from 'lodash';

const EventFeedsContext = createContext();

const EventFeedsProvider = ({ children }) => {
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [loadingNews, setLoadingNews] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchEventData(page);
  }, [page]);

  const fetchEventData = (page) => {
    if (page == 1) {
      setLoading(true);
    } else {
      setLoadingNews(true);
    }
    if (!hasMore) {
      return;
    }
    eventAgentService
      .getEvents(page)
      .then((data) => {
        if (data.length == 0) {
          setHasMore(false);
        }
        const filteredData = data?.events.filter(
          (item) =>
            item.stocks &&
            item.stocks.trim() !== '[]' &&
            item.stocks.trim() !== '',
        );
        setEventsData((prevState) => [...prevState, ...filteredData]);
        setLoadingNews(false);
        setLoading(false);
      })
      .catch((error) => {
        console.log('not able to fetch');

        toast.error(error?.error);
        setLoading(false);
        setLoadingNews(false);
      });
  };

  const handleScroll = useCallback(
    throttle((e) => {
      const container = e.target;
      if (
        container.scrollTop + container.clientHeight >=
          container.scrollHeight &&
        !loading &&
        !loadingNews &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    }, 300), // Adjust throttle interval as needed (300ms here)
    [loading, loadingNews, hasMore],
  );

  return (
    <EventFeedsContext.Provider
      value={{
        eventsData,
        setEventsData,
        loading,
        setLoading,
        page,
        setPage,
        loadingNews,
        setLoadingNews,
        hasMore,
        setHasMore,
        handleScroll,
      }}
    >
      {children}
    </EventFeedsContext.Provider>
  );
};

function EventsFeedContainerUI() {
  const { handleScroll } = useEventsFeeds();
  return (
    <div className="feed-container" onScroll={handleScroll}>
      <EventList></EventList>
    </div>
  );
}

export default function EventsFeedContainer() {
  return (
    <EventFeedsProvider>
      <EventsFeedContainerUI></EventsFeedContainerUI>
    </EventFeedsProvider>
  );
}

export const useEventsFeeds = () => {
  return useContext(EventFeedsContext);
};
