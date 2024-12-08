import Logo from "@/components/logo";
import Title from "@/components/title";
import Wrapper from "@/components/wrapper";
import {SignUp} from "@/features/auth/sign-up";
import React from "react";

export default function SignUpPage() {
  return (
    <Wrapper>
      <div className="w-full flex justify-center pt-8">
        <Logo />
      </div>
      <Title title="Sign-up" />
      <div className="flex flex-1 justify-center ">
        <SignUp />
      </div>
    </Wrapper>
  );
}
