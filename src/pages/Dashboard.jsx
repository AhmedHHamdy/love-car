import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";

export default function Dashboard() {
  const [ordersData, setOrdersData] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  
  const [loadingStatus, setLoadingStatus] = useState(true)
  const [error, setError] = useState(null)

  const { token } = useAuth()

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
    <section className="bg-secondary py-4">
      <div className="overflow-x-auto overflow-y-hidden w-10/12 xl:overflow-hidden mx-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="uppercase">
              <th>ID</th>
              <th>type</th>
              <th>Order Date</th>
              <th>implementation Date</th>
              <th>model</th>
              <th>year</th>
              <th>status</th>
              <th>Details</th>
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
                  <span className="badge badge-ghost badge-sm text-sm hidden xl:inline-flex p-4 bg-primary">
                    {order.typeText}
                  </span>
                </td>

                <td>{order.orderDate}</td>
                
                <td>{order.implementation_date}</td>
                
                <td>{order.model}</td>
                
                <td>{order.year}</td>
                
                <td>{order.status}</td>
           
                <td>
                  <button className="btn btn-ghost btn-xs bg-primary" onClick={()=> openModel(order)}>details</button>
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
              <h3 className="font-bold text-lg my-1">Service:</h3>
              <input type="text" readOnly  value={selectedOrder.typeText} className="input input-bordered w-full max-w-xs sm:max-w-none" />
            </div>

            <div>
              <h3 className="font-bold text-lg my-1">Order Date:</h3>
              <input type="text" readOnly  value={selectedOrder.orderDate} className="input input-bordered w-full max-w-xs sm:max-w-none" />
            </div>

            <div>
              <h3 className="font-bold text-lg my-1">Implementation Date:</h3>
              <input type="text" readOnly  value={selectedOrder.implementation_date} className="input input-bordered w-full max-w-xs sm:max-w-none" />
            </div>

            <div>
              <h3 className="font-bold text-lg my-1">Model:</h3>
              <input type="text" readOnly  value={selectedOrder.model} className="input input-bordered w-full max-w-xs sm:max-w-none" />
            </div>

            <div>
              <h3 className="font-bold text-lg my-1">Year:</h3>
              <input type="text" readOnly  value={selectedOrder.year} className="input input-bordered w-full max-w-xs sm:max-w-none" />
            </div>

            <div>
              <h3 className="font-bold text-lg my-1">Status:</h3>
              <input type="text" readOnly  value={selectedOrder.status} className="input input-bordered w-full max-w-xs sm:max-w-none" />
            </div>

            <div className="col-start-1 col-end-3">
              <h3 className="font-bold text-lg my-1">Description:</h3>
              <textarea readOnly value={selectedOrder.description} className="textarea textarea-bordered w-full max-w-xs sm:max-w-none" />
            </div>

            <div className="col-span-2">
              <h3 className="font-bold text-lg my-1">Notes:</h3>
              <textarea readOnly value={selectedOrder.notes} className="textarea textarea-bordered w-full max-w-xs sm:max-w-none" />
            </div>

            {selectedOrder.type === "License" && 
            ( <>
                <div>
                  <h3 className="font-bold text-lg my-1">City:</h3>
                  <input type="text" readOnly  value={selectedOrder.items.city} className="input input-bordered w-full max-w-xs sm:max-w-none" />
                </div>

                <div>
                  <h3 className="font-bold text-lg my-1">License Date:</h3>
                  <input type="text" readOnly  value={selectedOrder.items.license_date} className="input input-bordered w-full max-w-xs sm:max-w-none" />
                </div>

                <div>
                  <h3 className="font-bold text-lg my-1">Region:</h3>
                  <input type="text" readOnly  value={selectedOrder.items.region} className="input input-bordered w-full max-w-xs sm:max-w-none" />
                </div>
              </>
            )}

            {selectedOrder.type === "Maintenance" && 
            (<>
              <div className="col-span-2">
                <h3 className="font-bold text-lg my-1">Consumer Parts:</h3>
                <ul className="menu bg-base-200 w-full rounded-xl p-4">
                  {selectedOrder.items.consumerParts.map((item, i) => {
                    console.log(item)
                    return (
                      <li key={item.id}>{item.id} - {item.name}</li>
                    )
                  })}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg my-1">Brakes:</h3>
                <ul className="menu bg-base-200 w-56 rounded-xl p-4">
                  {selectedOrder.items.brakes.map((item, i) => {
                    console.log(item)
                    return (
                      <li key={item.id}>{item.id} - {item.name}</li>
                    )
                  })}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg my-1">Oils:</h3>
                <ul className="menu bg-base-200 w-56 rounded-xl p-4">
                  {selectedOrder.items.oils.map((item, i) => {
                    console.log(item)
                    return (
                      <li key={item.id}>{item.id} - {item.name}</li>
                    )
                  })}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg my-1">Frames:</h3>
                <ul className="menu bg-base-200 w-56 rounded-xl p-4">
                  {selectedOrder.items.frames.map((item, i) => {
                    console.log(item)
                    return (
                      <li key={item.id}>{item.id} - {item.name}</li>
                    )
                  })}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg my-1">Repair Types:</h3>
                <ul className="menu bg-base-200 w-56 rounded-xl p-4">
                  {selectedOrder.items.repairTypes.map((item, i) => {
                    console.log(item)
                    return (
                      <li key={item.id}>{item.id} - {item.name}</li>
                    )
                  })}
                </ul>
              </div>
            </>
            )}

            <button className={`btn bg-primary text-accent w-full mt-2 ${selectedOrder.type === "License" ? "self-end" : "col-span-2"}`} onClick={() => closeModel()}>close</button>

          </div>)}
          <form method="dialog" className="modal-backdrop">
            <button className="" onClick={() => closeModel()}>close</button>
          </form>
        </dialog>
      </div>
    </section>
  );
}
