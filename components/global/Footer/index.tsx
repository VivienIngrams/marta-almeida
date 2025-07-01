
import { FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="text-sm md:text-base 2xl:text-lg text-gray-700">
      <div className="p-4 md:p-12 text-left">
        <div className="flex items-center space-x-8 pt-2">
          <a
            href="https://www.instagram.com/m.f.almeida?igsh=b3pwM3FtajI5b2Q="
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="w-5 h-5 text-gray-700 hover:text-gray-900 transition-colors duration-200" />
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
