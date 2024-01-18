import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { Result } from '@/types/types';
import ReactLoading from 'react-loading';


export default function Calculate() {
    const { data: session } = useSession();
    const [ingredients, setIngredients] = useState('');
    const [result, setResult] = useState<Result | null>(null);
    const [loading, setLoading] = useState(false); 


    const handleCalculate = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/get_nutrients', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                query: ingredients,
              }),
            });
      
            if (response.ok) {
              const data = await response.json();
              setResult(data);
            } else {
              const errorData = await response.text();
              console.error(`Error: ${errorData}`);            
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const capitalizeFirstLetter = (string:string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
      

    return (
        <div className={`min-h-screen flex items-center justify-center bg-gray-100 relative ${loading ? 'opacity-20' : ''}`}>
            {loading && (
                <div className="loading-overlay absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <ReactLoading type="spin" color="#000" height={50} width={50} />
                </div>
            )}
            <div className="mb-8 text-center">
                <h1 className="text-4xl text-gray-900 font-bold mt-20 mb-6">Nutrition Calculator</h1>
                <h1 className="text-gray-600 max-w-md mb-2">Enter your ingredients or recipes along with their serving sizes and press "Calculate" to get the macronutrient breakdown!</h1>
                <h3 className="text-gray-600 max-w-md"> e.g. "1 apple, 1 cup of grapes" </h3>
                <textarea
                    aria-label="Enter recipe ingredients"
                    className="border border-gray-300 p-10 rounded-md w-full resize-y mt-2"
                    rows={5}
                    placeholder="Ingredients/Recipes"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                />
                <button
                     className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 transition-transform duration-300 ease-in-out transform hover:scale-110 mt-4 ${
                        !session ? 'cursor-not-allowed opacity-50' : ''
                      }`}
                      onClick={session ? handleCalculate : undefined}
                      disabled={!session || loading}
                    >
                      {loading ? 'Calculating...' : session ? 'Calculate' : 'Log In to Calculate'}
                </button>
            </div>
            <div className="text-center mt-8">
            {result && (
                <>
                <h3 className="text-xl font-bold mb-2">Individual Macros</h3>
                <table className="table-auto mx-28">
                    <thead>
                        <tr>
                        <th className="px-4 py-2">Item</th>
                        <th className="px-4 py-2">Servings</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result?.foods.map((food, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{capitalizeFirstLetter(food.food_name)}</td>
                            <td className="border px-4 py-2">{food.servings}</td>
                            {food.macronutrients && (
                            <>
                                <td className="border px-4 py-2">{food.macronutrients.protein}</td>
                                <td className="border px-4 py-2">{food.macronutrients.carbohydrates}</td>
                                <td className="border px-4 py-2">{food.macronutrients.fat}</td>
                            </>
                            )}
                        </tr>
                        ))}
                    </tbody>
                </table>
                <h3 className="text-xl font-bold mb-2 mt-8">Total Macros</h3>
                <table className="table-auto mx-auto">
                    <thead>
                        <tr>
                        <th className="px-4 py-2">Macro</th>
                        <th className="px-4 py-2">Total (g)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result?.totals && (
                        <>
                            <tr>
                            <td className="border px-4 py-2">Calories</td>
                            <td className="border px-4 py-2">{result.totals.total_calories}</td>
                            </tr>
                            <tr>
                            <td className="border px-4 py-2">Carbohydrates (g)</td>
                            <td className="border px-4 py-2">{result.totals.total_carbohydrates}</td>
                            </tr>
                            <tr>
                            <td className="border px-4 py-2">Fats (g)</td>
                            <td className="border px-4 py-2">{result.totals.total_fats}</td>
                            </tr>
                            <tr>
                            <td className="border px-4 py-2">Protein (g)</td>
                            <td className="border px-4 py-2">{result.totals.total_protein}</td>
                            </tr>
                        </>
                        )}
                    </tbody>
                  </table>
                </>
              )}
            </div>
        </div>
    )
}