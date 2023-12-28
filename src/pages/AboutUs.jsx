import { useTranslation } from "react-i18next";
import { IoCarSport } from "react-icons/io5";

export default function AboutUs() {

  const { t } = useTranslation()

  return(
    <section className="bg-secondary">
      <div className="hero min-h-[20rem]" style={{backgroundImage: 'url("/bg-2.jpg")'}}>
        <div className="hero-overlay bg-secondary bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold text-primary">{t("About Love Car")}</h1>
          </div>
        </div>
      </div>

      <div className="hero bg-secondary mt-8 h-[60rem] sm:h-full md:h-[52rem] xl:h-full">
        <div className="hero-content gap-20 flex-col lg:flex-row ">
          <img src="https://mylovecar1886.com/wp-content/uploads/2020/09/carparts-home-pic1.png" className="max-w-xs sm:max-w-xl rounded-lg" />
          <div className="flex flex-col justify-space-between items-start h-[29rem]">
            <span className="text-sm bg-primary p-3 rounded-full rounded-tl-none text-accent">{t("We are pleased to collaborate with you")}</span>
            <p className="py-6 text-5xl font-semibold text-accent leading-normal">{t("Our team is Saudi, specializing in the field of automobiles with expertise spanning over 20 years.")}</p>
            <ul className="h-full">
              <li className="flex justify-start items-center gap-4 text-accent text-base mt-4"><IoCarSport className="text-primary" /> {t("We specialize in auto body repair and painting")}</li>
              <li className="flex justify-start items-center gap-4 text-accent text-base mt-4"><IoCarSport className="text-primary" /> {t("We specialize in Automotive mechanics")}</li>
              <li className="flex justify-start items-center gap-4 text-accent text-base mt-4"><IoCarSport className="text-primary" /> {t("We specialize in Car electrical systems.")}</li>
            </ul>    
          </div>
        </div>
      </div>

      <div className="hero bg-secondary h-[60rem] sm:h-full md:h-[52rem] xl:h-full">
        <div className="hero-content gap-20 flex-col lg:flex-row-reverse">
          <img src="https://mylovecar1886.com/wp-content/uploads/2020/09/carparts-category-pic5.jpg" className="max-w-xs sm:max-w-xl rounded-lg mb-8" />
          <div>
            <h1 className="text-3xl text-accent">{t("We are delighted to fulfill your requests.")}</h1>
            <p className="py-6 text-accent">{t("We welcome orders for purchasing, renewing, and maintaining all types of vehicles. We are happy to serve you.")}</p>
          </div>
        </div>
      </div>
    </section>
  )
}