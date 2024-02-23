import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useHeaderTitle = () => {
  const [title, setTitle] = useState<string>("");
  const location = useLocation();

  const locationTitle = () => {
    if (location.pathname.includes("insight")) {
      return "인사이트";
    } else if (location.pathname.includes("contents")) {
      return "콘텐츠";
    } else if (location.pathname.includes("category")) {
      return "카테고리";
    } else {
      return "";
    }
  };

  const locationSub = () => {
    if (location.pathname.includes("manage")) {
      return "관리";
    } else if (location.pathname.includes("register")) {
      return "등록";
    } else {
      return "";
    }
  };

  const change = () => {
    setTitle(`${locationTitle()} ${locationSub()}`);
  };

  useEffect(() => {
    change();
  }, [location]);

  return { title };
};
