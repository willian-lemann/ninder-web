import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

interface UseBottomScrollProps {
  listener: any;
}

let timoutFunction: NodeJS.Timeout;

interface Handles {
  goBottom: () => void;
}

const Element = forwardRef<Handles>((_, ref) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    goBottom: () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
  }));

  return <div ref={bottomRef} />;
});

export function useBottomScroll({ listener }: UseBottomScrollProps) {
  const elementRef = useRef<Handles>(null);

  useEffect(() => {
    timoutFunction = setTimeout(() => {
      elementRef.current?.goBottom();
    }, 100);

    return () => {
      clearTimeout(timoutFunction);
    };
  }, [listener]);

  return {
    ElementToBeScrolled: () => <Element ref={elementRef} />,
  };
}
