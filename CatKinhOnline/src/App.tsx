import "./App.css";
import AppRoute from "./routes/route";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <AppRoute></AppRoute>
      </ThemeProvider>
    </>
  );
}

export default App;
