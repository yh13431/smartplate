import React, { useState } from 'react';
import { IoIosAnalytics, IoIosRestaurant, IoIosHeartEmpty } from 'react-icons/io';
import Link from 'next/link';


interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  link: string;
}

const ServiceCard = ({ title, description, icon, link }: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  let IconComponent;

  const iconColor = isHovered ? 'text-blue-500' : 'text-black';

  switch (icon) {
    case 'analytics':
      IconComponent = (
        <IoIosAnalytics
          size={72}
          className={`mx-auto mb-4 ${iconColor} transition-all duration-200 ease-in-out`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      );
      break;
    case 'restaurant':
      IconComponent = (
        <IoIosRestaurant
          size={72}
          className={`mx-auto mb-4 ${iconColor} transition-all duration-200 ease-in-out`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      );
      break;
    case 'heart':
      IconComponent = (
        <IoIosHeartEmpty
          size={72}
          className={`mx-auto mb-4 ${iconColor} transition-all duration-200 ease-in-out`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      );
      break;
    default:
      IconComponent = null;
  }

  return (
    <div className="p-14 mb-40 max-w-sm bg-white shadow-md rounded-md text-center transition-transform duration-300 ease-in-out hover:-translate-y-2 shadow-lg">
      <Link href={link}>
        {IconComponent}
        <h2 className="text-lg font-bold mt-8">{title}</h2>
        <p className="text-gray-600 mt-4">{description}</p>
      </Link>
    </div>
  );
};

export default ServiceCard;

  