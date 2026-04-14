import { Toaster } from "react-hot-toast"
import { Navigate, Routes,Route } from "react-router-dom"
import LoginLanding from "./pages/LoginLanding";
import Layout from "./pages/Layout";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Leave from "./pages/Leave";
import PaySlips from "./pages/PaySlips";
import PrintPaySlips from "./pages/PrintPaySlips";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import LoginForm from "./components/LoginForm";

const App = () => {
  return (
    <>
    <Toaster/>
    <Routes>
      <Route path="/login" element= { <LoginLanding/> }/>

      <Route path="/login/admin" element= { <LoginForm role ="admin" title="Admin Portal" subtitle="Sign in to access your account"/> }/>

      <Route path="/login/employees" element= { <LoginForm role ="employee" title="Employee Portal" subtitle="Sign in to access your account"/> }/>



      <Route element={<Layout/>}>
        <Route path="/dashboard" element={ <Dashboard/> }/>
        <Route path="/Employees" element= { <Employees/> }/>
        <Route path="/Attendance" element= { <Attendance/> }/>
        <Route path="/leave" element= { <Leave/> }/>
        <Route path="/payslips" element= { <PaySlips/> }/>
        <Route path="/setting" element= { <Settings/> }/>
      </Route>
      <Route path="/print/payslips/:id" element= { <PrintPaySlips/> }/>

      <Route path="*" element={ <Navigate to="/dashboard" replace /> } />
    </Routes>
    </>
  )
}

export default App;