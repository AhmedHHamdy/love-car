import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center gap-10 h-screen bg-secondary">
            <h1 className="text-3xl">Page Not Found</h1>
            <Link className="btn btn-primary text-accent text-xl" to="/">Home</Link>
        </div>
    )
}