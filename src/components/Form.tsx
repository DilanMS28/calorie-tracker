import { categories } from "../data/categories"

export default function Form() {
    return (
        <form className="space-y-5 bg-white shadow p-10 rounded-lg">
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Categoria:</label>
                <select name="" id="category" className="border border-slate-300 p-2 rounded-lg w-full bg-white">
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="activity" className="font-bold">Actividad:</label>
                <input type="text" name="" id="activity" placeholder="Ej. Comida, Jugo de Naranja, Ensala, Ejercicio, Pesas, Bicicleta" className="border border-slate-300 p-2 rounded-lg"/>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold">Calorías:</label>
                <input type="number" name="" id="calories" placeholder="Calorias Ej. 300 o 500" className="border border-slate-300 p-2 rounded-lg"/>
            </div>

            <input type="submit" value="Guardar Comida o Guardar Ejercicio" className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white hover:cursor-pointer" />
        </form>
    )
}
