import BackgroundCarImage from "../assets/carBackground.jpg"
import dataBaseIcon from "../assets/clarity_data-cluster-line.png"
import carIcon from "../assets/mingcute_car-3-fill.png"
import laptopIcon from "../assets/fa-solid_laptop-medical.png"
import timerIcon from "../assets/gis_timer.png"
import whatsappIcon from "../assets/ic_baseline-whatsapp.png"
import youtubeIcon from "../assets/mdi_youtube.png"
import instagramIcon from "../assets/insta.png"
import { TfiReload } from "react-icons/tfi";
import { GiAutoRepair } from "react-icons/gi";
import { TbLicense } from "react-icons/tb";
import { Link } from "react-router-dom"
import { IoLogoWhatsapp, IoLogoInstagram, IoLogoYoutube } from "react-icons/io5";
import { FaInstagram, FaSnapchat, FaWhatsapp, FaYoutube } from "react-icons/fa";

export default function Home() {

  const backgroundImageUrl = '../../public/carBackground.jpg';

  return(
    <>
      <section className="w-10/12 mx-auto mt-10">
        <section className="flex md:flex-col lg:flex-row lg:items-center md:justify-between md:items-start md:gap-6">
          <h1 className="md:text-[2.4rem] text-5xl lg:text-[3.3rem] capitalize leading-normal text-accent font-semibold">Our Experienced Mechanic Engineers Ready to Help You</h1>
          <div className="sm:flex sm:flex-col w-8/12 sm:justify-center sm:items-start sm:gap-4 hidden">
            <p className="text-lg leading-normal text-neutral">Welcome to our premier car maintenance service! At the heart of our commitment to exceptional automotive care lies a dedicated team of skilled professionals ready to ensure your vehicle's peak performance.</p>
            <button className="btn bg-primary text-xl rounded-full px-10 text-accent leading-none">Contact Us</button>
          </div>
        </section>
      </section>

      <section className="flex justify-between w-11/12 ml-auto mt-10 pb-14">
        <section className="flex flex-col justify-around gap-8 mr-4">
          <div>
            <span className="text-primary text-5xl font-medium">20+</span>
            <h4 className="text-neutral mt-2">Years of Experience</h4>
          </div>

          <div>
            <span className="text-primary text-5xl font-medium">1672+</span>
            <h4 className="text-neutral mt-2">Total Client</h4>
          </div>

          <div>
            <span className="text-primary text-5xl font-medium">3864+</span>
            <h4 className="text-neutral mt-2">Spare Parts Sold</h4>
          </div>
        </section>

        <div className="bg-[url('../src/assets/carBackground.jpg')] bg-center w-10/12 h-[26rem] bg-cover"></div>
      </section>


      <section className="bg-secondary pb-40">
        <section className="w-8/12 mx-auto pt-40">
          <h2 className="text-center mb-10 text-5xl text-accent font-semibold">Services We Provide For You</h2>
          <p className="text-center mb-10 text-xl capitalize">we offer a comprehensive range of mobile mechanic services to keep your vehicle in top condition.</p>

          <div className="flex flex-col xl:flex-row justify-between items-center gap-10">
            <div className="bg-base-100 px-10 py-10 rounded-xl flex flex-col text-center w-full h-full">
              <h3 className="text-2xl flex flex-col justify-between items-center gap-4">Routine Maintenance <GiAutoRepair className="text-primary text-4xl" /></h3>
              <p className="text-neutral my-4 text-base">Routine vehicle maintenance can help diagnose issues early and prevent costly repairs later.</p>
              <Link className="self-center bg-primary py-3 px-6 rounded-full text-accent leading-none btn" to="/services">Booking</Link>
            </div>

            <div className="bg-base-100 px-10 py-10 rounded-xl flex flex-col text-center w-full h-full">
              <h3 className="text-2xl flex flex-col justify-between items-center gap-4">Renewal <TfiReload className="text-primary text-4xl" /></h3>
              <p className="text-neutral my-4 text-base">From brakes to batteries, our parts replacement service ensures your vehicle is equipped with high-quality components.</p>
              <Link className="self-center bg-primary py-3 px-6 rounded-full text-accent leading-none btn" to="/services">Booking</Link>
            </div>
          </div>

        
          <div className="flex justify-center items-center mt-10">
            <div className="bg-base-100 px-10 py-10 rounded-xl flex flex-col text-center w-full h-full">
              <h3 className="text-2xl flex flex-col justify-between items-center gap-4">Service License <TbLicense className="text-primary text-4xl" /></h3>
              <p className="text-neutral my-4 text-base">LoveCar is your trusted partner in simplifying and streamlining the licensing process for your vehicle. We understand that navigating the intricacies of licensing can be a time-consuming and complex task, and that's why we're here to make it easy, efficient, and enjoyable.</p>
              <Link className="self-center bg-primary py-3 px-6 rounded-full text-accent leading-none btn" to="/services">Booking</Link>
            </div>
          </div>
        </section>
      </section>


      <section className="py-10">
        <section className="w-10/12 mx-auto py-10">
          <h2 className="text-center mb-16 text-5xl text-accent font-semibold">How It Works</h2>

          <div className="flex flex-col xl:flex-row justify-between items-center gap-10">
            <div className="bg-secondary px-10 py-10 h-full md:h-[35rem] lg:h-[30rem] w-full rounded-xl flex flex-col justify-center items-center gap-8">
              <img className="w-50 mb-4" src={dataBaseIcon} alt="How it works icon" />
              <p className="text-2xl text-center xl:text-[1.1rem] xl:h-[20rem]">Provide us with your essential details by filling out the required fields. Include your name, mobile number, and email for seamless communication.</p>
            </div>

            <div className="bg-secondary px-10 py-10 h-full md:h-[35rem] lg:h-[30rem] w-full rounded-xl flex flex-col justify-center items-center gap-8">
              <img className="w-50 mb-4" src={carIcon} alt="How it works icon" />
              <p className="text-2xl text-center xl:text-[1.1rem] xl:h-[20rem]">Share your car's brand, manufacturing year, specifications, and attach photos using our user-friendly interface</p>
            </div>

            <div className="bg-secondary px-10 py-10 h-full md:h-[35rem] lg:h-[30rem] w-full rounded-xl flex flex-col justify-center items-center gap-8">
              <img className="w-50 mb-4" src={laptopIcon} alt="How it works icon" />
              <p className="text-2xl text-center xl:text-[1.1rem] xl:h-[20rem]">Rest assured that we eagerly receive and address your requests and inquiries at any time. Your satisfaction is our priority</p>
            </div>

            <div className="bg-secondary px-10 py-10 h-full md:h-[35rem] lg:h-[30rem] w-full rounded-xl flex flex-col justify-center items-center gap-8">
              <img className="w-50 mb-4" src={timerIcon} alt="How it works icon" />
              <p className="text-2xl text-center xl:text-[1.1rem] xl:h-[20rem]">Anticipate a timely response within 3 days, ensuring that your queries and concerns are addressed promptly and efficiently</p>
            </div>
          </div>
        </section>
      </section>


      <section className="bg-secondary pb-40">
        <section className="w-7/12 mx-auto pt-40 flex flex-col justify-center items-center">
          <h2 className="bg-primary text-accent p-6 rounded-full rounded-tr-none mb-10">Are you looking for the car you love? Contact us now.</h2>
          <div className="flex justify-center items-center gap-4">
            <a href="https://www.snapchat.com/add/mylovecar1886"><FaSnapchat className="text-primary text-7xl" /></a>
            <a href="https://www.instagram.com/p/CvpJXMAKC5i/?igshid=ODJiZmNhM2IxNg=="><FaInstagram className="text-primary text-7xl" /></a>
            <a href="https://youtube.com/@mylovecar_1886"><IoLogoYoutube className="text-primary text-7xl" /></a>
            <a href="https://wa.me/966500947921"><FaWhatsapp className="text-primary text-7xl" /></a>
          </div>
          <h2 className="text-center my-10 text-3xl md:text-5xl text-accent font-semibold">We are pleased to be in touch with you at any time.</h2>
          <span className="text-center text-primary text-2xl md:text-3xl">8:00 AM - 9:00 PM</span>
        </section>
      </section>
    </>
  )
}