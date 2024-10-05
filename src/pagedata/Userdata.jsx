import React from 'react';
import { apiClient } from '@/lib/api-client';
import { useAppStore } from '@/store';
import { LOGOUT_ROUTE } from '@/utils/constants';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FiEdit2 } from "react-icons/fi";
import { IoPowerSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi';


const Userdata = () => {
  const {userInfo, setUserInfo} = useAppStore();
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      const response = await apiClient.post(
        LOGOUT_ROUTE,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        navigate("/auth");
        setUserInfo(null);
      }
    } catch (err) {
      console.log({ err });
    }
  };


  return (
    <div>
      <h1 className="text-2xl font-bold">User Profile</h1>
      <div className="relative bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto my-8 lg:h-[40vh]">
  <div className="flex items-center space-x-4">
    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white flex items-center justify-center text-3xl font-semibold">
      {userInfo.firstName.charAt(0).toUpperCase()}
    </div>

    <div>
      <h1 className="text-2xl font-bold text-gray-800">
        {userInfo.firstName && userInfo.lastName ? `${userInfo.firstName} ${userInfo.lastName}` : ""}
      </h1>
      <div className="flex items-center text-gray-500 space-x-2 mt-1">
        <HiOutlineMail className="w-5 h-5" />
        <p>{userInfo.email}</p>
      </div>
    </div>
  </div>

  <div className="border-t border-gray-200 my-4"></div>

  <div className="space-y-4">
    <div className="flex items-center space-x-2 text-gray-600">
      <HiOutlineLocationMarker className="w-5 h-5 text-indigo-500" />
      <div>
        <p className="text-sm text-gray-500">Location</p>
        <p className="font-medium">{userInfo.location[0].toString() + ", " + userInfo.location[1].toString()}</p>
      </div>
    </div>

    <div className="flex items-center space-x-2 text-gray-600">
      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"></path>
      </svg>
      <div>
        <p className="text-sm text-gray-500">Land Area</p>
        <p className="font-medium">{userInfo.areaOfLand}</p>
      </div>
    </div>
  </div>

  <div className="absolute bottom-4 right-4 flex gap-5">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <FiEdit2 className="text-purple-500 text-xl font-medium" onClick={() => navigate("/profile")} />
        </TooltipTrigger>
        <TooltipContent className="bg-[#1c1b1e] border-none text-white">
          <p>Edit Profile</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <IoPowerSharp className="text-red-500 text-xl font-medium" onClick={logOut} />
        </TooltipTrigger>
        <TooltipContent className="bg-[#1c1b1e] border-none text-white">
          <p>Log Out</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
</div>
    </div>
    

  );
};

export default Userdata;