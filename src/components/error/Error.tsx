import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
export default function ErrorComponent() {
  const { t } = useTranslation();
  return (
    <article >
      <h1>{t('pages.error.header')}</h1>
      <p>{t('pages.error.message')}</p>
      <Link to={'/'}>{t('pages.error.cta')}</Link>
    </article>
  );
}
