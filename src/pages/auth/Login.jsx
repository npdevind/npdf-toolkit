import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import video from "../../assets/login_v.mp4";
// import googleLogo from "../../assets/images/google_logo.jpg";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleLoginSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    const user = jwtDecode(token); // decode JWT to get user info
    // console.log("User Info:", user);
    localStorage.setItem("googleUser", JSON.stringify(user));
    // Save user info to localStorage or call your backend for further auth
    navigate("/");
  };

  const handleLoginError = () => {
    console.log("Login Failed");
  };
  return (
    <>
      <div className="flex flex-col lg:flex-row w-screen h-screen">
        {/* Login Form */}
        <div className="flex flex-1 justify-center items-center bg-white">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Login to your account
              </CardTitle>
              <CardDescription className="text-gray-500">
                Enter your email and password to access your account
              </CardDescription>
              <CardAction>
                <Button
                  variant="link"
                  className="text-sky-900 hover:text-sky-700"
                >
                  Sign Up
                </Button>
              </CardAction>
            </CardHeader>

            <CardContent>
              <form className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="text-sm text-sky-900 hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <Input id="password" type="password" required />
                </div>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
              <Button
                type="submit"
                className="w-full bg-sky-900 hover:bg-sky-700"
              >
                Login
              </Button>
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginError}
              />
              {/* <Button variant="outline" className="w-full">
                <img src={googleLogo} alt="google_logo" className="w-5 h-5" />{" "}
                Login with Google
                
              </Button> */}
            </CardFooter>
          </Card>
        </div>

        {/* Video / Illustration */}
        <div className="flex-1 w-full h-screen overflow-hidden">
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
