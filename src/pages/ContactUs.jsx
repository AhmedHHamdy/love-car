import { IoCarSport } from "react-icons/io5"
import { FaMapLocationDot } from "react-icons/fa6";
import { FaBuilding } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import { MdOutlineNumbers } from "react-icons/md";
import { IoPhonePortrait } from "react-icons/io5";
import { MdAttachEmail } from "react-icons/md";

export default function ContactUs() {
  return(
    <section className="bg-secondary">
      <div className="hero min-h-[20rem]" style={{backgroundImage: 'url(https://mylovecar.zauzat.org/uploads/banners/170118139710J1SSzorykPoljJnn3pJAJdXTgD5yutRaVw8dwbvHxsR.jpg)'}}>
        <div className="hero-overlay bg-secondary bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold text-primary">Contact Us</h1>
          </div>
        </div>
      </div>

      <div className="hero bg-secondary mt-8 h-screen">
        <div className="hero-content flex-col md:flex-col xl:flex-row h-screen pb-10 md:0 gap-8">
          <div className="flex flex-col justify-space-between items-start h-[40rem]">

            <p className="py-6 text-5xl font-semibold text-accent">Do you have any inquiries?</p>
            <span className="text-primary text-xl flex justify-center items-center gap-4"><FaMapLocationDot /> Address</span>
            <h3 className="text-xl mt-2 border-b-[0.02rem] border-gray-700  w-full md:w-full pb-6">
              Kingdom of Saudi Arabia <br />
              Eastern Province, Al-Qatif/Saihat
            </h3>

            <span className="text-base md:text-xl flex justify-center mt-2 items-center pt-6 gap-4"><FaBuilding className="text-primary" /> Building Number: 4955</span>

            <span className="text-base md:text-xl flex justify-center mt-2 items-center gap-4"><MdMarkEmailUnread className="text-primary" /> Postal Code: 32461</span>

            <span className="text-base md:text-xl flex justify-start mt-2 items-center pb-6 border-b-[0.02rem] border-gray-700 w-full sm:w-full gap-4"><MdOutlineNumbers className="text-primary" /> Additional Number: 8688</span>

            <h3 className="text-base md:text-xl flex justify-center mt-2 items-center gap-4 pt-6"><IoPhonePortrait className="text-primary" /> 0500947921</h3>

            <h3 className="text-base md:text-xl flex justify-center mt-2 items-center gap-4"><MdAttachEmail className="text-primary" /> mylovecar1886@gmail.com</h3>
            
          </div>
          
          <div className="relative flex flex-col justify-space-between items-start w-[18rem] sm:w-[35rem] md:w-[40rem] h-[30rem]">
            <iframe className="absolute top-0 left-0 w-full h-full" style={{ "frameBorder":"0", "style":"border:0", "allowFullScreen":"", "ariaHidden":"false", "tabIndex":"0" }}
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7141.809346494834!2d50.031933!3d26.491014000000003!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49ffa222916bcd%3A0x56403e4e620a0d93!2z2YXZg9iq2Kgg2YXYp9mH2LEg2KfZhNmF2LTYp9mF2Lkg2YTZhNiu2K_Zhdin2Kog2KfZhNiq2KzYp9ix2YrYqSAo2YXYp9mFKQ!5e0!3m2!1sen!2seg!4v1702471520369!5m2!1sen!2seg">
            </iframe>
          </div>
        </div>
      </div>
    </section>
  )
}