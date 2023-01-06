import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import Logo from "@common/assets/logo.svg";
import { useSignIn } from "@module/auth";
import { FormEvent } from "react";
import { useCustomForm, useSnack } from "@common/hooks";
import { SignInProps } from "@module/auth";

const SignIn: NextPage = () => {
  const setSnackBar = useSnack();
  const { mutate } = useSignIn();

  const [formValues, handleChange] = useCustomForm<SignInProps>({
    username: "mor_2314",
    password: "83r5^_",
  });

  const handleSignIn = async () => {
    try {
      mutate({ password: formValues.password, username: formValues.username });
    } catch (e) {
      setSnackBar({
        title: "Couldn't connect you.",
        type: "error",
      });
    }
  };

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    if (formValues.password == "" || formValues.username == "") return;

    handleSignIn();
  };

  return (
    <div className="flex flex-col items-center gap-12 py-10">
      <Link href="/">
        <Image src={Logo} alt="" />
      </Link>
      <div className="flex flex-col gap-6 max-w-[350px] w-full">
        <div>
          <h1 className="text-3xl font-semibold leading-relaxed">Login</h1>
          <p className="text-sm">Hi, Welcome back 👋</p>
        </div>
        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => handleSubmitForm(e)}
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="username" className="text-xs">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username."
              name="username"
              id="username"
              onChange={handleChange}
              value={formValues.username}
              className="border px-3 py-2 rounded-md text-sm"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-xs">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password."
              name="password"
              id="password"
              onChange={handleChange}
              value={formValues.password}
              className="border px-3 py-2 rounded-md text-md"
            />
          </div>
          <input
            type="submit"
            value="Login"
            className="w-full bg-[#15803d] text-white text-sm font-medium py-2 rounded-md cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default SignIn;
