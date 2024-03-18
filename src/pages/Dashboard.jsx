import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const [ordersData, setOrdersData] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  
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
    <section className="bg-secondary py-4 min-h-screen">
      <h1 className="text-center font-bold text-2xl text-primary border-b-2 border-gray-900 py-4 pt-2">{t("Dashboard")}</h1>
      <div className="overflow-x-auto overflow-y-hidden w-10/12 xl:overflow-hidden mx-auto 2xl:max-w-[1800px] 2xl:mx-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="uppercase">
              <th>{t("ID")}</th>
              <th>{t("type")}</th>
              <th>{t("Order Date")}</th>
              <th>{t("implementation Date")}</th>
              <th>{t("model")}</th>
              <th>{t("year")}</th>
              <th>{t("status")}</th>
              {/* <th>{t("Reason for rejection")}</th> */}
              <th>{t("Details")}</th>
 
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {ordersData.map((order, i) => {
              return (
              <tr key={order.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">#{order.id}</div>
                    </div>
                  </div>
                </td>

                <td>
                  {order.type}
                  <br />
                  <span className="badge badge-ghost badge-sm text-sm hidden text-accent cursor-pointer xl:inline-flex p-4 bg-primary">
                    {order.typeText}
                  </span>
                </td>

                <td>{order.orderDate}</td>
                
                <td>{order.implementation_date}</td>
                
                <td>{order.model}</td>
                
                <td>{order.year}</td>
                
                <td> <span className={order.status == "تم قبول الطلب" ? "bg-green-800 text-accent rounded-full p-3 cursor-pointer block w-28 text-center" : order.status == "قيد الانتظار" ? "bg-base-100 text-accent rounded-full p-3 cursor-pointer block w-28 text-center" :  "bg-red-800 text-accent rounded-full p-3 cursor-pointer block w-28 text-center"}>{order.status}</span></td>

                {/* <td>{order.cancelledReason}</td> */}
           
                <td>
                  <button className="btn btn-ghost btn-xs bg-primary text-accent" onClick={()=> openModel(order)}>{t("details")}</button>
                </td>

                
              </tr>
              )
            })}
          </tbody>
        </table>

        <dialog id="my_modal_2" className="modal">
          {selectedOrder && (<div className="modal-box sm:grid sm:grid-cols-2 flex flex-col gap-4">
            {/* <h2 className="font-bold text-lg my-0">ID: #{selectedOrder.id}</h2> */}
            <div className="col-start-1">
              <h3 className="font-bold text-lg my-1">{t("Service")} :</h3>
              <input type="text" readOnly  value={selectedOrder.typeText} className="input input-bordered w-full max-w-xs sm:max-w-none" />
            </div>

            <div>
              <h3 className="font-bold text-lg my-1">{t("Order Date")} :</h3>
              <input type="text" readOnly  value={selectedOrder.orderDate} className="input input-bordered w-full max-w-xs sm:max-w-none" />
            </div>

            <div>
              <h3 className="font-bold text-lg my-1">{t("Implementation Date")} :</h3>
              <input type="text" readOnly  value={selectedOrder.implementation_date} className="input input-bordered w-full max-w-xs sm:max-w-none" />
            </div>

            <div>
              <h3 className="font-bold text-lg my-1">{t("Model")} :</h3>
              <input type="text" readOnly  value={selectedOrder.model} className="input input-bordered w-full max-w-xs sm:max-w-none" />
            </div>

            <div>
              <h3 className="font-bold text-lg my-1">{t("Year")} :</h3>
              <input type="text" readOnly  value={selectedOrder.year} className="input input-bordered w-full max-w-xs sm:max-w-none" />
            </div>

            <div>
              <h3 className="font-bold text-lg my-1">{t("Status")} :</h3>
              <input type="text" readOnly  value={selectedOrder.status} className="input input-bordered w-full max-w-xs sm:max-w-none" />
            </div>

            <div className="col-start-1 col-end-3">
              <h3 className="font-bold text-lg my-1">{t("Description")} :</h3>
              <textarea readOnly value={selectedOrder.description} className="textarea textarea-bordered w-full max-w-xs sm:max-w-none" />
            </div>

            <div className="col-span-2">
              <h3 className="font-bold text-lg my-1">{t("Notes")} :</h3>
              <textarea readOnly value={selectedOrder.notes} className="textarea textarea-bordered w-full max-w-xs sm:max-w-none" />
            </div>

            <div className="col-span-2">
              <h3 className="font-bold text-lg my-1">{t("Message")} :</h3>
              <textarea readOnly value={selectedOrder.message} className="textarea textarea-bordered w-full max-w-xs sm:max-w-none" />
            </div>

            {selectedOrder.cancelledReason !== "" && <div className="col-span-2">
              <h3 className="font-bold text-lg my-1">{t("Reason for rejection")} :</h3>
              <textarea readOnly value={selectedOrder.cancelledReason} className="textarea textarea-bordered w-full max-w-xs sm:max-w-none" />
            </div>}

            {selectedOrder.type === "License" && 
            ( <>
                <div>
                  <h3 className="font-bold text-lg my-1">{t("City")} :</h3>
                  <input type="text" readOnly  value={selectedOrder.items.city} className="input input-bordered w-full max-w-xs sm:max-w-none" />
                </div>

                <div>
                  <h3 className="font-bold text-lg my-1">{t("License Date")} :</h3>
                  <input type="text" readOnly  value={selectedOrder.items.license_date} className="input input-bordered w-full max-w-xs sm:max-w-none" />
                </div>

                <div>
                  <h3 className="font-bold text-lg my-1">{t("Region")} :</h3>
                  <input type="text" readOnly  value={selectedOrder.items.region} className="input input-bordered w-full max-w-xs sm:max-w-none" />
                </div>
              </>
            )}

            {selectedOrder.type === "Maintenance" && 
            (<>
              {selectedOrder.items.consumerParts.length > 0 && <div className="col-span-2">
                <h3 className="font-bold text-lg my-1">{t("Consumer Parts")} :</h3>
                <ul className="menu bg-base-200 w-full rounded-xl p-4">
                  {selectedOrder.items.consumerParts.map((item, i) => {
                    console.log(item)
                    return (
                      <li key={i}>{i+1} - {item}</li>
                    )
                  })}
                </ul>
              </div>}

              {selectedOrder.items.brakes.length > 0 && <div>
                <h3 className="font-bold text-lg my-1">{t("Brakes")} :</h3>
                <ul className="menu bg-base-200 w-56 rounded-xl p-4">
                  {selectedOrder.items.brakes.map((item, i) => {
                    console.log(item)
                    return (
                      <li key={i}>{i+1} - {item}</li>
                    )
                  })}
                </ul>
              </div>}

              {selectedOrder.items.oils.length > 0  && <div>
                <h3 className="font-bold text-lg my-1">{t("Oils")} :</h3>
                <ul className="menu bg-base-200 w-56 rounded-xl p-4">
                  {selectedOrder.items.oils.map((item, i) => {
                    console.log(item)
                    return (
                      <li key={i}>{i+1} - {item}</li>
                    )
                  })}
                </ul>
              </div>}

              {selectedOrder.items.frames.length > 0  && <div>
                <h3 className="font-bold text-lg my-1">{t("Frames")} :</h3>
                <ul className="menu bg-base-200 w-56 rounded-xl p-4">
                  {selectedOrder.items.frames.map((item, i) => {
                    console.log(item)
                    return (
                      <li key={i}>{i+1} - {item}</li>
                    )
                  })}
                </ul>
              </div>}

              {selectedOrder.items.repairTypes.length > 0 && <div>
                <h3 className="font-bold text-lg my-1">{t("Repair Types")} :</h3>
                <ul className="menu bg-base-200 w-56 rounded-xl p-4">
                  {selectedOrder.items.repairTypes.map((item, i) => {
                    console.log(item)
                    return (
                      <li key={i}>{i+1} - {item}</li>
                    )
                  })}
                </ul>
              </div>}
            </>
            )}

            <button className={`btn bg-primary text-accent w-full mt-2 ${selectedOrder.type === "License" ? "self-end" : "col-span-2"}`} onClick={() => closeModel()}>{t("close")}</button>

          </div>)}
          <form method="dialog" className="modal-backdrop">
            <button className="" onClick={() => closeModel()}>{t("close")}</button>
          </form>
        </dialog>
      </div>
    </section>
  );
}
