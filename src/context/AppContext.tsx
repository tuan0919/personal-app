import React, { createContext, useContext, ReactNode, useReducer } from "react";

interface Notification {
  id: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
}

interface AppState {
  notifications: Notification[];
  isLoading: boolean;
  settings: {
    showDeliveredCustomers: boolean;
    defaultPageSize: number;
  };
}

type AppAction =
  | { type: "ADD_NOTIFICATION"; payload: Notification }
  | { type: "REMOVE_NOTIFICATION"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "UPDATE_SETTINGS"; payload: Partial<AppState["settings"]> };

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: string) => void;
  setLoading: (isLoading: boolean) => void;
  updateSettings: (settings: Partial<AppState["settings"]>) => void;
}

const initialState: AppState = {
  notifications: [],
  isLoading: false,
  settings: {
    showDeliveredCustomers: true,
    defaultPageSize: 10,
  },
};

const AppContext = createContext<AppContextType | undefined>(undefined);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case "REMOVE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload
        ),
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "UPDATE_SETTINGS":
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload,
        },
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Helper functions
  const addNotification = (message: string, type: Notification["type"]) => {
    const id = Date.now().toString();
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: { id, message, type },
    });

    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id: string) => {
    dispatch({ type: "REMOVE_NOTIFICATION", payload: id });
  };

  const setLoading = (isLoading: boolean) => {
    dispatch({ type: "SET_LOADING", payload: isLoading });
  };

  const updateSettings = (settings: Partial<AppState["settings"]>) => {
    dispatch({ type: "UPDATE_SETTINGS", payload: settings });
  };

  const value = {
    state,
    dispatch,
    addNotification,
    removeNotification,
    setLoading,
    updateSettings,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }

  return context;
}
