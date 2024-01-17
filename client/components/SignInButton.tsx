import { signIn, signOut, useSession } from 'next-auth/react';

const SignInButton: React.FC = () => {
  const { data: session } = useSession();

  return (
    <div>
      {!session ? (
        <button
          onClick={() => signIn('google')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 transition-transform duration-300 ease-in-out transform hover:scale-110"
        >
          Sign In with Google
        </button>
      ) : (
        <button
          onClick={() => signOut()}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 transition-transform duration-300 ease-in-out transform hover:scale-110"
        >
          Sign Out
        </button>
      )}
    </div>
  );
};

export default SignInButton;