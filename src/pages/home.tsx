/* eslint-disable react-hooks/rules-of-hooks */
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export default function main() {

  const { t } = useTranslation();


  return (
    <article className="flex flex-col gap-5 justify-center items-start  md:w-[50%] mx-auto mt-[1rem] md:mt-[10rem]">
      <h1 className="text-mainText text-2xl md:text-4xl font-bold">
      {t("pages.home.title")}
      </h1>
      <h2 className="text-subText text-xl md:text-2xl font-bold">
      {t("pages.home.subTitle")}      </h2>
      <Link to="/shippments" className="bg-searchBtn text-white py-2 px-4 rounded-md">
      {t("pages.home.cta")}
      </Link>
      <div>
      </div>
    </article>
  )
}

