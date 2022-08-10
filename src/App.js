import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditCandidat from "./components/candidats/EditCandidat";
import Candidats from "./pages/Candidats";
import Charges from "./pages/Charges";
import Dashboard from "./pages/Dashboard";
import Echeances from "./pages/Echeances";
import Login from "./pages/Login";
import Personnel from "./pages/Personnel";
import Vehicules from "./pages/Vehicules";

function App() {
  return (
    <>
      <BrowserRouter>
        <main className="w-full flex flex-col justify-start items-start bg-gray-100 ">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/candidats" element={<Candidats />}>
              <Route
                path="/candidats/edit/:candidatId"
                element={<EditCandidat />}
              />
            </Route>
            <Route path="/charges" element={<Charges />} />
            <Route path="/vehicules" element={<Vehicules />} />
            <Route path="/echeances" element={<Echeances />} />
            <Route path="/personnel" element={<Personnel />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
