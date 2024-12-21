import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import error from '../../../public/error.gif'
export default function ErrorComponent() {
  const { t } = useTranslation();
  return (
    <article className='flex flex-col gap-5 justify-center items-start'>
      <h1>{t('pages.error.header')}</h1>
      <img src={error} alt="Error" />
      <p>{t('pages.error.message')}</p>
      <Link to={'/'} className="bg-searchBtn text-white py-2 px-4 rounded-md">{t('pages.error.cta')}</Link>
    </article>
  );
}
