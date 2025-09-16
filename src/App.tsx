import { useAuthStore } from "./app/store/auth";
import "./App.css";
import { Nav } from "./shared/component/Navbar";
import { AuthNavigation } from "./app/navigation/AuthNavigation";
import { RootNavigation } from "./app/navigation/RootNavigation";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

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
      <main>
        <div className="App w-screen flex justify-center items-center">
          {isLoggedIn ? (
            <QueryClientProvider client={client}>
              <div className="grid grid-cols-1 gap-4 justify-items-center w-full">
                <Nav />
                <RootNavigation />
              </div>
            </QueryClientProvider>
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
