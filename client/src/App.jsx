// // import { Toaster } from "react-hot-toast"
// // import { Navigate, Routes,Route } from "react-router-dom"
// // import LoginLanding from "./pages/LoginLanding";
// // import Layout from "./pages/Layout";
// // import Employees from "./pages/Employees";
// // import Attendance from "./pages/Attendance";
// // import Leave from "./pages/Leave";
// // import PaySlips from "./pages/PaySlips";
// // import PrintPaySlips from "./pages/PrintPaySlips";
// // import Settings from "./pages/Settings";
// // import Dashboard from "./pages/Dashboard";
// // import LoginForm from "./components/LoginForm";

// // const App = () => {
// //   return (
// //     <>
// //     <Toaster/>
// //     <Routes>
// //       <Route path="/login" element= { <LoginLanding/> }/>

// //       <Route path="/login/admin" element= { <LoginForm role ="admin" title="Admin Portal" subtitle="Sign in to access your account"/> }/>

// //       <Route path="/login/employees" element= { <LoginForm role ="employee" title="Employee Portal" subtitle="Sign in to access your account"/> }/>



// //       <Route element={<Layout/>}>
// //         <Route path="/dashboard" element={ <Dashboard/> }/>
// //         <Route path="/Employees" element= { <Employees/> }/>
// //         <Route path="/Attendance" element= { <Attendance/> }/>
// //         <Route path="/leave" element= { <Leave/> }/>
// //         <Route path="/payslips" element= { <PaySlips/> }/>
// //         <Route path="/setting" element= { <Settings/> }/>
// //       </Route>
// //       <Route path="/print/payslips/:id" element= { <PrintPaySlips/> }/>

// //       <Route path="*" element={ <Navigate to="/dashboard" replace /> } />
// //     </Routes>
// //     </>
// //   )
// // }

// // export default App;

// import { Toaster } from "react-hot-toast";
// import { Navigate, Routes, Route } from "react-router-dom";
// import LoginLanding from "./pages/LoginLanding";
// import Layout from "./pages/Layout";
// import Employees from "./pages/Employees";
// import Attendance from "./pages/Attendance";
// import Leave from "./pages/Leave";
// import PaySlips from "./pages/PaySlips";
// import PrintPaySlips from "./pages/PrintPaySlips";
// import Settings from "./pages/Settings";
// import Dashboard from "./pages/Dashboard";
// import LoginForm from "./components/LoginForm";

// // --- 1. THE GATEKEEPER COMPONENT ---
// // This checks if the user is allowed to see the private pages
// const ProtectedRoute = ({ children }) => {
//   // Check localStorage for the userRole (or your JWT token once the backend is connected)
//   const isAuthenticated = localStorage.getItem("userRole"); 

//   if (!isAuthenticated) {
//     // Kick them back to the login page if they aren't authenticated
//     return <Navigate to="/login" replace />;
//   }

//   // If they are logged in, render the requested page
//   return children;
// };

// const App = () => {
//   return (
//     <>
//       <Toaster />
//       <Routes>
//         {/* --- PUBLIC ROUTES (Anyone can access these) --- */}
//         <Route path="/login" element={<LoginLanding />} />
//         <Route path="/login/admin" element={<LoginForm role="admin" title="Admin Portal" subtitle="Sign in to access your account" />} />
//         <Route path="/login/employees" element={<LoginForm role="employee" title="Employee Portal" subtitle="Sign in to access your account" />} />

//         {/* --- PRIVATE ROUTES (Secured by ProtectedRoute) --- */}
//         <Route element={
//           <ProtectedRoute>
//             <Layout />
//           </ProtectedRoute>
//         }>
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/Employees" element={<Employees />} />
//           <Route path="/Attendance" element={<Attendance />} />
//           <Route path="/leave" element={<Leave />} />
//           <Route path="/payslips" element={<PaySlips />} />
//           <Route path="/setting" element={<Settings />} />
//         </Route>

//         {/* Protect the print page too, since it's outside the Layout */}
//         <Route path="/print/payslips/:id" element={
//           <ProtectedRoute>
//             <PrintPaySlips />
//           </ProtectedRoute>
//         } />

//         {/* --- CATCH ALL --- */}
//         {/* If they type a random URL, send them to dashboard. The ProtectedRoute will then decide if they go to login or stay. */}
//         <Route path="*" element={<Navigate to="/dashboard" replace />} />
//       </Routes>
//     </>
//   );
// };

// export default App;

import { Toaster } from "react-hot-toast";
import { Navigate, Routes, Route } from "react-router-dom";
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

// --- 1. THE GATEKEEPER COMPONENT ---
// This checks if the user is allowed to see the private pages
const ProtectedRoute = ({ children }) => {
  // Check localStorage for the userRole (or your JWT token once the backend is connected)
  const isAuthenticated = localStorage.getItem("userRole"); 

  if (!isAuthenticated) {
    // Kick them back to the login page if they aren't authenticated
    return <Navigate to="/login" replace />;
  }

  // If they are logged in, render the requested page
  return children;
};

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        {/* --- FORCE ROOT URL TO LOGIN --- */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* --- PUBLIC ROUTES (Anyone can access these) --- */}
        <Route path="/login" element={<LoginLanding />} />
        <Route path="/login/admin" element={<LoginForm role="admin" title="Admin Portal" subtitle="Sign in to access your account" />} />
        <Route path="/login/employees" element={<LoginForm role="employee" title="Employee Portal" subtitle="Sign in to access your account" />} />

        {/* --- PRIVATE ROUTES (Secured by ProtectedRoute) --- */}
        <Route element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Employees" element={<Employees />} />
          <Route path="/Attendance" element={<Attendance />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/payslips" element={<PaySlips />} />
          <Route path="/setting" element={<Settings />} />
        </Route>

        {/* Protect the print page too, since it's outside the Layout */}
        <Route path="/print/payslips/:id" element={
          <ProtectedRoute>
            <PrintPaySlips />
          </ProtectedRoute>
        } />

        {/* --- CATCH ALL --- */}
        {/* If they type a random URL, send them to dashboard. The ProtectedRoute will then decide if they go to login or stay. */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
};

export default App;