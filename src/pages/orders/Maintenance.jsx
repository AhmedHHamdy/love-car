export default function Maintenance() {
    return (
      <section className="bg-secondary p-10">
        <h1 className="text-center">Maintenance</h1>
        <form>
            <select className="select select-primary w-full max-w-xs">
                <option disabled selected>What is the best TV show?</option>
                <option>Game of Thrones</option>
                <option>Lost</option>
                <option>Breaking Bad</option>
                <option>Walking Dead</option>
            </select>
            <input type="text" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
        </form>
      </section>
    )
  }