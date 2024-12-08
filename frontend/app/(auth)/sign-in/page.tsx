import Logo from "@/components/logo";
import Title from "@/components/title";
import Wrapper from "@/components/wrapper";
import {SignIn} from "@/features/auth/sign-in";
import React from "react";

export default function SignInPage() {
  return (
    <Wrapper className="mx-auto">
      <div className="w-full flex justify-center pt-8">
        <Logo />
      </div>
      <Title title="Login" />
      <div className="w-full flex flex-1 justify-center ">
        <SignIn />
      </div>
    </Wrapper>
  );
}
