import { createContext, useReducer, type ReactNode } from "react";
import { activityReducer, initialState, type ActivityAction, type ActivityState } from "../../reducers/activity-reducer";

type ActivityProviderProps = {
    children: ReactNode;
}

type ActivityContextProps = {
    state: ActivityState;
    dispatch: React.Dispatch<ActivityAction>;
}

export const ActivityContext = createContext<ActivityContextProps>(null!);

export const ActivityProvicer = ({ children }: ActivityProviderProps) => {

    const [state, dispatch] = useReducer(activityReducer, initialState);

    return (
        <ActivityContext.Provider value={{ state, dispatch }}>
            {children}
        </ActivityContext.Provider>
    )
}