import SignInButton from "./SignInButton";
import Dropdown from "./Dropdown";

const Navbar: React.FC = () => {
  const closeDropdown = () => {
    console.log('Dropdown closed');
  };

  return (
    <nav className="bg-gray-800 p-6">
      <div className="flex justify-between items-center">
        <Dropdown onClose={closeDropdown} />
        <div className="flex items-center">
          <SignInButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
