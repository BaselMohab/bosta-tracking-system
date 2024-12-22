import Navbar from '../Navbar/Navbar';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.body.dir = dir;
  }, [dir]);

  useEffect(() => {
    if (searchParams.get('lang') !== i18n.language) {
      const updatedParams = new URLSearchParams(searchParams.toString());
      updatedParams.set('lang', i18n.language);
      setSearchParams(updatedParams);
    }
  }, [i18n.language, searchParams]);
  

  return (
    <>
      <Navbar />
      <main className='flex justify-center items-center w-full px-4 md:px-8'>{children}</main>
    </>
  );
}