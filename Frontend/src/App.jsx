import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './HomePage/MainPage';
import SelectDashboard from './HomePage/SelectDashboard';
import ManagerHomePage from './HomePage/ManagerHomePage';
import CreateUpdateManager from './HomePage/CreateUpdateManager';
import StudentDashboard from './StudentFees/StudentFeesDashboard';
import StudentDetails from './Manager/StudentDetails';
import CreateStudentDetails from './Manager/CreateStudentDetails';
import StudentDetailPage from './Manager/StudentDetailPage';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
function App() {
  const [authUser, setAuthUser] = useState(null);
  const[managerType, setManagerType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const res = await fetch("http://127.0.0.1:4000/auth/me",{
          method: "GET",
          credentials: "include"
        });
        const data = await res.json();
        if (res.ok) {
          setAuthUser(data);
          setManagerType(data.type);
          console.log(data.type);
        } else {
          setAuthUser(null);
        }
      } catch (error) {
        console.error("Failed to fetch auth user:", error);
        setAuthUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthUser();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!authUser ? <MainPage /> : <Navigate to="/manager" />} />
        <Route path="/selectDashboard" element={!authUser ? <SelectDashboard /> : <Navigate to="/manager" />} />
        <Route path="/manager" element={managerType === "manager" && <ManagerHomePage />} />
        <Route path="/createUpdateManager" element={managerType === "manager" && <CreateUpdateManager />} />
        <Route path="/studentDashboard" element={ (managerType==="manager" || managerType === "school-fees")  && <StudentDashboard />} />
        <Route path="/studentDetails" element={managerType==="manager" && <StudentDetails />} />
        <Route path="/createStudent" element={managerType==="manager" && <CreateStudentDetails />} />
        <Route path="/studentDetails/:id" element={ managerType==="manager" && <StudentDetailPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App
