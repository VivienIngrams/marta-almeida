import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="mt-16 pt-10 text-sm text-neutral-700">
      <div className="px-6 py-6 space-y-2 text-left">
        <p>
          <a href="mailto:marta.f.almeida@hotmail.com" className="underline text-blue-700">
            marta.f.almeida@hotmail.com
          </a>
        </p>
        <div className="flex space-x-4 pt-2">
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
            <Image src="/icons/instagram.svg" width={24} height={24} alt="Instagram" className="w-5 h-5" />
          </a>
          <a href="https://youtu.be/jYKvZex9AfE" target="_blank" rel="noopener noreferrer">
            <Image src="/icons/youtube.svg" width={24} height={24} alt="YouTube" className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
