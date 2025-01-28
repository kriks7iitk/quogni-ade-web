import React, { createContext, useContext, useState, useEffect } from 'react';
import './feed-container.theme.scss';
import EventList from './EventList';
import { eventAgentService } from '../../../../_services';
import { toast } from 'react-hot-toast';

const EventFeedsContext = createContext();

const EventFeedsProvider = ({ children }) => {
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [loadingNews, setLoadingNews] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchEventData(page);
  }, [page])

  const fetchEventData = (page) => {

    if(page==1){
      setLoading(true);
    }
    else{
      setLoadingNews(true);
    }
    if(!hasMore){
      return;
    }
    eventAgentService.getEvents(page)
      .then((data) => {

        if(data.length==0){
          setHasMore(false);
        }
        setEventsData(data)
        setLoadingNews(false)
        setLoading(false);
      })
      .catch((error) => {
        console.log("not able to fetch");
        
        toast.error(error?.error);
        setLoading(false)
        setLoadingNews(false)
      })
  }

  const handleScroll = (e) => {
    console.log("helo helo");
    
    
    const container = e.target;
    console.log("container is");
    console.log(loading);
    
    
    
    
    if (
      container.scrollTop + container.clientHeight >= container.scrollHeight 
      && !loading && !loadingNews 
      // &&
      // hasMore
    ) {
      console.log("asdada");
      
      setPage((prev) => prev + 1); 
    }
  };

  return (
    <EventFeedsContext.Provider value={{ eventsData, setEventsData, loading, setLoading, page, setPage, loadingNews, setLoadingNews, hasMore, setHasMore,handleScroll }}>
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
  )
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
