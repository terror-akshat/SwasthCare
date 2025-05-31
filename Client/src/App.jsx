import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/SignIn";
import Homepage from "./pages/Homepage";
// import BedBooking from "./pages/Beds";
// import Wards from "./pages/Wards";
import Profile from "./pages/Profile";
import ViewOPD from "./pages/ViewOPD";
import ViewIPD from "./pages/ViewIPD";
import ViewLabReport from "./pages/ViewLabReport";
import PatientLogin from "./pages/PatientLogin";
import AdminDashboard from "./pages/AdminDashboard";
import PrintOPD from "./components/PrintOPD";
import ViewOPD_History from "./pages/ViewOPD_History";
import ViewIPD_History from "./pages/ViewIPD_History";
import Wards from "./pages/Wards";
import LandingPage from "./pages/LandingPage";
import { MasterRoute, ProtectedRoute } from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import Information_Not_Found from "./pages/Information_not_found";
import PasswordChangeForm from "./components/PasswordChangeForm";
import BillingForm from "./pages/BillingForm";
import HospitalBill from "./pages/HospitalBill";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/" element={<Signin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/patientlogin" element={<PatientLogin />} />
          <Route path="/homepage" element={<Homepage />} />
          {/* <MasterRoute path="/admin-dashboard" element={<AdminDashboard />} /> */}
          {/* <Route path="/wards" element={<Wards />} /> */}
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/update" element={<PasswordChangeForm />} />
          <Route path="/view-opd-history/:id" element={<ViewOPD_History />} />
          <Route path="/view-ipd-history/:id" element={<ViewIPD_History />} />
          <Route path="/view-opd" element={<ViewOPD />} />
          <Route path="/view-ipd" element={<ViewIPD />} />
          <Route path="/print-opd" element={<PrintOPD />} />
          <Route path="/view-lab-report/:id" element={<ViewLabReport />} />
          <Route path="/billing-form" element={<BillingForm />} />
          <Route path="/hospital-bill" element={<HospitalBill />} />

          <Route
            path="/information-not-found"
            element={<Information_Not_Found />}
          />
        </Route>
        <Route element={<MasterRoute />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/wards" element={<Wards />} />
        </Route>

        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
