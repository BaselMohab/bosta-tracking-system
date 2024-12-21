import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

export default function Search() {

  const { t }  = useTranslation()
  const isMobile = useMediaQuery('(max-width:560px)');

  const [searchTerm, setSearchTerm] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = () => {
    if (searchTerm) {
      setSearchParams({ "trackingNumber": searchTerm });
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      <div className="flex flex-col items-center gap-5">
        <img 
          src="/track.png" 
          alt="Track" 
          className={isMobile ? "w-[150px]" : ""} 
        />
        <h2 className={`capitalize text-mainText font-bold ${isMobile ? 'text-xl' : 'text-3xl'}`}>
          {t('pages.track.search.title')}
        </h2>
        <h4 className={`capitalize text-mainText ${isMobile ? 'text-[15px]' : 'text-xl'}`}>
          {t('pages.track.search.subTitle')}
        </h4>
      </div>
      {!isMobile && (
        <div className="flex border rounded-lg overflow-hidden shadow-lg w-[454px]">
          <input
            type="number"
            className="p-2 flex-grow outline-none text-mainText dark:bg-mainText2"
            placeholder={t('pages.track.search.placeholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-searchBtn p-3" onClick={handleSubmit}>
            <img src="/search.png" alt="search" />
          </button>
        </div>
      )}
    </div>
  );
}