export const formatCategory = (category: string) => {
  switch (category) {
    case "KOREAN":
      return "한식";
    case "CHINESE":
      return "중식";
    case "JAPANESE":
      return "일식";
    case "WESTERN":
      return "양식";
    case "FAST":
      return "패스트푸드";
    case "CAFE":
      return "카페";
    case "BAKERY":
      return "베이커리";
    case "THAI":
      return "태국음식";
    case "ASIAN":
      return "아시아음식";
    case "INDIAN":
      return "인도음식";
    case "ALCOHOL":
      return "주점";
    case "CHICKEN":
      return "치킨";
    case "FLOUR":
      return "분식";
    default:
      return "기타";
  }
};
