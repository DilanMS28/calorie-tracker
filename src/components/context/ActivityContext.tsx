import { createContext, useMemo, useReducer, type ReactNode } from "react";
import { activityReducer, initialState, type ActivityAction, type ActivityState } from "../../reducers/activity-reducer";

type ActivityProviderProps = {
    children: ReactNode;
}

type ActivityContextProps = {
    state: ActivityState;
    dispatch: React.Dispatch<ActivityAction>;
    caloriesConsumed: number;
    caloriesBurned: number;
    netCalories: number;
}

export const ActivityContext = createContext<ActivityContextProps>(null!);

export const ActivityProvicer = ({ children }: ActivityProviderProps) => {

    const [state, dispatch] = useReducer(activityReducer, initialState);

    //contadores
    const caloriesConsumed = useMemo(() => state.activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [state.activities])
    const caloriesBurned = useMemo(() => state.activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [state.activities])
    const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [state.activities])

    return (
        <ActivityContext.Provider value={{ state, dispatch, caloriesConsumed, caloriesBurned, netCalories }}>
            {children}
        </ActivityContext.Provider>
    )
}