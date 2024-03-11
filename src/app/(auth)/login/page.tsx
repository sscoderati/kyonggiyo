"use client";

import Image from "next/image";
import getKakaoLoginPath from "@/apis/getKakaoLoginPath";
import LoginCarousel from "@/components/Carousel/LoginCarousel";
import KakaoLoginButton from "@/images/kakaobutton.png";

export default function LoginPage() {
  return (
    <div className={"mx-auto flex h-dvh w-2/3 flex-col justify-center"}>
      <div className={"my-12 text-center text-3xl font-bold text-blue-500"}>
        경기요! <br /> 경기대 학생들을 위한 맛집 소개 서비스!
      </div>
      <LoginCarousel />
      <Image
        className={"mx-auto mt-12 cursor-pointer"}
        src={KakaoLoginButton}
        alt={"카카오 로그인 버튼"}
        width={360}
        height={48}
        onClick={() => {
          getKakaoLoginPath().then((res) => {
            window.location.href = res;
          });
        }}
      />
    </div>
  );
}
