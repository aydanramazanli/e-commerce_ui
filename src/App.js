import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppHeader from "./components/Header/AppHeader";
import AppFooter from "./components/Footer/AppFooter";
import PageContent from "./components/Content/PageContent";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppHeader />
        <PageContent />
        <AppFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;
