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
import { Link, useLocation } from "react-router-dom"
import { IoLogoWhatsapp, IoLogoInstagram, IoLogoYoutube } from "react-icons/io5";
import { FaFacebook, FaInstagram, FaLinkedin, FaSnapchat, FaTiktok, FaTwitter, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { useTranslation } from "react-i18next"
import AnimatedNumbers from "react-animated-numbers"
import { useEffect, useState } from "react"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import axios from "axios"
import AOS from 'aos';
import 'aos/dist/aos.css';
import Pic1 from "../assets/pic-1.jpg"
import Pic2 from "../assets/pic-2.jpg"
import Pic3 from "../assets/pic-3.jpg"

AOS.init();

export default function Home() {

  const [loadingStatus, setLoadingStatus] = useState(true)
  const [error, setError] = useState(null)

  const [formData, setFormData] = useState([])
  console.log(formData)
  
  const [loadingLinksStatus, setLoadingLinksStatus] = useState(true)
  const [errorLinks, setErrorLinks] = useState(null)

  const [formLinksData, setFormLinksData] = useState([])
  console.log(formLinksData)
  
  const { t, i18n } = useTranslation()

  const [numExperience, setNumExperience] = useState(22)
  const [numClients, setNumClients] = useState(1672)
  const [numParts, setNumParts] = useState(3864)


  let reversedNumExperience = parseInt(numExperience.toString().split("").reverse().join(""), 10);
  let reversedNumClients = parseInt(numClients.toString().split("").reverse().join(""), 10);
  let reversedNumParts = parseInt(numParts.toString().split("").reverse().join(""), 10);

  
  if (i18n.language == "en") {
    reversedNumExperience = 22;
    reversedNumClients = 1672
    reversedNumParts = 3864
  }

  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,          // Enable autoplay
    autoplaySpeed: 5000,     // Set autoplay speed in milliseconds (e.g., 2000ms = 2 seconds)
  };

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/home`)
          .then(res => {
            setLoadingStatus(false)
            console.log(res)
            setFormData(res.data.data.map(e => e.image).reverse())
          })
          .catch(err => {
            setLoadingStatus(false)
            console.log(err); // Log any errors that occur
            setError(err.message)
          })
  }, [])

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/staticPages`)
          .then(res => {
            setLoadingLinksStatus(false)
            console.log(res)
            setFormLinksData(res.data.data)
            localStorage.setItem("storeLink", res.data.data.storeLink)
          })
          .catch(err => {
            setLoadingLinksStatus(false)
            console.log(err); // Log any errors that occur
            setErrorLinks(err.message)
          })
  }, [])


  if (loadingStatus) {
    return (
      <div className="flex justify-center items-center w-screen h-screen bg-secondary">
        <span className="loading loading-ring loading-lg bg-primary"></span>
      </div>
    )
  }

  if (error) {
    return (
      <>
      <section className="w-10/12 mx-auto mt-10 h">
        <section className="flex md:flex-col lg:flex-row lg:items-center md:justify-between md:items-start md:gap-6">
          <h1 className="md:text-[2.4rem] text-5xl lg:text-[3.3rem] capitalize leading-normal text-accent font-semibold">{t("Our Experienced Mechanic Engineers Ready to Help You")}</h1>
          <div className="sm:flex sm:flex-col w-8/12 sm:justify-center sm:items-start sm:gap-4 hidden">
            <p className="text-lg leading-normal text-neutral">{t("Welcome to our premier car maintenance service! At the heart of our commitment to exceptional automotive care lies a dedicated team of skilled professionals ready to ensure your vehicle's peak performance.")}</p>
            <button className="btn bg-primary text-xl rounded-full px-10 text-accent leading-none">{t("Contact Us")}</button>
          </div>
        </section>
      </section>

      <section className="flex justify-between w-11/12 ms-auto mt-10 pb-14">
        <section className="flex flex-col justify-around gap-8 ms-4">
          <div>
            {/* <span className="text-primary text-5xl font-medium">20+</span> */}
            <span className="text-primary text-5xl flex font-medium">
              <AnimatedNumbers
                  locale={"en-US"}
                  className="text-primary"
                  transitions={(index) => ({
                    type: "spring",
                    duration: index + 0.8,
                  })}
                  animateToNumber={reversedNumExperience}
                />
              +</span>
            <h4 className="text-neutral mt-2">{t("Years of Experience")}</h4>
          </div>

          <div>
            {/* <span className="text-primary text-5xl font-medium">1672+</span> */}
            <span className="text-primary text-5xl flex font-medium">
              <AnimatedNumbers
                  
                  locale={"en-US"}
                  className="text-primary"
                  transitions={(index) => ({
                    type: "spring",
                    duration: index + 0.5,
                  })}
                  animateToNumber={reversedNumClients}
                />
              +</span>
            <h4 className="text-neutral mt-2">{t("Total Clients")}</h4>
          </div>

          <div>
            <span className="text-primary text-5xl flex font-medium">
              <AnimatedNumbers
              	
                locale={"en-US"}
                className="text-primary"
                transitions={(index) => ({
                  type: "spring",
                  duration: index + 0.5,
                })}
                animateToNumber={reversedNumParts}
              />
            +</span>
            <h4 className="text-neutral mt-2">{t("Spare Parts Sold")}</h4>
          </div>

        </section>

        {/* <div className="bg-[url('../src/assets/carBackground.jpg')] bg-center w-10/12 h-[26rem] bg-cover"></div>
        <div className="bg-[url('../src/assets/bg-1.jpg')] bg-center w-10/12 h-[26rem] bg-cover"></div>
        <div className="bg-[url('../src/assets/bg-2.jpg')] bg-center w-10/12 h-[26rem] bg-cover"></div> */}

        <Slider className="w-10/12" {...settings}>
          <div className="w-full h-96 bg-cover bg-center bg-[url('../src/assets/carBackground.jpg')]"></div>
          <div className="w-full h-96 bg-cover bg-center bg-[url('../src/assets/bg-1.jpg')]"></div>
          <div className="w-full h-96 bg-cover bg-center bg-[url('../src/assets/bg-2.jpg')]"></div>
        </Slider>
      </section>


      <section className="bg-secondary py-40" data-aos="fade-down">
        <h2 className="text-center mb-10 text-4xl sm:text-5xl text-accent font-semibold">{t("Services We Provide For You")}</h2>
        <p className="text-center mb-10 text-xl capitalize">{t("We Offer A Comprehensive Range Of Mobile Mechanic Services To Keep Your Vehicle In Top Condition.")}</p>
        
        <section className="w-9/12 md:w-10/12 xl:w-9/12 mx-auto pt-10 flex flex-col sm:grid sm:grid-cols-2">

          <div className="flex flex-col justify-between items-center gap-10 col-span-2 xl:col-span-2">

            <div className="flex flex-col md:flex-row justify-center items-center gap-10 sm:gap-10 w-full sm:w-[25rem] md:w-full max-w-[60rem]">
              <div className="bg-base-100 px-10 py-10 rounded-xl flex flex-col items-center justify-center gap-7 text-center w-full h-full">
                <h3 className="text-2xl flex flex-col justify-between items-center gap-4">{t("Maintenance")} <GiAutoRepair className="text-primary text-4xl" /></h3>
                <p className="text-neutral-300 my-4 text-base">{t("Routine vehicle maintenance can help diagnose issues early and prevent costly repairs later.")}</p>
                <Link state={{type: "maintenance"}} className="self-center bg-primary py-3 px-6 rounded-full text-accent leading-none btn" to="/maintenance">{t("Booking")}</Link>
              </div>

              <div className="bg-base-100 rounded-xl w-full sm:w-[25rem] md:w-full md:h-full max-w-[60rem]">
                <img
                  src={Pic1}
                  alt="Additional image about the License service"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>  
            </div>  
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-10 sm:gap-10 w-full sm:w-[25rem] md:w-full max-w-[60rem]">
              <div className="bg-base-100 px-10 py-10 rounded-xl flex flex-col items-center justify-center gap-7 text-center w-full h-full">
                <h3 className="text-2xl flex flex-col justify-between items-center gap-4">{t("Renewal")} <TfiReload className="text-primary text-4xl" /></h3>
                <p className="text-neutral-300 my-4 text-base">{t("From brakes to batteries, our parts replacement service ensures your vehicle is equipped with high-quality components.")}</p>
                <Link state={{type: "renewal"}} className="self-center bg-primary py-3 px-6 rounded-full text-accent leading-none btn" to="/renewal">{t("Booking")}</Link>
              </div>

              <div className="bg-base-100 rounded-xl w-full sm:w-[25rem] md:w-full md:h-full max-w-[60rem]">
                <img
                  src={Pic2}
                  alt="Additional image about the License service"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>            
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-10 sm:gap-10 w-full sm:w-[25rem] md:w-full  max-w-[60rem]">
              <div className="bg-base-100 px-10 py-10 rounded-xl flex flex-col items-center justify-center gap-7 text-center w-full h-full">
                <h3 className="text-2xl flex flex-col justify-between items-center gap-4">{t("License")} <TbLicense className="text-primary text-4xl" /></h3>
                <p className="text-neutral-300 my-4 text-base">{t("LoveCar is your trusted partner in simplifying and streamlining the licensing process for your vehicle. We understand that navigating the intricacies of licensing can be a time-consuming and complex task, and that's why we're here to make it easy, efficient, and enjoyable.")}</p>
                <Link state={{type: "license"}} className="self-center bg-primary py-3 px-6 rounded-full text-accent leading-none btn" to="/license">{t("Booking")}</Link>
              </div>

              <div className="bg-base-100 rounded-xl w-full sm:w-[25rem] md:w-full md:h-full  max-w-[60rem]">
                <img
                  src={Pic3}
                  alt="Additional image about the License service"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>            
            </div>
          </div>
        </section>
      </section>



      <section className="py-10">
        <section className="w-10/12 mx-auto py-10">
          <h2 className="text-center mb-16 text-5xl text-accent font-semibold">{t("How It Works")}</h2>

          <div className="flex flex-col xl:flex-row justify-between items-center gap-10">
            <div className="bg-secondary px-10 py-10 h-full md:h-[35rem] lg:h-[30rem] w-full rounded-xl flex flex-col justify-center items-center gap-8">
              <img className="w-50 mb-4" src={dataBaseIcon} alt="How it works icon" />
              <p className="text-2xl text-center xl:text-[1.1rem] xl:h-[20rem]">{t("Provide us with your essential details by filling out the required fields. Include your name, mobile number, and email for seamless communication.")}</p>
            </div>

            <div className="bg-secondary px-10 py-10 h-full md:h-[35rem] lg:h-[30rem] w-full rounded-xl flex flex-col justify-center items-center gap-8">
              <img className="w-50 mb-4" src={carIcon} alt="How it works icon" />
              <p className="text-2xl text-center xl:text-[1.1rem] xl:h-[20rem]">{t("Share your car's brand, manufacturing year, specifications, and attach photos using our user-friendly interface.")}</p>
            </div>

            <div className="bg-secondary px-10 py-10 h-full md:h-[35rem] lg:h-[30rem] w-full rounded-xl flex flex-col justify-center items-center gap-8">
              <img className="w-50 mb-4" src={laptopIcon} alt="How it works icon" />
              <p className="text-2xl text-center xl:text-[1.1rem] xl:h-[20rem]">{t("Rest assured that we eagerly receive and address your requests and inquiries at any time. Your satisfaction is our priority.")}</p>
            </div>

            <div className="bg-secondary px-10 py-10 h-full md:h-[35rem] lg:h-[30rem] w-full rounded-xl flex flex-col justify-center items-center gap-8">
              <img className="w-50 mb-4" src={timerIcon} alt="How it works icon" />
              <p className="text-2xl text-center xl:text-[1.1rem] xl:h-[20rem]">{t("Anticipate a timely response within 3 days, ensuring that your queries and concerns are addressed promptly and efficiently.")}</p>
            </div>
          </div>
        </section>
      </section>


      <section className="bg-secondary pb-40">
        <section className="w-7/12 mx-auto pt-40 flex flex-col justify-center items-center">
          <h2 className="bg-primary text-accent p-6 rounded-full rounded-tr-none mb-10">{t("Are you looking after the car you love? Contact us now.")}</h2>
          <div className="flex justify-center items-center gap-4">
            <a href="https://www.snapchat.com/add/mylovecar1886"><FaSnapchat className="text-primary text-7xl" /></a>
            <a href="https://www.instagram.com/mylovecar1886/"><FaInstagram className="text-primary text-7xl" /></a>
            <a href="https://youtube.com/@mylovecar_1886"><IoLogoYoutube className="text-primary text-7xl" /></a>
            <a href="https://wa.me/966500947921"><FaWhatsapp className="text-primary text-7xl" /></a>
          </div>
          <h2 className="text-center my-10 text-3xl md:text-5xl text-accent font-semibold">{t("We are pleased to be in touch with you at any time.")}</h2>
          <span className="text-center text-primary text-2xl md:text-3xl">8:00 AM - 9:00 PM</span>
        </section>
      </section>
      </>
    )
  }

  if (loadingLinksStatus) {
    return (
      <div className="flex justify-center items-center w-screen h-screen bg-secondary">
        <span className="loading loading-ring loading-lg bg-primary"></span>
      </div>
    )
  }

  if (errorLinks) {
    return (
      <div className="flex justify-center items-center w-screen h-screen bg-secondary">
        <h1 className="bg-red-900 text-accent text-center uppercase rounded-lg p-4 text-lg">{errorLinks} <br/> Please refresh</h1>
      </div>
    )
  }

 
  return(
    <main className="overflow-x-hidden">
      <div className="pb-14">
        <section className="w-10/12 mx-auto mt-6 sm:mt-10 h" data-aos="fade-up">
          <section className="flex sm:flex-col lg:flex-row lg:items-center sm:items-center md:justify-between md:items-start md:gap-6">
            <h1 className="md:text-[2.4rem] text-center text-2xl sm:text-5xl lg:text-[3.3rem] capitalize leading-normal text-accent font-semibold sm:self-start">{t("Our Experienced Mechanic Engineers Ready to Help You")}</h1>
            <div className="sm:flex sm:flex-col w-8/12 sm:w-full sm:mt-4 md:mt-0 md:w-full xl:w-8/12 sm:justify-center sm:items-center lg:items-start sm:gap-4 hidden">
              <p className="text-lg leading-normal text-neutral sm:text-center md:text-right">{t("Welcome to our premier car maintenance service! At the heart of our commitment to exceptional automotive care lies a dedicated team of skilled professionals ready to ensure your vehicle's peak performance.")}</p>
              <Link to="/contact-us" className="btn bg-primary text-xl rounded-full px-10 text-accent leading-none">{t("Contact Us")}</Link>
            </div>
          </section>
        </section>

        <section className="flex flex-col sm:flex-row justify-between items-center sm:items-stretch w-11/12 mx-auto sm:mx-0 sm:ms-auto mt-6 sm:mt-10 pb-14">
          <section className="flex flex-col justify-around items-center sm:items-start gap-8 sm:ms-4">
            <div className="text-center sm:text-start w-40 flex flex-col items-center sm:items-start">
              {/* <span className="text-primary text-5xl font-medium">20+</span> */}
              <span className="text-primary text-2xl sm:text-5xl flex font-medium">+
                <AnimatedNumbers
                    locale={"en-US"}
                    className="text-primary"
                    transitions={(index) => ({
                      type: "spring",
                      duration: index + 0.8,
                    })}
                    animateToNumber={reversedNumExperience}
                  />
                </span>
              <h4 className="text-neutral mt-2">{t("Years of Experience")}</h4>
            </div>

            <div className="text-center sm:text-start w-40 flex flex-col items-center sm:items-start sm:block">
              {/* <span className="text-primary text-5xl font-medium">1672+</span> */}
              <span className="text-primary text-2xl sm:text-5xl flex font-medium">+
                <AnimatedNumbers
                    
                    locale={"en-US"}
                    className="text-primary"
                    transitions={(index) => ({
                      type: "spring",
                      duration: index + 0.5,
                    })}
                    animateToNumber={reversedNumClients}
                  />
                </span>
              <h4 className="text-neutral mt-2">{t("Total Clients")}</h4>
            </div>

            <div className="text-center sm:text-start w-40 flex flex-col items-center sm:items-start"> 
              <span className="text-primary text-2xl sm:text-5xl flex font-medium">+
                <AnimatedNumbers
                  
                  locale={"en-US"}
                  className="text-primary"
                  transitions={(index) => ({
                    type: "spring",
                    duration: index + 0.5,
                  })}
                  animateToNumber={reversedNumParts}
                />
              </span>
              <h4 className="text-neutral mt-2">{t("Spare Parts Sold")}</h4>
            </div>

          </section>

          {/* <div className="bg-[url('../src/assets/carBackground.jpg')] bg-center w-10/12 h-[26rem] bg-cover"></div>
          <div className="bg-[url('../src/assets/bg-1.jpg')] bg-center w-10/12 h-[26rem] bg-cover"></div>
          <div className="bg-[url('../src/assets/bg-2.jpg')] bg-center w-10/12 h-[26rem] bg-cover"></div> */}

          <Slider className="sm:w-8/12 w-11/12 md:w-10/12 mt-6 md:mr-4 lg:mr-4 xl:mr-0" {...settings}>
            {/* <div className="w-full h-96 bg-cover bg-center bg-[url('../src/assets/carBackground.jpg')]"></div>
            <div className="w-full h-96 bg-cover bg-center bg-[url('../src/assets/bg-1.jpg')]"></div>
            <div className="w-full h-96 bg-cover bg-center bg-[url('../src/assets/bg-2.jpg')]"></div> */}
            {/* {slides} */}

            {formData.map((image, index) => (
                <div key={index} style={{width: '100%', height: '400px'}}>
                  <div
                    style={{
                      backgroundImage: `url(${image})`,
                      width: '100%',
                      height: '500px',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }} />
                </div>
              ))}
          </Slider>
        </section>
      </div>


      {/* <section className="bg-secondary pb-40" data-aos="fade-down">
        <section className="w-8/12 mx-auto pt-40">
          <h2 className="text-center mb-10 text-4xl sm:text-5xl text-accent font-semibold">{t("Services We Provide For You")}</h2>
          <p className="text-center mb-10 text-xl capitalize">{t("We Offer A Comprehensive Range Of Mobile Mechanic Services To Keep Your Vehicle In Top Condition.")}</p>

          <div className="flex flex-col xl:flex-row justify-between items-center gap-10">
            <div className="bg-base-100 px-10 py-10 rounded-xl flex flex-col text-center w-full h-full">
              <h3 className="text-2xl flex flex-col justify-between items-center gap-4">{t("Maintenance")} <GiAutoRepair className="text-primary text-4xl" /></h3>
              <p className="text-neutral-300 my-4 text-base">{t("Routine vehicle maintenance can help diagnose issues early and prevent costly repairs later.")}</p>
              <Link state={{type: "maintenance"}} className="self-center bg-primary py-3 px-6 rounded-full text-accent leading-none btn" to="/maintenance">{t("Booking")}</Link>
            </div>

            <div className="bg-base-100 px-10 py-10 rounded-xl flex flex-col text-center w-full h-full">
              <h3 className="text-2xl flex flex-col justify-between items-center gap-4">{t("Renewal")} <TfiReload className="text-primary text-4xl" /></h3>
              <p className="text-neutral-300 my-4 text-base">{t("From brakes to batteries, our parts replacement service ensures your vehicle is equipped with high-quality components.")}</p>
              <Link state={{type: "renewal"}} className="self-center bg-primary py-3 px-6 rounded-full text-accent leading-none btn" to="/renewal">{t("Booking")}</Link>
            </div>
          </div>

        
          <div className="flex justify-center items-center mt-10">
            <div className="bg-base-100 px-10 py-10 rounded-xl flex flex-col text-center w-full h-full">
              <h3 className="text-2xl flex flex-col justify-between items-center gap-4">{t("License")} <TbLicense className="text-primary text-4xl" /></h3>
              <p className="text-neutral-300 my-4 text-base">{t("LoveCar is your trusted partner in simplifying and streamlining the licensing process for your vehicle. We understand that navigating the intricacies of licensing can be a time-consuming and complex task, and that's why we're here to make it easy, efficient, and enjoyable.")}</p>
              <Link state={{type: "license"}} className="self-center bg-primary py-3 px-6 rounded-full text-accent leading-none btn" to="/license">{t("Booking")}</Link>
            </div>
          </div>
        </section>
      </section> */}

      <section className="bg-secondary py-40" data-aos="fade-down">
        <h2 className="text-center mb-10 text-4xl sm:text-5xl text-accent font-semibold">{t("Services We Provide For You")}</h2>
        <p className="text-center mb-10 text-xl capitalize">{t("We Offer A Comprehensive Range Of Mobile Mechanic Services To Keep Your Vehicle In Top Condition.")}</p>
        
        <section className="w-9/12 md:w-10/12 xl:w-9/12 mx-auto pt-10 flex flex-col sm:grid sm:grid-cols-2">

          <div className="flex flex-col justify-between items-center gap-10 col-span-2 xl:col-span-2">

            <div className="flex flex-col md:flex-row justify-center items-center gap-10 sm:gap-10 w-full sm:w-[25rem] md:w-full max-w-[60rem]">
              <div className="bg-base-100 px-10 py-10 rounded-xl flex flex-col items-center justify-center gap-7 text-center w-full h-full">
                <h3 className="text-2xl flex flex-col justify-between items-center gap-4">{t("Maintenance")} <GiAutoRepair className="text-primary text-4xl" /></h3>
                <p className="text-neutral-300 my-4 text-base">{t("Routine vehicle maintenance can help diagnose issues early and prevent costly repairs later.")}</p>
                <Link state={{type: "maintenance"}} className="self-center bg-primary py-3 px-6 rounded-full text-accent leading-none btn" to="/maintenance">{t("Booking")}</Link>
              </div>

              <div className="bg-base-100 rounded-xl w-full sm:w-[25rem] md:w-full md:h-full max-w-[60rem]">
                <img
                  src={Pic1}
                  alt="Additional image about the License service"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>  
            </div>  
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-10 sm:gap-10 w-full sm:w-[25rem] md:w-full max-w-[60rem]">
              <div className="bg-base-100 px-10 py-10 rounded-xl flex flex-col items-center justify-center gap-7 text-center w-full h-full">
                <h3 className="text-2xl flex flex-col justify-between items-center gap-4">{t("Renewal")} <TfiReload className="text-primary text-4xl" /></h3>
                <p className="text-neutral-300 my-4 text-base">{t("From brakes to batteries, our parts replacement service ensures your vehicle is equipped with high-quality components.")}</p>
                <Link state={{type: "renewal"}} className="self-center bg-primary py-3 px-6 rounded-full text-accent leading-none btn" to="/renewal">{t("Booking")}</Link>
              </div>

              <div className="bg-base-100 rounded-xl w-full sm:w-[25rem] md:w-full md:h-full max-w-[60rem]">
                <img
                  src={Pic2}
                  alt="Additional image about the License service"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>            
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-10 sm:gap-10 w-full sm:w-[25rem] md:w-full  max-w-[60rem]">
              <div className="bg-base-100 px-10 py-10 rounded-xl flex flex-col items-center justify-center gap-7 text-center w-full h-full">
                <h3 className="text-2xl flex flex-col justify-between items-center gap-4">{t("License")} <TbLicense className="text-primary text-4xl" /></h3>
                <p className="text-neutral-300 my-4 text-base">{t("LoveCar is your trusted partner in simplifying and streamlining the licensing process for your vehicle. We understand that navigating the intricacies of licensing can be a time-consuming and complex task, and that's why we're here to make it easy, efficient, and enjoyable.")}</p>
                <Link state={{type: "license"}} className="self-center bg-primary py-3 px-6 rounded-full text-accent leading-none btn" to="/license">{t("Booking")}</Link>
              </div>

              <div className="bg-base-100 rounded-xl w-full sm:w-[25rem] md:w-full md:h-full  max-w-[60rem]">
                <img
                  src={Pic3}
                  alt="Additional image about the License service"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>            
            </div>
          </div>
        </section>
      </section>


      <section className="py-10" data-aos="fade-left">
        <section className="w-9/12 mx-auto py-24">
          <h2 className="text-center mb-16 text-4xl sm:text-5xl text-accent font-semibold">{t("How It Works")}</h2>

          <div className="flex flex-col xl:flex-row justify-between items-center gap-10">
            <div className="bg-secondary px-10 py-20 h-full w-full rounded-xl flex flex-col justify-center items-center gap-8">
              <img className="w-20 sm:w-50 mb-4" src={dataBaseIcon} alt="How it works icon" />
              <p className="text-base text-center md:text-xl xl:h-[20rem]">{t("Provide us with your essential details by filling out the required fields. Include your name, mobile number, and email for seamless communication.")}</p>
            </div>

            <div className="bg-secondary px-10 py-20 h-full w-full rounded-xl flex flex-col justify-center items-center gap-8">
              <img className="w-20 sm:w-50 mb-4" src={carIcon} alt="How it works icon" />
              <p className="text-base text-center md:text-xl xl:h-[20rem]">{t("Share your car's brand, manufacturing year, specifications, and attach photos using our user-friendly interface.")}</p>
            </div>

            <div className="bg-secondary px-10 py-20 h-full w-full rounded-xl flex flex-col justify-center items-center gap-8">
              <img className="w-20 sm:w-50 mb-4" src={laptopIcon} alt="How it works icon" />
              <p className="text-base text-center md:text-xl xl:h-[20rem]">{t("Rest assured that we eagerly receive and address your requests and inquiries at any time. Your satisfaction is our priority.")}</p>
            </div>

            <div className="bg-secondary px-10 py-20 h-full w-full rounded-xl flex flex-col justify-center items-center gap-8">
              <img className="w-20 sm:w-50 mb-4" src={timerIcon} alt="How it works icon" />
              <p className="text-base text-center md:text-xl xl:h-[20rem]">{t("Anticipate a timely response within 3 days, ensuring that your queries and concerns are addressed promptly and efficiently.")}</p>
            </div>
          </div>
        </section>
      </section>


      <section className="bg-secondary pb-40" data-aos="fade-down">
        <section className="w-10/12 mx-auto pt-40 flex flex-col justify-center items-center">
          <h2 className="bg-primary text-accent p-6 rounded-full rounded-tr-none mb-10 text-sm sm:text-base">{t("Are you looking after the car you love? Contact us now.")}</h2>
          <div className="flex justify-center items-center gap-4">
            <a href={formLinksData.socialMedia.snapchat}><FaSnapchat className="text-primary text-4xl sm:text-7xl" /></a>
            <a href={formLinksData.socialMedia.instagram}><FaInstagram className="text-primary text-4xl sm:text-7xl" /></a>
            <a href={formLinksData.socialMedia.youtube}><IoLogoYoutube className="text-primary text-4xl sm:text-7xl" /></a>
            <a href={formLinksData.socialMedia.whatsapp}><FaWhatsapp className="text-primary text-4xl sm:text-7xl" /></a>
            {formLinksData.socialMedia.linkedin && <a href={formLinksData.socialMedia.linkedin}><FaLinkedin className="text-primary text-4xl sm:text-7xl" /></a>}
            {formLinksData.socialMedia.tiktok && <a href={formLinksData.socialMedia.tiktok}><FaTiktok className="text-primary text-4xl sm:text-7xl" /></a>}
            {formLinksData.socialMedia.twitter && <a href={formLinksData.socialMedia.twitter}><FaTwitter className="text-primary text-4xl sm:text-7xl" /></a>}
            {formLinksData.socialMedia.facebook && <a href={formLinksData.socialMedia.facebook}><FaFacebook className="text-primary text-4xl sm:text-7xl" /></a>}
          </div>
          <h2 className="text-center my-10 text-base sm:text-3xltext-accent font-semibold">{t("We are pleased to be in touch with you at any time.")}</h2>
          <span className="text-center text-primary text-base sm:text-2xl md:text-3xl">{t("8:00 AM - 9:00 PM")}</span>
        </section>
      </section>
    </main>
  )
}