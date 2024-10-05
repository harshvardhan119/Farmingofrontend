import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client.js";
import { LOGIN_ROUTE, SIGNUP_ROUTE, } from "@/utils/constants";
import { useAppStore } from "@/store";

const Auth = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validationSignup = () => {
    if (!email.length) {
      toast.error("Email is required.");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Password and Confirm password must be same");
      return false;
    }
    return true;
  };

  const validationLogin = () => {
    if (!email.length) {
      toast.error("Email is required.");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required");
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (validationLogin()) {
      const response = await apiClient.post(
        LOGIN_ROUTE,
        { email, password },
        { withCredentials: true }
      );
      if (response.data.user.id) {
        setUserInfo(response.data.user);
        if (response.data.user.profileSetup) {
          navigate("/dashboard");
        } else {
          navigate("/profile");
        }
      }
    }
  };

  const handleSignup = async () => {
    if (validationSignup()) {
      const payload = { email, password };

      const response = await apiClient.post(SIGNUP_ROUTE, payload, {
        withCredentials: true,
      });
      console.log({ response });
      if (response.status === 201) {
        setUserInfo(response.data.user);
        navigate("/profile");
      }
    }
  };
  return (
    // <div className="h-[100vh] w-[100vw] flex items-center justify-center bg-[#99c5e0]">
    <div className="h-[100vh] w-[100vw] flex items-center justify-center bg-white">
      <div className=" h-[15vh] w-[15vw] absolute top-0 left-0 p-2">
        <img src="logo_svg.svg" />
      </div>
      <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-gray-600 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[50vw] rounded-3xl grid ">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
            </div>
            <p className="font-medium text-center pt-3">
              Fill in the details to get started with Farmingo!
            </p>
          </div>
          <div className="flex items-center justify-center w-full ">
            <Tabs className="w-3/4 xl:w-2/3 " defaultValue="login">
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-[#5A86B7] p-3 transition-all duration-300"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-[#5A86B7] p-3 transition-all duration-300"
                >
                  SignUp
                </TabsTrigger>
              </TabsList>
              <TabsContent className="flex flex-col gap-5 mt-10" value="login">
                <Input
                  type="email"
                  placeholder="Email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  className="rounded-full p-6 "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  className="rounded-full p-6 bg-[#365170]"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </TabsContent>
              <TabsContent className="flex flex-col gap-5 " value="signup">
                <Input
                  type="email"
                  placeholder="Email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  className="rounded-full p-6"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                  className="rounded-full p-6 bg-[#365170]"
                  onClick={handleSignup}
                >
                  SignUp
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
