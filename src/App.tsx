import { useAuthStore } from "./app/store/auth";
import "./App.css";
import { Nav } from "./shared/component/Navbar";
import { AuthNavigation } from "./app/navigation/AuthNavigation";
import { RootNavigation } from "./app/navigation/RootNavigation";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { ThemeConfig } from "flowbite-react";
import { ToastContainer } from "react-toastify";

// Registrar módulos (obligatorio en v33+)clear
ModuleRegistry.registerModules([AllCommunityModule]);

function App() {
  const isLoggedIn = useAuthStore().isLoggedIn;

  // Create a new QueryClient instance
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <>
      <ThemeConfig dark={false} />
      <ToastContainer />
      {isLoggedIn ? (
        <QueryClientProvider client={client}>
          <div className="h-dvh grid grid-rows-[auto_1fr]">
            <header>
              <Nav />
            </header>
            <main>
              <RootNavigation />
            </main>
          </div>
        </QueryClientProvider>
      ) : (
        <main>
          <div className="w-screen flex justify-center items-center">
            <div className="w-full">
              <AuthNavigation />
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default App;
