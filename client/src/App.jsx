import "./css/App.css";
import NavBar from "./components/NavBar";
import TopBar from "./components/TopBar";
import ChatBar from "./components/ChatBar";

function App() {
  return (
    <>
      <div className="App">
        <div className="grid grid-rows-layout grid-cols-layout h-screen">
          {/* TopBar */}
          <div className="row-span-1 col-span-2 border-b">
            <TopBar />
          </div>
          {/* NavBar */}
          <div className="nav-bar row-span-2 col-span-1 border-r">
            <NavBar />
          </div>
          {/* ChartBar */}
          <div className="chat-bar row-span-2 col-span-1">
            <ChatBar />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
