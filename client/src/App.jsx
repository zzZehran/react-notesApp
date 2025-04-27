import RegisterPage from "./pages/Register_Page";
import LoginPage from "./pages/Login_Page";
import OverviewNotes from "./pages/Overview_Notes";
import CreateNote from "./pages/Create_Note";
function App() {
  return (
    <>
      <div className="absolute bottom-10 right-10">
        <span className="rounded-xl bg-black py-4 px-5 text-white font-bold text-xl hover:shadow-xl">
          +
        </span>
      </div>
      <main className="">
        {/* <LoginPage /> */}
        {/* <OverviewNotes /> */}
        <CreateNote />
      </main>
    </>
  );
}

export default App;
