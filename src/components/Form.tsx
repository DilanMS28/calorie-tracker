import { useState, useEffect} from "react"
import { v4 as uuidv4 } from "uuid";
import type { ChangeEvent, FormEvent, Dispatch } from "react"
import { categories } from "../data/categories"
import type { Activity } from "../types"
import type { ActivityAction, ActivityState } from "../reducers/activity-reducer"

type formProps = {
    dispatch: Dispatch<ActivityAction>;
    state: ActivityState;
}

const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    name: "",
    calories: 0,
}

export default function Form({ dispatch, state }: formProps) {

    const [activity, setActivity] = useState<Activity>(initialState);

    useEffect( ()=>{
        if(state.activeId){
            const selectedActivity = state.activities.filter( stateActivity => stateActivity.id === state.activeId)[0];
            setActivity(selectedActivity);
        }
    }, [state.activeId])

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const isNumberField = ["category", "calories"].includes(event.target.id);
        setActivity({
            ...activity,
            [event.target.id]: isNumberField ? Number(event.target.value) : event.target.value
        })
    }

    function isValidActivity() {
        const { name, calories } = activity;
        return name.trim() != "" && calories > 0;
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        dispatch({ type: "save-activity", payload: { newActivity: activity } })

        setActivity({
            ...initialState,
            id: uuidv4()
        });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5 bg-white shadow p-10 rounded-lg">
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Categoria:</label>
                <select name="" id="category" value={activity.category} onChange={handleChange} className="border border-slate-300 p-2 rounded-lg w-full bg-white">
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold">Actividad:</label>
                <input type="text" name="" id="name" value={activity.name} onChange={handleChange} placeholder="Ej. Comida, Jugo de Naranja, Ensala, Ejercicio, Pesas, Bicicleta" className="border border-slate-300 p-2 rounded-lg" />
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold">Calorías:</label>
                <input type="number" name="" id="calories" value={activity.calories} onChange={handleChange} placeholder="Calorias Ej. 300 o 500" className="border border-slate-300 p-2 rounded-lg" />
            </div>

            <input disabled={!isValidActivity()} type="submit" value={activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"} className="disabled:opacity-10 bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white hover:cursor-pointer" />
        </form>
    )
}
