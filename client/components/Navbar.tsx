import SignInButton from "./SignInButton";
import Dropdown from "./Dropdown";


const Navbar: React.FC = () => {
  const closeDropdown = () => {
    console.log('Dropdown closed');
  };

  return (
    <nav className="bg-gray-800 p-6 fixed w-full z-10">
      <div className="flex justify-between items-center">
        <div className="ml-12">
          <Dropdown onClose={closeDropdown}/>
        </div>
        <div className="flex items-center">
          <SignInButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
