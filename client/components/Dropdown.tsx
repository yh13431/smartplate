import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaBars } from 'react-icons/fa';

interface DropdownProps {
  onClose: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      onClose();
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

    return (
        <div className="relative" ref={dropdownRef}>
        <button
            onClick={toggleDropdown}
            className={`text-white focus:outline-none transition-transform duration-300 ease-in-out ${
              isOpen ? 'transform rotate-180' : ''
            }`}
        >
            <FaBars className="text-white cursor-pointer" size={24} />
        </button>
        {isOpen && (
            <div className="absolute mt-4 shadow-md bg-gray-800 p-6 rounded shadow w-32 rounded-xl transition-opacity duration-300 ease-in-out" style={{ opacity: isOpen ? 1 : 0 }}>
            <Link href="/" onClick={() => { onClose(); setIsOpen(false); }} className="text-white text-20px block mb-12 text-center transition-colors duration-300 hover:text-blue-500">
                Home
            </Link>
            <Link href="/calculate" onClick={() => { onClose(); setIsOpen(false); }} className="text-white text-20px block mb-12 text-center transition-colors duration-300 hover:text-blue-500">
                Nutrition Calculator
            </Link>
            <Link href="/recommend" onClick={() => { onClose(); setIsOpen(false); }} className="text-white text-20px block mb-12 text-center transition-colors duration-300 hover:text-blue-500">
                Recommend A Recipe
            </Link>
            <Link href="/recipes" onClick={() => { onClose(); setIsOpen(false); }} className="text-white text-20px block text-center transition-colors duration-300 hover:text-blue-500">
                Saved Recipes
            </Link>
            </div>
        )}
        </div>
    );
};

export default Dropdown;