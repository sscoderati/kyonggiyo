"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>알 수 없는 에러가 발생했습니다!</h2>
      <button onClick={() => reset()}>재시도하기</button>
    </div>
  );
}
