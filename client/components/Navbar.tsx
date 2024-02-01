import SignInButton from "./SignInButton";
import Dropdown from "./Dropdown";
import { signIn, signOut, useSession } from 'next-auth/react';


const Navbar: React.FC = () => {
  const closeDropdown = () => {
    console.log('Dropdown closed');
  };

  const { data: session } = useSession();


  return (
    <nav className="bg-gray-800 p-6 fixed w-full z-10">
      <div className="flex justify-between items-center">
        <div className="ml-12">
          <Dropdown onClose={closeDropdown}/>
        </div>
        <div className="flex items-center">
          <h2 className="text-white mr-10">
            {session?.user?.name}
          </h2>
          <SignInButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
