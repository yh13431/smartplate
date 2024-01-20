import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { Result } from '@/types/types';
import ReactLoading from 'react-loading';
import Image from 'next/image';


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
      <div className={`min-h-screen flex items-center justify-center bg-gray-600 ${loading ? 'opacity-20' : ''}`}>
        {loading && (
            <div className="loading-overlay w-full h-full flex items-center justify-center absolute top-0 left-0">
                <ReactLoading type="spin" color="#000" height={50} width={50} />
            </div>
        )}
        <div className="flex-shrink-0" style={{ flexBasis: '50%', minWidth: '50%' }}>
            <Image
                src="/calculate.jpg"
                alt="Background Image"
                layout="fixed"
                width={900}
                height={800}
                objectFit="cover"
            />
        </div>
        <div className='flex-grow grid grid-rows-auto p-8'>
            <div className="text-center">
                <h1 className="text-7xl font-bold mb-8 text-gray-100">What's In My Food?</h1>
                <h3 className="text-2xl mb-4 text-gray-100">1. Enter an ingredient or a recipe along with its serving size.</h3>
                <h3 className="text-2xl mb-8 text-gray-100">2. Press 'Calculate' to get the nutritional breakdown!</h3>
                <textarea
                    aria-label="Enter recipe/ingredients"
                    className="border border-gray-700 p-3 rounded-md w-full bg-gray-100 text-center leading-8"
                    rows={6}
                    placeholder={`You can also add multiple items at one go! \n For instance, "2 apples, 1 cup of grapes and 1 Big Mac".`}
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
            <div className='flex-grow grid grid-rows-auto p-8'>
                <div className="text-center m-8 mt-0">
                    <table className="min-w-full bg-gray-200 border border-gray-300 divide-y divide-gray-300 text-xl">
                        <thead className="bg-gray-300">
                            <tr>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nutrient</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            </tr>
                        </thead>
                            <tbody className='bg-white divide-y divide-gray-200'>
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
                        </div>
                    </div>
                </div>
            );
        }