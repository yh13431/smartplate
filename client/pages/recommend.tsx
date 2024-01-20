import React, { useState } from 'react';
import ReactLoading from 'react-loading';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Recommend() {
  const [ recipes, setRecipes ] = useState<any[]>([]);
  const [calories, setCalories] = useState<string>('');
  const [protein, setProtein] = useState<string>('');
  const [fat, setFat] = useState<string>('');
  const [loading, setLoading] = useState(false); 
  const { data: session } = useSession();


  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          calories: parseFloat(calories),
          protein: parseFloat(protein),
          fat: parseFloat(fat)
        })
      });

      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Fetched recipes:', data.recipes);
      setRecipes(data.recipes || []);
    } catch (error) {
        console.error('Fetch error:', error);
        setRecipes([]);
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
        <div className="flex-shrink-0" style={{ flexBasis: '800px', minWidth: '500px' }}>
            <Image
                src="/recommend.jpg"
                alt="Background Image"
                layout="fixed"
                width={1000}
                height={800}
                objectFit="cover"
            />
        </div>
      <div className='flex-grow grid grid-rows-auto p-40 mb-50'>
        <div className="text-center">
            <h1 className="text-7xl font-bold mb-8 text-gray-100">Need Recipe Ideas?</h1>
            <h3 className="text-2xl mb-8 text-gray-100">Enter your target macros and search away!</h3>
            <div className='mb-4'>
              <input
                type="number"
                min="1"
                className="mt-1 p-2 border rounded-md w-full md:w-80 bg-gray-100"
                value={calories}
                placeholder='Calories (kcal)'
                onChange={e => setCalories(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <input
                type="number"
                min="1"
                className="mt-1 p-2 border rounded-md w-full md:w-80 bg-gray-100"
                value={protein}
                placeholder='Protein (g)'
                onChange={e => setProtein(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <input
                type="number"
                min="1"
                className="mt-1 p-2 border rounded-md w-full md:w-80 bg-gray-100"
                value={fat}
                placeholder='Fat (g)'
                onChange={e => setFat(e.target.value)}
              />
            </div>
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 transition-transform duration-300 ease-in-out transform hover:scale-110 mt-4 mb-4 ${
                !session ? 'cursor-not-allowed opacity-50' : ''
              }`}
                onClick={session ? handleSearch : undefined}
                disabled={!session || loading}
            >
              {loading ? 'Searching...' : session ? 'Search' : 'Log In to Search'}
            </button>
          </div>
          <div className="text-center m-8 flex-grow">
              <table className="min-w-full bg-gray-200 border border-gray-300 divide-y divide-gray-300 text-xl">
                <thead className="bg-gray-300">
                  <tr>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Recipe</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Calories</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Protein</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Fat</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recipes && Array.isArray(recipes) &&
                    recipes.map((recipe, index) => (
                      <tr key={index} className="text-gray-800">
                        <td className="px-8 py-4">{recipe.title}</td>
                        <td className="px-8 py-4">{recipe.calories}</td>
                        <td className="px-8 py-4">{recipe.protein}</td>
                        <td className="px-8 py-4">{recipe.fat}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    )
  }