const getAddressCoordinates = async (address: string) => {
  try {
    const res = await fetch(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(address)}`,
      {
        method: "GET",
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
        },
      },
    );
    const data = await res.json();
    return data.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export default getAddressCoordinates;
