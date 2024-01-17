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
            className="text-white focus:outline-none transition-transform duration-300 ease-in-out transform hover:scale-110"
        >
            <FaBars className="text-white cursor-pointer" size={24} />
        </button>
        {isOpen && (
            <div className="absolute mt-2 bg-gray-800 p-4 rounded shadow w-56 transition-all duration-300 ease-in-out">
            <Link href="/" onClick={() => { onClose(); setIsOpen(false); }} className="text-white block mb-2 text-center transition-colors duration-300 hover:text-blue-500">
                Home
            </Link>
            <Link href="/instructions" onClick={() => { onClose(); setIsOpen(false); }} className="text-white block mb-2 text-center transition-colors duration-300 hover:text-blue-500">
                How to Use
            </Link>
            <Link href="/calculate" onClick={() => { onClose(); setIsOpen(false); }} className="text-white block mb-2 text-center transition-colors duration-300 hover:text-blue-500">
                Calculate Macros
            </Link>
            <Link href="/recommend" onClick={() => { onClose(); setIsOpen(false); }} className="text-white block mb-2 text-center transition-colors duration-300 hover:text-blue-500">
                Recommend a Recipe
            </Link>
            <Link href="/recipes" onClick={() => { onClose(); setIsOpen(false); }} className="text-white block mb-2 text-center transition-colors duration-300 hover:text-blue-500">
                Saved Recipes
            </Link>
            </div>
        )}
        </div>
    );
};

export default Dropdown;