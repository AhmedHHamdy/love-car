import { Link } from "react-router-dom"
import Logo from "../assets/logo.png"
import { useTranslation } from "react-i18next"

export default function Footer() {

    const { t } = useTranslation()

    return (
    <footer className="w-10/12 mx-auto 2xl:max-w-[1800px] 2xl:mx-auto">
        <section className="footer p-10 bg-base-100 text-base-content">
            <aside>
                <img className="max-w-full" src={Logo} alt="logo-icon" />
                <p>{t("Providing reliable automotive repairs since 2003.")}</p>
            </aside> 
            <nav>
                <header className="footer-title">{t("Services")}</header> 
                <Link to="/maintenance" className="link link-hover text-base">{t("Maintenance")}</Link>
                <Link to="/renewal" className="link link-hover text-base">{t("Renewal")}</Link>
                <Link to="/license" className="link link-hover text-base">{t("License")}</Link>
            </nav> 
            <nav>
                <header className="footer-title">{t("Company")}</header> 
                <a href={localStorage.getItem("storeLink") || "https://mr-decals.com/"} target="_blank" className="link link-hover">{t("Shop")}</a>
                <Link to="/about-us" className="link link-hover text-base">{t("About Us")}</Link>
                <Link to="/contact-us" className="link link-hover text-base">{t("Contact Us")}</Link>
            </nav> 
            <nav>
                <header className="footer-title">{t("Legal")}</header> 
                <Link to="/privacy-policy" className="link link-hover text-base">{t("Terms Of Use")}</Link>
                <Link to="/privacy-policy" className="link link-hover text-base">{t("Privacy Policy")}</Link>
            </nav>

            <nav>
                <header className="footer-title">{t("Download")}</header>
                <div className="flex flex-col sm:flex-row gap-2">
                    <Link>
                        <svg className="w-40" width="170" height="50" viewBox="0 0 170 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_32_15813)">
                        <path d="M163.273 49.7677H6.74549C3.30188 49.7677 0.484375 46.976 0.484375 43.564V6.34196C0.484375 2.92994 3.30188 0.138283 6.74549 0.138283H163.273C166.717 0.138283 169.535 2.92994 169.535 6.34196V43.564C169.535 46.976 166.717 49.7677 163.273 49.7677Z" fill="#100F0D"/>
                        <path d="M163.273 0.138283H6.74549C3.30188 0.138283 0.484375 2.92994 0.484375 6.34196V43.564C0.484375 46.976 3.30188 49.7677 6.74549 49.7677H163.273C166.717 49.7677 169.535 46.976 169.535 43.564V6.34196C169.535 2.92994 166.717 0.138283 163.273 0.138283ZM163.273 1.13037C166.174 1.13037 168.533 3.46842 168.533 6.34196V43.564C168.533 46.4376 166.174 48.7756 163.273 48.7756H6.74549C3.84532 48.7756 1.48664 46.4376 1.48664 43.564V6.34196C1.48664 3.46842 3.84532 1.13037 6.74549 1.13037H163.273Z" fill="#A2A2A1"/>
                        <path d="M59.799 12.2916H56.1637V13.1835H58.8873C58.8148 13.9104 58.5214 14.4823 58.0283 14.8972C57.5353 15.3121 56.9072 15.5195 56.1637 15.5195C55.3458 15.5195 54.6532 15.2404 54.0876 14.68C53.532 14.1082 53.2503 13.4025 53.2503 12.5514C53.2503 11.6984 53.532 10.9927 54.0876 10.4228C54.6532 9.86053 55.3458 9.58137 56.1637 9.58137C56.5823 9.58137 56.9795 9.65308 57.3474 9.81016C57.7133 9.96525 58.0067 10.1824 58.2376 10.4635L58.9284 9.77914C58.6153 9.42628 58.2161 9.15493 57.725 8.95716C57.232 8.76137 56.7173 8.66831 56.1637 8.66831C55.0738 8.66831 54.1503 9.04053 53.397 9.78882C52.6418 10.5371 52.2642 11.46 52.2642 12.5514C52.2642 13.6409 52.6418 14.5657 53.397 15.3121C54.1503 16.0604 55.0738 16.4346 56.1637 16.4346C57.3044 16.4346 58.2161 16.07 58.9186 15.3334C59.5368 14.7207 59.8519 13.8911 59.8519 12.8519C59.8519 12.6755 59.8303 12.4874 59.799 12.2916ZM61.2474 8.83308V16.2678H65.6263V15.3548H62.2101V12.9974H65.2917V12.1035H62.2101V9.74812H65.6263V8.83308H61.2474ZM71.7968 9.74812V8.83308H66.6412V9.74812H68.7368V16.2678H69.6994V9.74812H71.7968ZM76.5016 8.83308H75.5389V16.2678H76.5016V8.83308ZM82.8785 9.74812V8.83308H77.723V9.74812H79.8185V16.2678H80.7811V9.74812H82.8785ZM92.644 9.7985C91.9004 9.04053 90.9887 8.66831 89.8989 8.66831C88.8091 8.66831 87.8973 9.04053 87.1537 9.78882C86.4103 10.5256 86.0424 11.4503 86.0424 12.5514C86.0424 13.6506 86.4103 14.5753 87.1537 15.3121C87.8973 16.0604 88.8091 16.4346 89.8989 16.4346C90.9789 16.4346 91.9004 16.0604 92.644 15.3121C93.3894 14.5753 93.7553 13.6506 93.7553 12.5514C93.7553 11.46 93.3894 10.5371 92.644 9.7985ZM87.8445 10.4228C88.4001 9.86053 89.081 9.58137 89.8989 9.58137C90.7167 9.58137 91.3977 9.86053 91.9435 10.4228C92.4972 10.9733 92.7711 11.6888 92.7711 12.5514C92.7711 13.4121 92.4972 14.1295 91.9435 14.68C91.3977 15.2404 90.7167 15.5195 89.8989 15.5195C89.081 15.5195 88.4001 15.2404 87.8445 14.68C87.3005 14.1179 87.0285 13.4121 87.0285 12.5514C87.0285 11.6888 87.3005 10.983 87.8445 10.4228ZM96.0837 11.6364L96.0425 10.2037H96.0837L99.899 16.2678H100.905V8.83308H99.9401V13.1835L99.9832 14.616H99.9401L96.293 8.83308H95.121V16.2678H96.0837V11.6364Z" fill="white"/>
                        <path d="M134.392 37.3604H136.729V21.8492H134.392V37.3604ZM155.438 27.437L152.76 34.1617H152.68L149.9 27.437H147.383L151.553 36.8356L149.175 42.0641H151.612L158.037 27.437H155.438ZM142.186 35.5987C141.422 35.5987 140.354 35.2191 140.354 34.2814C140.354 33.0842 141.684 32.6253 142.831 32.6253C143.858 32.6253 144.342 32.8444 144.966 33.1439C144.784 34.5809 143.536 35.5987 142.186 35.5987ZM142.469 27.0977C140.777 27.0977 139.025 27.8363 138.3 29.4725L140.374 30.3304C140.817 29.4725 141.643 29.1934 142.509 29.1934C143.718 29.1934 144.946 29.9111 144.966 31.1887V31.3482C144.543 31.1087 143.636 30.7496 142.529 30.7496C140.293 30.7496 138.017 31.9665 138.017 34.2416C138.017 36.3169 139.851 37.6541 141.904 37.6541C143.475 37.6541 144.342 36.9557 144.885 36.1372H144.966V37.3352H147.222V31.3879C147.222 28.6341 145.146 27.0977 142.469 27.0977ZM128.028 29.3251H124.705V24.0085H128.028C129.775 24.0085 130.767 25.4411 130.767 26.6667C130.767 27.8688 129.775 29.3251 128.028 29.3251ZM127.968 21.8492H122.369V37.3604H124.705V31.4839H127.968C130.558 31.4839 133.104 29.6266 133.104 26.6667C133.104 23.7075 130.558 21.8492 127.968 21.8492ZM97.4373 35.6015C95.8231 35.6015 94.4721 34.2619 94.4721 32.4236C94.4721 30.564 95.8231 29.2054 97.4373 29.2054C99.031 29.2054 100.282 30.564 100.282 32.4236C100.282 34.2619 99.031 35.6015 97.4373 35.6015ZM100.12 28.3055H100.04C99.5153 27.686 98.5061 27.1263 97.2359 27.1263C94.5724 27.1263 92.1315 29.4454 92.1315 32.4236C92.1315 35.3815 94.5724 37.6803 97.2359 37.6803C98.5061 37.6803 99.5153 37.1204 100.04 36.4812H100.12V37.2402C100.12 39.2598 99.031 40.3386 97.2759 40.3386C95.8441 40.3386 94.9564 39.3194 94.5929 38.4601L92.5557 39.2995C93.1402 40.6983 94.6932 42.4178 97.2759 42.4178C100.02 42.4178 102.34 40.8185 102.34 36.9203V27.4462H100.12V28.3055ZM103.954 37.3604H106.293V21.8492H103.954V37.3604ZM109.743 32.2434C109.683 30.2043 111.338 29.1652 112.528 29.1652C113.456 29.1652 114.242 29.6252 114.505 30.2844L109.743 32.2434ZM117.006 30.484C116.562 29.3053 115.211 27.1263 112.447 27.1263C109.703 27.1263 107.423 29.2651 107.423 32.4033C107.423 35.3617 109.683 37.6803 112.709 37.6803C115.149 37.6803 116.562 36.2016 117.148 35.3417L115.332 34.1422C114.726 35.0219 113.9 35.6015 112.709 35.6015C111.519 35.6015 110.671 35.0617 110.127 34.0022L117.248 31.084L117.006 30.484ZM60.2703 28.7455V30.9841H65.6768C65.5154 32.2434 65.0918 33.1627 64.4461 33.8025C63.6591 34.5818 62.4284 35.4416 60.2703 35.4416C56.9416 35.4416 54.3393 32.7832 54.3393 29.4851C54.3393 26.187 56.9416 23.5282 60.2703 23.5282C62.0659 23.5282 63.3769 24.228 64.3453 25.1275L65.9395 23.548C64.5875 22.269 62.7923 21.2895 60.2703 21.2895C55.7104 21.2895 51.8774 24.9676 51.8774 29.4851C51.8774 34.0022 55.7104 37.6803 60.2703 37.6803C62.7312 37.6803 64.5875 36.8806 66.0398 35.3815C67.5327 33.9023 67.9969 31.8236 67.9969 30.1443C67.9969 29.6252 67.9562 29.1454 67.8756 28.7455H60.2703ZM74.1436 35.6015C72.5294 35.6015 71.1373 34.2823 71.1373 32.4033C71.1373 30.5043 72.5294 29.2054 74.1436 29.2054C75.7572 29.2054 77.1493 30.5043 77.1493 32.4033C77.1493 34.2823 75.7572 35.6015 74.1436 35.6015ZM74.1436 27.1263C71.1974 27.1263 68.7971 29.345 68.7971 32.4033C68.7971 35.4416 71.1974 37.6803 74.1436 37.6803C77.0887 37.6803 79.4895 35.4416 79.4895 32.4033C79.4895 29.345 77.0887 27.1263 74.1436 27.1263ZM85.8053 35.6015C84.1922 35.6015 82.7996 34.2823 82.7996 32.4033C82.7996 30.5043 84.1922 29.2054 85.8053 29.2054C87.4196 29.2054 88.8112 30.5043 88.8112 32.4033C88.8112 34.2823 87.4196 35.6015 85.8053 35.6015ZM85.8053 27.1263C82.8602 27.1263 80.46 29.345 80.46 32.4033C80.46 35.4416 82.8602 37.6803 85.8053 37.6803C88.7515 37.6803 91.1518 35.4416 91.1518 32.4033C91.1518 29.345 88.7515 27.1263 85.8053 27.1263Z" fill="white"/>
                        <path d="M26.427 24.2386L13.0952 38.2589C13.0957 38.2618 13.0967 38.2643 13.0972 38.2672C13.5061 39.7895 14.9094 40.9105 16.575 40.9105C17.2408 40.9105 17.8659 40.7322 18.402 40.4191L18.4446 40.3944L33.4512 31.8144L26.427 24.2386Z" fill="#EB3131"/>
                        <path d="M39.9146 21.8511L39.9019 21.8424L33.4231 18.1211L26.124 24.5565L33.4485 31.8129L39.8931 28.1285C41.023 27.5241 41.79 26.344 41.79 24.983C41.79 23.6318 41.0332 22.4575 39.9146 21.8511Z" fill="#F6B60B"/>
                        <path d="M13.0944 11.649C13.0143 11.9418 12.9722 12.2485 12.9722 12.567V37.3415C12.9722 37.6594 13.0138 37.9671 13.0949 38.2589L26.8856 24.5973L13.0944 11.649Z" fill="#5778C5"/>
                        <path d="M26.5253 24.954L33.4258 18.1188L18.4362 9.50782C17.8914 9.18448 17.2555 8.99788 16.575 8.99788C14.9094 8.99788 13.5042 10.1209 13.0952 11.6451C13.0947 11.6466 13.0947 11.6476 13.0947 11.649L26.5253 24.954Z" fill="#3BAD49"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_32_15813">
                        <rect width="169.05" height="49.6294" fill="white" transform="translate(0.484375 0.138306)"/>
                        </clipPath>
                        </defs>
                        </svg>
                    </Link>
                    <Link>
                        <svg className="w-40" width="156" height="53" viewBox="0 0 156 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.8837 50.8651C10.495 50.8651 10.1063 50.8651 9.71762 50.8651C8.94022 50.8651 8.03325 50.7372 7.25585 50.6092C6.47844 50.4813 5.83061 50.2254 5.0532 49.9695C4.40537 49.5856 3.75753 49.2018 3.23926 48.69C2.72099 48.1782 2.20273 47.5384 1.94359 46.8987C1.55489 46.2589 1.42532 45.4912 1.29576 44.7235C1.16619 43.9558 1.03662 43.1881 1.03662 42.2924C1.03662 42.0365 1.03662 41.1409 1.03662 41.1409V11.5842C1.03662 11.5842 1.03662 10.6886 1.03662 10.4327C1.03662 9.66497 1.16619 8.76931 1.29576 8.0016C1.42532 7.36185 1.68446 6.59415 2.07316 5.95439C2.46186 5.31464 2.85056 4.67488 3.36883 4.16308C3.8871 3.65128 4.53494 3.26742 5.18277 2.88357C5.83061 2.49972 6.60801 2.37177 7.38541 2.24382C8.16282 2.11587 8.94022 1.98792 9.84719 1.98792H11.0133H144.208H145.374C146.152 1.98792 146.929 2.11587 147.836 2.24382C148.614 2.37177 149.261 2.62767 150.039 2.88357C151.335 3.52333 152.501 4.67488 153.148 5.95439C153.537 6.59415 153.667 7.36185 153.796 8.0016C153.926 8.76931 154.055 9.66497 154.055 10.4327C154.055 10.8165 154.055 11.2004 154.055 11.5842C154.055 12.096 154.055 12.4799 154.055 12.9917V39.7334C154.055 40.2452 154.055 40.6291 154.055 41.1409C154.055 41.5247 154.055 41.9086 154.055 42.2924C154.055 43.0601 153.926 43.8278 153.796 44.7235C153.667 45.4912 153.408 46.131 153.148 46.8987C152.76 47.5384 152.371 48.1782 151.853 48.69C151.335 49.2018 150.687 49.7136 150.039 49.9695C149.391 50.3533 148.614 50.6092 147.836 50.6092C147.059 50.7372 146.281 50.8651 145.374 50.8651C144.986 50.8651 144.597 50.8651 144.208 50.8651H142.783H10.8837Z" fill="white"/>
                        <path d="M32.3918 26.2986C32.3918 23.9955 33.5579 21.9483 35.6309 20.7967C34.3353 19.0054 32.3918 17.9818 30.1891 17.9818C27.9865 17.7259 25.7838 19.2613 24.6177 19.2613C23.4516 19.2613 21.6377 17.9818 19.6942 17.9818C17.2324 18.1097 14.9002 19.3892 13.6045 21.5644C11.0132 26.0427 12.9567 32.5682 15.4185 36.1508C16.7141 37.9421 18.1394 39.8614 20.0829 39.8614C21.8968 39.7334 22.6742 38.7098 24.8769 38.7098C27.0795 38.7098 27.7273 39.8614 29.6708 39.8614C31.6144 39.8614 32.91 38.0701 34.2057 36.2787C35.1127 34.9992 35.7605 33.5918 36.2788 32.1843C33.9466 31.1607 32.3918 28.8576 32.3918 26.2986Z" fill="black"/>
                        <path d="M28.764 15.5507C29.8005 14.2712 30.4484 12.6078 30.3188 10.9445C28.5049 11.0724 26.9501 11.8401 25.9135 13.1196C24.877 14.3991 24.2291 15.9345 24.3587 17.5979C26.0431 17.5979 27.5979 16.8302 28.764 15.5507Z" fill="black"/>
                        <path d="M54.8069 35.5109H48.7173L47.292 39.8613H44.7007L50.5312 23.9954H53.1226L58.9531 39.8613H56.3617L54.8069 35.5109ZM49.3651 33.5917H54.2887L51.8269 26.5544H51.6973L49.3651 33.5917Z" fill="black"/>
                        <path d="M71.521 34.1036C71.521 37.6862 69.5775 39.9893 66.5975 39.9893C65.0427 40.1173 63.6174 39.2216 62.9696 37.9421V43.6999H60.5078V28.3458H62.84V30.265C63.6174 28.9855 65.0427 28.2178 66.5975 28.2178C69.448 28.0899 71.521 30.5209 71.521 34.1036ZM68.9297 34.1036C68.9297 31.8005 67.7636 30.265 65.8201 30.265C64.0061 30.265 62.7105 31.8005 62.7105 34.1036C62.7105 36.4067 64.0061 37.9421 65.8201 37.9421C67.7636 37.9421 68.9297 36.4067 68.9297 34.1036Z" fill="black"/>
                        <path d="M84.3482 34.1036C84.3482 37.6862 82.4047 39.9893 79.4246 39.9893C77.8698 40.1173 76.4446 39.2216 75.7967 37.9421V43.6999H73.335V28.3458H75.6672V30.265C76.4446 28.9855 77.8698 28.2178 79.4246 28.2178C82.4047 28.0899 84.3482 30.5209 84.3482 34.1036ZM81.8864 34.1036C81.8864 31.8005 80.7203 30.265 78.7768 30.265C76.9628 30.265 75.6672 31.8005 75.6672 34.1036C75.6672 36.4067 76.9628 37.9421 78.7768 37.9421C80.7203 37.9421 81.8864 36.4067 81.8864 34.1036Z" fill="black"/>
                        <path d="M92.8999 35.383C93.0295 36.9184 94.5843 37.942 96.7869 37.942C98.86 37.942 100.285 36.9184 100.285 35.511C100.285 34.2315 99.3783 33.5917 97.3052 33.0799L95.2321 32.5681C92.2521 31.8004 90.9564 30.5209 90.9564 28.3457C90.9564 25.6588 93.4182 23.7395 96.7869 23.7395C100.156 23.7395 102.488 25.6588 102.617 28.3457H100.156C100.026 26.8103 98.7304 25.7867 96.7869 25.7867C94.8434 25.7867 93.5477 26.8103 93.5477 28.2178C93.5477 29.3693 94.4547 30.0091 96.5278 30.5209L98.3417 30.9047C101.581 31.6725 103.006 32.952 103.006 35.2551C103.006 38.1979 100.674 40.1172 96.7869 40.1172C93.159 40.1172 90.8268 38.3259 90.6973 35.383H92.8999Z" fill="black"/>
                        <path d="M107.93 25.5308V28.2177H110.132V30.137H107.93V36.5345C107.93 37.5581 108.318 37.942 109.355 37.942C109.614 37.942 109.873 37.942 110.132 37.942V39.8613C109.744 39.9892 109.225 39.9892 108.837 39.9892C106.504 39.9892 105.597 39.0936 105.597 36.9184V30.2649H103.913V28.3457H105.597V25.6587H107.93V25.5308Z" fill="black"/>
                        <path d="M111.557 34.1035C111.557 30.5209 113.76 28.2178 117.129 28.2178C120.497 28.2178 122.7 30.5209 122.7 34.1035C122.7 37.8141 120.497 39.9893 117.129 39.9893C113.63 39.9893 111.557 37.6861 111.557 34.1035ZM120.238 34.1035C120.238 31.5445 119.072 30.137 117.129 30.137C115.185 30.137 114.019 31.5445 114.019 34.1035C114.019 36.6625 115.185 38.07 117.129 38.07C119.072 38.07 120.238 36.5346 120.238 34.1035Z" fill="black"/>
                        <path d="M124.644 28.2177H126.976V30.2649C127.235 28.9854 128.531 28.0898 129.826 28.2177C130.085 28.2177 130.345 28.2177 130.604 28.3457V30.5208C130.215 30.3929 129.826 30.3929 129.567 30.3929C128.271 30.3929 127.105 31.4165 127.105 32.696C127.105 32.824 127.105 32.9519 127.105 33.0799V39.9892H124.644V28.2177Z" fill="black"/>
                        <path d="M141.747 36.4066C141.487 38.4539 139.285 39.9893 136.693 39.9893C133.325 39.9893 131.122 37.6862 131.122 34.1035C131.122 30.5209 133.195 28.0898 136.564 28.0898C139.803 28.0898 141.876 30.265 141.876 33.8476V34.6153H133.584V34.7433C133.454 36.4066 134.62 37.8141 136.305 38.07C136.434 38.07 136.564 38.07 136.693 38.07C137.86 38.198 139.026 37.5582 139.414 36.4066H141.747ZM133.584 32.952H139.414C139.544 31.4166 138.248 30.1371 136.693 30.0091C136.564 30.0091 136.564 30.0091 136.434 30.0091C134.88 30.0091 133.584 31.2886 133.584 32.952Z" fill="black"/>
                        <path d="M48.9765 11.968C50.92 11.8401 52.4748 13.2475 52.6043 15.0389C52.6043 15.2948 52.6043 15.4227 52.6043 15.6786C52.6043 18.1097 51.3087 19.5171 48.9765 19.5171H46.126V11.8401H48.9765V11.968ZM47.4216 18.6215H48.8469C50.1426 18.7494 51.3087 17.7258 51.4382 16.3184C51.4382 16.1904 51.4382 15.9345 51.4382 15.8066C51.5678 14.5271 50.6608 13.2475 49.3652 13.1196C49.2356 13.1196 49.106 13.1196 48.8469 13.1196H47.4216V18.6215Z" fill="black"/>
                        <path d="M54.0295 16.7023C53.8999 15.1669 54.9364 13.8874 56.4912 13.7594C58.046 13.6315 59.3417 14.6551 59.4713 16.1905C59.4713 16.3184 59.4713 16.5744 59.4713 16.7023C59.6009 18.2377 58.5643 19.5172 57.0095 19.6452C55.4547 19.7731 54.159 18.7495 54.0295 17.2141C54.0295 17.0862 54.0295 16.9582 54.0295 16.7023ZM58.3052 16.7023C58.3052 15.4228 57.7869 14.783 56.7504 14.783C55.7138 14.783 55.1956 15.5507 55.1956 16.7023C55.1956 17.9818 55.7138 18.7495 56.7504 18.7495C57.7869 18.7495 58.3052 17.9818 58.3052 16.7023Z" fill="black"/>
                        <path d="M66.8566 19.6451H65.6905L64.5244 15.4227H64.3948L63.2287 19.6451H62.0626L60.5078 13.8873H61.6739L62.7105 18.2377H62.84L64.0061 13.8873H65.1722L66.3383 18.2377H66.4679L67.5044 13.8873H68.6705L66.8566 19.6451Z" fill="black"/>
                        <path d="M69.8369 13.8873H71.003V14.783H71.1326C71.3917 14.1432 72.1691 13.7594 72.817 13.7594C73.8535 13.6314 74.7605 14.3991 74.89 15.5507C74.89 15.6786 74.89 15.8066 74.89 15.9345V19.6451H73.7239V16.1905C73.7239 15.2948 73.3352 14.783 72.4283 14.783C71.6509 14.783 71.003 15.2948 71.003 16.0625C71.003 16.1905 71.003 16.1905 71.003 16.3184V19.6451H69.8369V13.8873Z" fill="black"/>
                        <path d="M76.5742 11.5842H77.7403V19.6451H76.5742V11.5842Z" fill="black"/>
                        <path d="M79.2951 16.7023C79.1655 15.1669 80.2021 13.8874 81.7569 13.7594C83.3117 13.6315 84.6073 14.6551 84.7369 16.1905C84.7369 16.3184 84.7369 16.5744 84.7369 16.7023C84.8665 18.2377 83.8299 19.5172 82.2751 19.6452C80.7203 19.7731 79.4247 18.7495 79.2951 17.2141C79.2951 17.0862 79.2951 16.9582 79.2951 16.7023ZM83.7004 16.7023C83.7004 15.4228 83.1821 14.783 82.1456 14.783C81.109 14.783 80.5908 15.5507 80.5908 16.7023C80.5908 17.9818 81.109 18.7495 82.1456 18.7495C83.0525 18.7495 83.7004 17.9818 83.7004 16.7023Z" fill="black"/>
                        <path d="M86.0329 17.9818C86.0329 16.9582 86.8103 16.3184 88.2355 16.3184L89.7903 16.1905V15.6787C89.7903 15.0389 89.4016 14.783 88.6242 14.783C87.9764 14.783 87.5877 15.0389 87.4581 15.4228H86.292C86.4216 14.3992 87.3286 13.7594 88.6242 13.7594C90.0495 13.7594 90.9564 14.5271 90.9564 15.6787V19.6451H89.7903V18.8774H89.6608C89.2721 19.5172 88.6242 19.7731 87.8468 19.7731C86.9399 19.901 86.0329 19.1333 85.9033 18.2377C86.0329 18.1097 86.0329 18.1097 86.0329 17.9818ZM89.7903 17.47V16.9582L88.3651 17.0861C87.5877 17.0861 87.199 17.47 87.199 17.8538C87.199 18.3656 87.7173 18.6215 88.2355 18.6215C89.0129 18.8774 89.6608 18.3656 89.7903 17.47C89.7903 17.5979 89.7903 17.5979 89.7903 17.47Z" fill="black"/>
                        <path d="M92.3813 16.7023C92.3813 14.911 93.2883 13.7594 94.8431 13.7594C95.6205 13.7594 96.2684 14.1432 96.6571 14.783H96.7866V11.5842H97.9527V19.6451H96.7866V18.7495H96.6571C96.2684 19.3892 95.6205 19.7731 94.8431 19.7731C93.4179 19.7731 92.3813 18.6215 92.3813 16.7023ZM93.677 16.7023C93.677 17.9818 94.3249 18.6215 95.2318 18.6215C96.1388 18.6215 96.7866 17.8538 96.7866 16.7023C96.7866 15.5507 96.1388 14.783 95.2318 14.783C94.1953 14.783 93.677 15.5507 93.677 16.7023Z" fill="black"/>
                        <path d="M102.617 16.7023C102.488 15.1669 103.524 13.8874 105.079 13.7594C106.634 13.6315 107.93 14.6551 108.059 16.1905C108.059 16.3184 108.059 16.5744 108.059 16.7023C108.189 18.2377 107.152 19.5172 105.597 19.6452C104.043 19.7731 102.747 18.7495 102.617 17.2141C102.617 17.0862 102.617 16.9582 102.617 16.7023ZM107.023 16.7023C107.023 15.4228 106.504 14.783 105.468 14.783C104.431 14.783 103.913 15.5507 103.913 16.7023C103.913 17.9818 104.431 18.7495 105.468 18.7495C106.375 18.7495 107.023 17.9818 107.023 16.7023Z" fill="black"/>
                        <path d="M109.744 13.8873H110.91V14.783H111.039C111.298 14.1432 112.076 13.7594 112.724 13.7594C113.76 13.6314 114.667 14.3991 114.797 15.5507C114.797 15.6786 114.797 15.8066 114.797 15.9345V19.6451H113.631V16.1905C113.631 15.2948 113.242 14.783 112.335 14.783C111.558 14.783 110.91 15.2948 110.91 16.0625C110.91 16.1905 110.91 16.1905 110.91 16.3184V19.6451H109.744V13.8873Z" fill="black"/>
                        <path d="M121.146 12.4799V13.8873H122.441V14.9109H121.146V17.8538C121.146 18.4935 121.405 18.7495 121.923 18.7495C122.052 18.7495 122.182 18.7495 122.312 18.7495V19.6451C122.052 19.6451 121.923 19.6451 121.664 19.6451C120.368 19.6451 119.85 19.2613 119.85 18.1097V14.9109H118.943V14.0153H119.85V12.4799H121.146Z" fill="black"/>
                        <path d="M123.996 11.5842H125.162V14.783H125.292C125.551 14.1432 126.328 13.6314 127.106 13.7594C128.142 13.7594 129.049 14.5271 129.179 15.5507C129.179 15.6787 129.179 15.8066 129.179 15.9346V19.6451H128.013V16.1905C128.013 15.2948 127.624 14.783 126.717 14.783C125.94 14.783 125.292 15.2948 125.292 16.0625C125.292 16.1905 125.292 16.1905 125.292 16.3184V19.6451H124.126L123.996 11.5842Z" fill="black"/>
                        <path d="M135.787 18.1097C135.527 19.1333 134.361 19.901 133.195 19.7731C131.77 19.7731 130.474 18.6215 130.474 17.2141C130.474 17.0861 130.474 16.9581 130.474 16.8302C130.215 15.4227 131.252 14.0153 132.806 13.8873C132.936 13.8873 133.066 13.8873 133.195 13.8873C134.88 13.8873 135.787 15.0389 135.787 16.8302V17.2141H131.64C131.511 18.1097 132.159 18.7495 133.066 18.8774H133.195C133.713 19.0054 134.361 18.6215 134.62 18.2377L135.787 18.1097ZM131.64 16.1904H134.62C134.62 15.4227 134.102 14.783 133.325 14.655H133.195C132.418 14.783 131.64 15.4227 131.64 16.1904Z" fill="black"/>
                        </svg>
                    </Link>
                </div>
            </nav>
        </section>
    </footer>
    )
}