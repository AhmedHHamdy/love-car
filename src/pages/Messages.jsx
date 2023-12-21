import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useTranslation } from "react-i18next";

export default function Messages() {
  const [ordersData, setOrdersData] = useState([])
  const [selectedOrder, setSelectedOrder] = useState({
    "id": 135,
    "type": "License",
    "typeText": "طلب ترخيص سيارة",
    "orderDate": "2023-12-21",
    "implementation_date": "لم يتم تحديد موعد",
    "model": "BMW M6",
    "year": "2024",
    "status": "قيد الانتظار",
    "cancelledReason": "",
    "date": "2023-12-21",
    "description": "test",
    "notes": "testtestestset",
    "items": {
        "city": "Riyadh",
        "region": "Riyadh",
        "license_date": "2023-12-08"
    }
  })
  
  const [loadingStatus, setLoadingStatus] = useState(true)
  const [error, setError] = useState(null)

  const { t } = useTranslation()

  const { token } = useAuth()

  console.log(selectedOrder)


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
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/myCarOrders`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        })
        const data = await response.data.data
        setLoadingStatus(false)
        console.log(response)
        console.log(data)
        setOrdersData(data.carOrders)
      } catch (err) {
        setLoadingStatus(false)
        console.log(err)
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
    <section className="bg-secondary py-4 ">
      <h1 className="text-center font-bold text-2xl text-primary border-b-2 border-gray-900 py-4 pt-2">{t("Messages")}</h1>
      <div className="w-10/12 mx-auto">

        
      {ordersData.map((order, item) => {
        return (
          <div className="flex justify-center" >
            {selectedOrder && (<div className="modal-box flex-col  sm:max-w-full flex sm:grid sm:grid-cols-12 xl:flex md:flex-row gap-4">
            {/* <h2 className="font-bold text-lg my-0">ID: #{selectedOrder.id}</h2> */}

            <div className="sm:col-start-1 sm:col-span-6">
              <h3 className="font-bold text-lg my-1">{t("Request ID")} :</h3>
              <input type="text" readOnly value={`# ${order.id}`} className="input input-bordered w-full sm:max-w-none" />
            </div>


            <div className="col-start-1 sm:col-span-6">
              <h3 className="font-bold text-lg my-1">{t("Service")} :</h3>
              <input type="text" readOnly value={order.typeText} className="input input-bordered w-full sm:max-w-none" />
            </div>

            <div className="sm:col-span-6">
              <h3 className="font-bold text-lg my-1">{t("Order Date")} :</h3>
              <input type="text" readOnly value={order.orderDate} className="input input-bordered w-full sm:max-w-none" />
            </div>

            <div className="sm:col-span-6">
              <h3 className="font-bold text-lg my-1">{t("Implementation Date")} :</h3>
              <input type="text" readOnly value={order.implementation_date} className="input input-bordered w-full sm:max-w-none" />
            </div>


            <div className="sm:col-span-12">
              <h3 className="font-bold text-lg my-1">{t("Status")} :</h3>
              <input type="text" readOnly value={order.status} className="input input-bordered w-full sm:max-w-none" />
            </div>

            {/* {order.cancelledReason !== "" && <div className="col-span-2">
              <h3 className="font-bold text-lg my-1">{t("Reason for rejection")} :</h3>
              <textarea readOnly value={order.cancelledReason} className="textarea textarea-bordered w-full  sm:max-w-none" />
            </div>} */}

          </div>)}
        </div>
        )
      })}
       
      </div>
    </section>
  );
}
