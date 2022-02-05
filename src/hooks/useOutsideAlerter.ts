import React, { useEffect } from "react";

export function useOutsideAlerter(
  onOutsideClick: () => void,
  refs: Array<React.RefObject<HTMLElement>>,
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        refs.every((ref) => !!ref) &&
        (event.target as Node) &&
        !refs.some((ref) => ref.current?.contains(event.target as Node))
      ) {
        onOutsideClick();
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [refs]);
}
