import Sidebar from "@/components/ui/Sidebar";
import Dashdata from "@/pagedata/Dashdata";
import { useAppStore } from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Dashboard = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast("Please setup profile to continue.");
      navigate("/profile");
    }
  }, [userInfo, navigate]);
  return (
    <div className="flex h-screen">
     
      <Sidebar />

      <div className="flex-1 flex flex-col">
        
      <div className="bg-gray-800 p-4 pl-10 text-white flex items-center justify-between" style={{ backgroundColor: '#365170' }}>
  
  <h1 className="text-xl">Dashboard</h1>

  
  <div className="flex items-center space-x-6">
   
    <i className="bx bx-bell text-2xl cursor-pointer"></i>

    
    <i className="bx bx-cog text-2xl cursor-pointer"></i>

    
    <i className="bx bx-user text-2xl cursor-pointer"></i>

    <i className="bx bx-moon text-2xl cursor-pointer"></i>
  </div>
</div>

       
        <div className="flex-1 p-8 bg-gray-100"><Dashdata/>
         
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
