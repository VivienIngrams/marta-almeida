
import { ChevronDownIcon } from '@sanity/icons';
import { FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="text-sm lg:text-base  backdrop-blur lg:backdrop-blur-none">
      <div className="p-4 lg:px-12 text-left">
        <div className="flex items-center space-x-8 pt-2">
          <a
            href="https://www.instagram.com/m.f.almeida?igsh=b3pwM3FtajI5b2Q="
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="w-5 h-5 hover:text-gray-700 transition-colors duration-200" />
          </a>
          <p>
            <a href="mailto:marta.f.almeida@hotmail.com" className="">
              marta.f.almeida@hotmail.com
            </a>
          </p>
          
        </div>
      </div>
    </footer>
  );
}
