import { Link } from "react-router-dom";
const NotFoundPage = () => {
  return (
    <div className="overflow-x-hidden h-screen">
      <div
        className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-white "
        style={{ backgroundImage: `url('/404.png')` }}
      >
        <header className="absolute top-0 left-0 p-5 bg-black w-full ">
          <Link to={"/"}>
            <img src="/netflix-logo.png" alt="Netflix" className="h-8" />
          </Link>
        </header>
        <main className="text-center error-page--content z-10">
          <h1 className="text-7xl font-semibold mb-10 ">Lost your way?</h1>
          <p className="mb-8 text-xl">
            Sorry, we can not find that page. You will find lots to explore on
            the home <br />
            page.
          </p>
          <Link
            to={"/"}
            className="bg-white text-black py-2 px-4 rounded  hover:fill-"
          >
            Netflix Home
          </Link>
        </main>
      </div>
    </div>
  );
};

export default NotFoundPage;
