import Divider from "@mui/material/Divider";
import Input from "@mui/material/Input";
import Checkbox from "@mui/material/Checkbox";
import { useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface User {
  access_token: string;
  authuser?: string;
  expires_in: number;
  prompt: string;
  scope: string;
  token_type: string;
}

interface Profile {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

const LogIn = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          },
        )
        .then((res) => {
          setProfile(res.data);
          if (profile) navigate("/");
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  // const logOut = () => {
  //   googleLogout();
  //   setProfile(null);
  // };

  return (
    <div className="flex h-screen">
      <div className="flex w-2/5 flex-col items-center justify-center gap-y-10 p-40">
        <img src="/black-logo.png" alt="Organizer" />
        <span className="flex flex-col items-center justify-center">
          <p className="text-[30px] font-medium tracking-wide">
            Welcome back, Lindsey
          </p>
          <p className="text-sm tracking-wide text-slate-500">
            Continue with Google or enter your details.
          </p>
        </span>
        <button
          onClick={() => login()}
          className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-black py-3"
        >
          <img width={22} src="/google.svg" alt="Google" />
          Log in with Google
        </button>
        <Divider className="w-full" sx={{ borderColor: "red" }}>
          or
        </Divider>
        <span className="mt-10 flex w-full flex-col gap-y-10">
          <Input placeholder="Email" className="w-full text-black" />
          <Input placeholder="Password" className="w-full text-black" />
          <span className="flex w-full items-center justify-between">
            <span className="ml-[-10px] flex items-center">
              <Checkbox id="remember" name="remember" />
              <label htmlFor="remember">Remember for 30 days</label>
            </span>
            <a className="text-right font-bold underline" href="#">
              Forgot password?
            </a>
          </span>
        </span>
        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-black px-28 py-3 text-white">
          Log in
        </button>
        <a className="w-full text-center font-bold" href="#">
          Don't have an account yet? Sign up for free
        </a>
      </div>
      <div className="relative max-h-screen w-3/5 overflow-hidden rounded-l-[100px]">
        <img
          className="h-full w-full object-cover"
          src="/background.jpg"
          alt="Background"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <img src="/purple-logo.png" alt="Logo" />
        </div>
      </div>
    </div>
  );
};

export default LogIn;
