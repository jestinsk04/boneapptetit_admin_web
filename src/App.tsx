import { useAuthStore,  } from "./app/store/auth";
import './App.css';
import {Nav }from "./shared/component/Navbar";
import { AuthNavigation } from "./app/navigation/AuthNavigation";
import { RootNavigation } from "./app/navigation/RootNavigation";


function App() {
  const isLoggedIn = useAuthStore().isLoggedIn;

  return (
    <>
    
    <main>

      <div className="App w-screen flex justify-center items-center">
        {isLoggedIn ? (
          
          <div className="grid grid-cols-1 gap-4 justify-items-center w-full">
            <Nav />
            <RootNavigation/>

          </div>
          
        ) : (
          <div className="w-full">
          <AuthNavigation />

          </div>
        )}
      </div>
    </main>
    </>
  );
}

export default App;
