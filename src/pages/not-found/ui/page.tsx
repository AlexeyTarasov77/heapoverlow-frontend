import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="text-8xl bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-400 inline-block text-transparent bg-clip-text">
        404
      </div>
      <div>
        <p className="text-lg text-slate-500">
          Ooops... Sorry we are unable to found the requested page
        </p>
      </div>
      <div className="mt-4">
        <Link to="/" className="rounded-lg bg-blue-500 text-white text-xl p-3">
          Go Home
        </Link>
      </div>
    </div>
  );
}
