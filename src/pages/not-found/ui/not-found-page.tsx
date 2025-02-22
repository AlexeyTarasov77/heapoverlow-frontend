export function NotFoundPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-400 inline-block text-transparent bg-clip-text">
        404
      </div>
      <div>
        <p className="text-lg text-slate-500">
          Ooops... Sorry we are unable to found the requested page
        </p>
      </div>
      <div>
        <button className="rounded-lg bg-blue-500 text-white text-xl">
          Go Home
        </button>
      </div>
    </div>
  );
}
