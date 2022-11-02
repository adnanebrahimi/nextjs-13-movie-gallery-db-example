"use client";

import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import Logo from "../../../public/vercel.jpg";
import LoginIcon from "@mui/icons-material/Login";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";
import PocketBase from "pocketbase";
import { useRouter } from "next/navigation";
import { Alert } from "@mui/material";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [LoginLoader, setLoginLoader] = useState(false);
  const client = new PocketBase("http://127.0.0.1:8090");
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();
  const doLogin = async () => {
    setLoginLoader(true);
    setErrors([]);
    const user = await client.users
      .authViaEmail(email,password)
      .then((success) => router.push("/movie"))
      .catch((error) =>
        {
          console.log(error.message);
          
          setErrors([error.message])
        }
      )
      .finally(() => setLoginLoader(false));
  };

  const listErrors = errors.map((error) => (
    <Alert severity="error"  key={Math.random()}>
      {error}
    </Alert>
  ));
  return (
    <>
      <Image
        src={Logo}
        alt="Picture of the author"
        width={500}
        className="rounded-md"
        // height={500} automatically provided
        // blurDataURL="data:..." automatically provided
        // placeholder="blur" // Optional blur-up while loading
      />

      <div className="flex flex-col gap-3 justify-center mt-4">
        <TextField
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></TextField>
        <TextField
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></TextField>

        {errors?.length > 0 && listErrors}

        <LoadingButton
          loading={LoginLoader}
          loadingPosition="start"
          startIcon={LoginLoader ? <SaveIcon /> : <LoginIcon />}
          variant="contained"
          color="primary"
          onClick={() => doLogin()}
        >
          Login
        </LoadingButton>
      </div>
    </>
  );
}
