export default function Maintenance() {
    return (
      <section className="bg-secondary p-10">
        <section className="w-9/12 mx-auto flex flex-col justify-center items-center">
          <h1 className="text-center">Services</h1>
          <form className="grid grid-cols-12">
              <select className="select select-primary w-full max-w-xs col-start-1 col-span-3">
                  <option disabled selected>Type</option>
                  <option>maintenance</option>
                  <option>renewal</option>
                  <option>license Bad</option>
              </select>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Model</span>
                </div>
                <input type="text" placeholder="BMW 2023" className="input input-bordered w-full max-w-xs" />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Year</span>
                </div>
                <input type="text" placeholder="2023" className="input input-bordered w-full max-w-xs" />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Notes</span>
                </div>
                <textarea placeholder="Notes" className="textarea textarea-bordered h-24" />
              </label>

              
             <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Description</span>
                </div>
                <textarea placeholder="description" className="textarea textarea-bordered h-24" />
              </label>

              <select className="select select-primary w-full max-w-xs col-start-1 col-span-3">
                  <option disabled selected>Oils</option>
                  <option>maintenance</option>
                  <option>renewal</option>
                  <option>license</option>
              </select>

              <select className="select select-primary w-full max-w-xs col-start-1 col-span-3">
                  <option disabled selected>Frames</option>
                  <option>maintenance</option>
                  <option>renewal</option>
                  <option>license</option>
              </select>

              <select className="select select-primary w-full max-w-xs col-start-1 col-span-3">
                  <option disabled selected>Brakes</option>
                  <option>maintenance</option>
                  <option>renewal</option>
                  <option>license</option>
              </select>

              <select className="select select-primary w-full max-w-xs col-start-1 col-span-3">
                  <option disabled selected>consumer Parts</option>
                  <option>maintenance</option>
                  <option>renewal</option>
                  <option>license</option>
              </select>

              <select className="select select-primary w-full max-w-xs col-start-1 col-span-3">
                  <option disabled selected>repair Types</option>
                  <option>maintenance</option>
                  <option>renewal</option>
                  <option>license</option>
              </select>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">License Date</span>
                </div>
                <input type="date" placeholder="1/12/2023" className="input input-bordered w-full max-w-xs" />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">City</span>
                </div>
                <input type="text" placeholder="Saudi Arabia" className="input input-bordered w-full max-w-xs" />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Region</span>
                </div>
                <input type="text" placeholder="Riyadh" className="input input-bordered w-full max-w-xs" />
              </label>
          </form>
        </section>
      </section>
    )
  }