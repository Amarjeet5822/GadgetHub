import { Outlet } from "react-router-dom";
import { FooterPage, Navbar } from "./components/layout";


function App() {

  return (
    <>
      <div className="sticky top-0 z-50 bg-white w-full">
        <Navbar />
      </div>
      <div className="max-w-[2500px] mx-auto bg-gray-50">
        <main className="max-w-full mx-auto bg-gray-50">
          <Outlet />
        </main>
        <div className="max-w-full bg-gray-100 mx-auto">
          <FooterPage />
        </div>
      </div>
    </>
  );
}

export default App;
