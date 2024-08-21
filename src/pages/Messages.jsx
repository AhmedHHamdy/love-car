import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useTranslation } from "react-i18next";
import LinksContext from "../context/storeLinks";
import { FaWhatsapp } from "react-icons/fa";

export default function Messages() {
  const [ordersData, setOrdersData] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)

  
  const [loadingStatus, setLoadingStatus] = useState(true)
  const [error, setError] = useState(null)

  const { storeLinks } = useContext(LinksContext);

  const { t, i18n } = useTranslation()

  const { token } = useAuth()

  // console.log(selectedOrder)


  const openModel = (order) => {
    setSelectedOrder(order)
    document.getElementById("my_modal_2").showModal()
  }

  const closeModel = () => {
    setSelectedOrder(null)
    document.getElementById("my_modal_2").close()
  }

  useEffect(() => {
    async function loadData() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/users/notification`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        })
        const data = await response.data.data
        setLoadingStatus(false)
        console.log(response)
        // console.log(data)
        setOrdersData(data.notifications)
      } catch (err) {
        setLoadingStatus(false)
        // console.log(err)
        setError(err.message)
      }
    }
    loadData()
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
      <div className="flex justify-center items-center w-screen h-screen bg-secondary">
        <h1 className="bg-red-900 text-accent text-center uppercase rounded-lg p-4 text-lg">{error}</h1>
      </div>
    )
  }


  return (
    <section className="bg-secondary dark:bg-base-300 py-4 min-h-screen">
      <h1 className="text-center font-bold text-2xl text-primary border-b-2 border-gray-900 py-4 pt-2">{t("Messages")}</h1>
      <div className="w-10/12 mx-auto 2xl:max-w-[1800px] 2xl:mx-auto font-semibold">

        
      {ordersData.map((order, item) => {
        return (
          <div key={order.order_number} className="flex justify-center" >
            {order && (<div className="modal-box flex-col  sm:max-w-full flex sm:grid sm:grid-cols-12 gap-4">
            {/* <h2 className="font-bold text-lg my-0">ID: #{selectedOrder.id}</h2> */}

            <div className="sm:col-start-1 sm:col-span-4">
              <h3 className="font-bold text-lg my-1">{t("Request ID")} :</h3>
              <input type="text" readOnly value={`# ${order.order_number}`} className="input input-bordered w-full sm:max-w-none" />
            </div>

            <div className="sm:col-span-4">
              <h3 className="font-bold text-lg my-1">{t("Order Date")} :</h3>
              <input type="text" readOnly value={order.created_at} className="input input-bordered w-full sm:max-w-none" />
            </div>

            <div className="col-start-1 sm:col-span-4">
              <h3 className="font-bold text-lg my-1">{t("Service")} :</h3>
              <input type="text" readOnly value={order.title} className="input input-bordered w-full sm:max-w-none" />
            </div>


            <div className="sm:col-span-6">
              <h3 className="font-bold text-lg my-1">{t("Message")} :</h3>
              <input type="text" readOnly value={order.message} className="input input-bordered w-full sm:max-w-none capitalize" />
            </div>

 
            <button className={`btn bg-primary text-accent w-full mt-2 col-span-6 self-end`} onClick={()=> openModel(order)}>{t("details")}</button>
 

            {/* <div className="sm:col-span-6">
              <h3 className="font-bold text-lg my-1">{t("Implementation Date")} :</h3>
              <input type="text" readOnly value={order.implementation_date} className="input input-bordered w-full sm:max-w-none" />
            </div>


            <div className="sm:col-span-6">
              <h3 className="font-bold text-lg my-1">{t("Status")} :</h3>
              <input type="text" readOnly value={order.status} className="input input-bordered w-full sm:max-w-none capitalize" />
            </div>

            <div className="sm:col-span-6">
              <h3 className="font-bold text-lg my-1">{t("Cost")} :</h3>
              <input type="text" readOnly value={order.cost} className="input input-bordered w-full sm:max-w-none capitalize" />
            </div>


            {order.cancelledReason !== "" && <div className="col-span-12">
              <h3 className="font-bold text-lg my-1">{t("Reason for rejection")} :</h3>
              <textarea readOnly value={order.cancelledReason} className="textarea textarea-bordered w-full sm:max-w-none" />
            </div>} */}

          </div>)}


            <dialog id="my_modal_2" className="modal bg-secondary-100">
              {selectedOrder && (<div className="modal-box sm:grid sm:grid-cols-2 flex flex-col gap-4">
                {/* <h2 className="font-bold text-lg my-0">ID: #{selectedOrder.id}</h2> */}
                <div className="sm:col-start-1 sm:col-span-6">
                <h3 className="font-bold text-lg my-1">{t("Request ID")} :</h3>
                <input type="text" readOnly value={`# ${selectedOrder.order_number}`} className="input input-bordered w-full sm:max-w-none" />
              </div>

              <div className="sm:col-span-6">
                <h3 className="font-bold text-lg my-1">{t("Order Date")} :</h3>
                <input type="text" readOnly value={selectedOrder.created_at} className="input input-bordered w-full sm:max-w-none" />
              </div>

              <div className="col-start-1 sm:col-span-6">
                <h3 className="font-bold text-lg my-1">{t("Service")} :</h3>
                <input type="text" readOnly value={selectedOrder.title} className="input input-bordered w-full sm:max-w-none" />
              </div>


              <div className="sm:col-span-6">
                <h3 className="font-bold text-lg my-1">{t("Implementation Date")} :</h3>
                <input type="text" readOnly value={selectedOrder.implementation_date} className="input input-bordered w-full sm:max-w-none" />
              </div>


              <div className="sm:col-span-6">
                <h3 className="font-bold text-lg my-1">{t("Status")} :</h3>
                <input type="text" readOnly value={selectedOrder.status} className="input input-bordered w-full sm:max-w-none capitalize" />
              </div>

              <div className="sm:col-span-6">
                <h3 className="font-bold text-lg my-1">{t("Cost")} :</h3>
                <input type="text" readOnly value={selectedOrder.cost} className="input input-bordered w-full sm:max-w-none capitalize" />
              </div>

              <div className="sm:col-span-12">
                <h3 className="font-bold text-lg my-1">{t("Message")} :</h3>
                <input type="text" readOnly value={selectedOrder.message} className="input input-bordered w-full sm:max-w-none capitalize" />
              </div>

              <div className="sm:col-span-12">
                <h3 className="font-bold text-lg my-1">{t("Action")} :</h3>
                <input type="text" readOnly value={selectedOrder.action} className="input input-bordered w-full sm:max-w-none capitalize" />
              </div>

              {selectedOrder.cancelledReason !== "" && <div className="col-span-12">
                <h3 className="font-bold text-lg my-1">{t("Reason for rejection")} :</h3>
                <textarea readOnly value={selectedOrder.cancelledReason} className="textarea textarea-bordered w-full sm:max-w-none" />
              </div>}
              

              <button className={`btn bg-primary text-accent w-full mt-2 col-span-12`} onClick={() => closeModel()}>{t("close")}</button>

            </div>)}
            <form method="dialog" className="modal-backdrop">
              <button className="" onClick={() => closeModel()}>{t("close")}</button>
            </form>
          </dialog>
        </div>
        )
      })}
       
      </div>

      <section className={`bg-green-500 fixed h-12 w-12 bottom-10 ${i18n.language == "en" ? "right-10" : "left-10"}  cursor-pointer rounded-full flex items-center justify-center drop-shadow-2xl`}>
        <a href={storeLinks?.socialMedia?.whatsapp} className="" target="_blank"><FaWhatsapp className="text-white text-4xl sm:text-4xl" /></a>
      </section>
    </section>
  );
}
