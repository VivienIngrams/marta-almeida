'use client'

import { useLanguage } from './LanguageProvider'

const LanguageSwitcher = () => {
  const { language = 'pt', toggleLanguage } = useLanguage() || {
    language: 'pt',
    toggleLanguage: () => {},
  }

  return (
    <div>
      <button
        onClick={toggleLanguage}
        aria-label="Toggle Language"
        className="z-50 hover:scale-105 ease-in duration-600"
      >
        {language === 'en' ? (
          // Portuguese flag
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 36 36"
            width="30"
            height="22"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            className="iconify iconify--twemoji"
            preserveAspectRatio="xMidYMid meet"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fill="#060"
                d="M36 27a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v18z"
              ></path>
              <path
                fill="#D52B1E"
                d="M32 5H15v26h17a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4z"
              ></path>
              <path
                fill="#FFCC4D"
                d="M15 10a8 8 0 0 0-8 8a8 8 0 1 0 16 0a8 8 0 0 0-8-8zm-6.113 4.594l1.602 1.602l-2.46 1.23a6.95 6.95 0 0 1 .858-2.832zm-.858 3.979l4.4 2.207l-2.706 1.804l.014.021a6.963 6.963 0 0 1-1.708-4.032zM14 24.92a6.945 6.945 0 0 1-2.592-.92H14v.92zM14 23h-3.099L14 20.934V23zm0-3.268l-.607.405L9.118 18l2.116-1.058L14 19.707v.025zm0-1.439l-3.543-3.543l3.543.59v2.953zm0-3.992l-4.432-.713A6.983 6.983 0 0 1 14 11.08v3.221zm7.113.293a6.95 6.95 0 0 1 .858 2.833l-2.46-1.23l1.602-1.603zM16 11.08a6.987 6.987 0 0 1 4.432 2.508L16 14.301V11.08zm0 4.26l3.543-.591L16 18.293V15.34zm0 4.367l2.765-2.765L20.882 18l-4.274 2.137l-.608-.405v-.025zm0 5.213V24h2.592a6.945 6.945 0 0 1-2.592.92zM16 23v-2.066L19.099 23H16zm4.264-.395l.014-.021l-2.706-1.804l4.4-2.207a6.976 6.976 0 0 1-1.708 4.032z"
              ></path>
              <path fill="#D52B1E" d="M11 13v7a4 4 0 0 0 8 0v-7h-8z"></path>
              <path fill="#FFF" d="M12 14v6a3 3 0 0 0 6 0v-6h-6z"></path>
              <path fill="#829ACD" d="M13 17h4v2h-4z"></path>
              <path fill="#829ACD" d="M14 16h2v4h-2z"></path>
              <path
                fill="#039"
                d="M12 17h1v2h-1zm2 0h2v2h-2zm3 0h1v2h-1zm-3 3h2v2h-2zm0-6h2v2h-2z"
              ></path>
            </g>
          </svg>
        ) : (
          // British Flag
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
            width="40"
            height="18"
          >
            <clipPath id="t">
              <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
            </clipPath>
            <path d="M0,0 v30 h60 v-30 z" fill="#00247d" />
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
            <path
              d="M0,0 L60,30 M60,0 L0,30"
              clipPath="url(#t)"
              stroke="#cf142b"
              strokeWidth="4"
            />
            <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
            <path d="M30,0 v30 M0,15 h60" stroke="#cf142b" strokeWidth="6" />
          </svg>
        )}
      </button>
    </div>
  )
}

export default LanguageSwitcher
