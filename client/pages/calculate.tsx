import { useSession } from 'next-auth/react';


export default function Calculate() {
    const { data: session } = useSession();

    const handleCalculate = () => {
        console.log('Calculating');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="p-8 bg-white shadow-md rounded-md mb-8 text-center">
                <h1 className="text-4xl text-gray-600 font-bold mb-6">Nutrition Calculator</h1>
                <p className="text-gray-600">Enter your ingredients or recipes and press "Calculate" to get the relevant macros!</p>
            </div>
            <div className="text-center mb-48">
                <h1 className="text-2xl text-gray-600 font-bold mt-12 mb-4">Enter Ingredients/Recipes</h1>
                <input
                    type="text"
                    className="border border-gray-300 p-2 rounded-md w-full"
                    placeholder="Enter ingredients/recipes..."
                />
                <button
                     className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 transition-transform duration-300 ease-in-out transform hover:scale-110 mt-4 ${
                        !session ? 'cursor-not-allowed opacity-50' : ''
                      }`}
                      onClick={session ? handleCalculate : undefined}
                      disabled={!session}
                    >
                      {session ? 'Calculate' : 'Log In to Calculate'}
                </button>
            </div>
        </div>
    )
}