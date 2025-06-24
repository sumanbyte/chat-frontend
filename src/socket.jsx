import { createContext, useContext, useMemo } from "react";
import io from "socket.io-client";
import { server } from "./constants/config";


const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const socket = useMemo(() => io(server, { withCredentials: true }), []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => {
    return useContext(SocketContext);
}