import { useEffect, useRef, useState } from "react";

export function useScrollReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
