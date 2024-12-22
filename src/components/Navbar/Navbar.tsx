import { Link } from "react-router"
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { useMediaQuery } from '@mui/material';
import { useSearchParams } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language.split('-')[0].toLowerCase();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useMediaQuery('(max-width:560px)');
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.toString());


  const changeLanguage = (language: string) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set('lang', language);
    setSearchParams(updatedParams);
    i18n.changeLanguage(language);
  };
  

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearch = () => {
    if (searchTerm) {
      setSearchParams({ "trackingNumber": searchTerm });
      setIsSearchModalOpen(false);
      setSearchTerm("");
    }
  };

  return (
    <>
      <div className={`flex ${isMobile ? 'py-4 px-5 justify-between shadow-xl' : 'py-10 px-16 justify-around'} mb-16`}>
        <div>
          <Link
            to="https://bosta.co"
            className="logo"

          >
            <img
              className={`logo ${isMobile ? 'w-20' : ''}`}
              src={`/logo/${currentLanguage}.svg`}
              alt="Bosta"
            />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {isMobile && (
            <IoSearch 
              size={24} 
              className="text-mainText cursor-pointer" 
              onClick={() => setIsSearchModalOpen(true)}
            />
          )}
          <div className="relative">
            <button
              className="font-bold text-mainText flex items-center gap-2"
              onClick={toggleDropdown}
            >
              {currentLanguage === 'en' ? 'English' : 'عربي'}
              <IoIosArrowDown 
                className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                size={14}
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 bg-background border-langBorder shadow-lg rounded-md overflow-hidden">
                <button
                  className="w-full px-4 py-2 text-left"
                  onClick={() => {
                    changeLanguage('en-US');
                    setIsDropdownOpen(false);
                  }}
                >
                  English
                </button>
                <button
                  className="w-full px-4 py-2 text-left"
                  onClick={() => {
                    changeLanguage('ar');
                    setIsDropdownOpen(false);
                  }}
                >
                    عربي
                </button>
              </div>
            )}
          </div>
          <ThemeToggle />
        </div>
      </div>

      {isSearchModalOpen && isMobile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-black">{t('pages.track.search.title')}</h3>
              <IoMdClose 
                className="cursor-pointer text-black" 
                size={24} 
                onClick={() => setIsSearchModalOpen(false)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <input
                type="number"
                className="p-2 border rounded-lg w-full outline-none text-black"
                placeholder={t('pages.track.search.placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button 
                className="bg-searchBtn text-white py-2 px-4 rounded-lg capitalize"
                onClick={handleSearch}
              >
                {t('pages.searchBtn')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
