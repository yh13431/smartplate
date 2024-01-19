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


    return (
      <div className={`min-h-screen flex flex-col items-center justify-center bg-gray-600 relative ${loading ? 'opacity-20' : ''}`} style={{ backgroundImage: "url('calculate.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {loading && (
            <div className="loading-overlay w-full h-full flex items-center justify-center absolute top-0 left-0 z-50">
                <ReactLoading type="spin" color="#000" height={50} width={50} />
            </div>
        )}
        <div className="text-center mt-12">
            <h1 className="text-7xl font-bold mb-8 text-gray-100">Nutrition Calculator</h1>
            <textarea
                aria-label="Enter recipe ingredients"
                className="border border-gray-700 p-10 rounded-md w-full resize-y bg-gray-200"
                rows={5}
                placeholder="Enter your ingredients or recipes along with their serving sizes."
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
                    <div className='overflow-x-auto'>
                        <table className="min-w-full bg-gray-200 border border-gray-300 divide-y divide-gray-300 text-xl">
                        <thead className="bg-gray-300">
                            <tr>
                            <th className="px-6 py-3 text-center font-semibold">Nutrient</th>
                            <th className="px-6 py-3 text-center font-semibold">Amount</th>
                            </tr>
                        </thead>
                            <tbody className='bg-gray-100'>
                                {result?.totals && (
                                    <>
                                        <tr>
                                            <td className="border px-6 py-3">Calories</td>
                                            <td className="border px-6 py-3">{result.totals.total_calories}</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-6 py-3">Carbohydrates (g)</td>
                                            <td className="border px-6 py-3">{result.totals.total_carbohydrates}</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-6 py-3">Fats (g)</td>
                                            <td className="border px-6 py-3">{result.totals.total_fats}</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-6 py-3">Protein (g)</td>
                                            <td className="border px-6 py-3">{result.totals.total_protein}</td>
                                        </tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    </div>
  );
}