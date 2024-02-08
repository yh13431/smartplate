import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import ReactLoading from 'react-loading';


interface Recipe {
  calories: number;
  fat: number;
  protein: number;
  title: string;
}


export default function Saved() {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const { data: session, status } = useSession()
  const userId = session?.user?.email
  const [loading, setLoading] = useState(true);
  const [deletingRecipe, setDeletingRecipe] = useState<Recipe | null>(null);


  useEffect(() => {
      fetch(`http://localhost:5000/get-all-user-ids`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log('Fetched all userIds from the database:', data);

          if (Array.isArray(data.userIds)) {
            console.log('Checking userId:', userId);
            if (data.userIds.includes(userId)) {
              console.log('UserId found in the database.');
              fetch(`http://localhost:5000/get-user-recipes?userId=${userId}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              })
                .then(response => response.json())
                .then(data => {
                  if (Array.isArray(data.recipes)) {
                    const recipes = data.recipes.filter((recipe: Recipe | string) => typeof recipe === 'object');
                    setSavedRecipes(recipes);
                  } else {
                    console.error('Invalid format for recipes:', data.recipes);
                  }
                })
                .catch(error => {
                  console.error('Error fetching user recipes:', error);
                })
                .finally(() => {
                  setLoading(false);
                });
            } else {
              console.error('UserId not found in the database.');
              setLoading(false);
            }
        } else {
          console.error('Invalid format for userIds:', data.userIds);
          setLoading(false);
        }
      })
      .catch((error) => {
      console.error('Error fetching all user ids:', error);
      setLoading(false);
      }) 
    }, [userId]);


  const handleDelete = async (recipe: Recipe) => {
    try {
      setDeletingRecipe(recipe);
      setLoading(true);
      const response = await fetch('http://localhost:5000/delete-recipe', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          recipe: recipe,
        })
      });

      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }

      setSavedRecipes((prevRecipes) => prevRecipes.filter((r) => r !== recipe));
  
      const data = await response.json();
      console.log('Deleted recipe');
    } catch (error) {
        console.error('Delete error:', error);
    } finally {
      setDeletingRecipe(null);
      setLoading(false);
    }
  };
  
  
  return (
    <div className={`min-h-screen flex items-center justify-center bg-cover bg-center relative`} style={{ backgroundImage: 'url("/recipes.jpg")' }}>
      {loading && (
        <div className="loading-overlay w-full h-full flex items-center justify-center absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50">
          <ReactLoading type="spin" color="#fff" height={50} width={50} />
        </div>
      )}
        <div className="p-8 bg-white shadow-md rounded-md w-full max-w-4xl mt-20">
          <h1 className="text-5xl text-gray-600 font-bold mb-8 text-center">My Recipes</h1>
            {savedRecipes.length > 0 ? (
              <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-200 border border-gray-300 divide-y divide-gray-300">
                <thead className="bg-gray-300">
                  <tr>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Recipe</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Calories (kCal)</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Protein (g)</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Fat (g)</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Delete Recipe</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {savedRecipes.map((recipe, index) => (
                    <tr key={index} className="text-gray-800">
                      <td className="px-6 py-4 text-center">{recipe.title}</td>
                      <td className="px-6 py-4 text-center">{recipe.calories}</td>
                      <td className="px-6 py-4 text-center">{recipe.protein}</td>
                      <td className="px-6 py-4 text-center">{recipe.fat}</td>
                      <td className="px-6 py-4 text-center">
                        <button
                          className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 transition-transform duration-300 ease-in-out transform hover:scale-110 mt-4 mb-4 ${!session ? 'cursor-not-allowed opacity-50' : ''}`}
                            onClick={() => handleDelete(recipe)}
                            disabled={!session || loading}
                        >
                          {deletingRecipe === recipe
                            ? 'Deleting...'
                            : session
                            ? 'Delete'
                            : 'Log In to Delete'}
                          </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            ) : (
              <p className="text-gray-600 text-center">
              {!session
                ? 'Log in to start saving your recipes.'
                : savedRecipes.length === 0
                ? 'No recipes saved.'
                : 'My Saved Recipes'}
            </p>
            )}
          </div>
        </div>
    )
}