import { createContext, useContext, useEffect, useState } from "react";
// import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children, agentUrl }) => {
  const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const newSocket = io(agentUrl);
//     setSocket(newSocket);

//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
