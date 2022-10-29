import { ReactElement, ReactNode, useMemo, useState } from "react";

export function useMultistepForm(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentIndex] = useState(0);

  const step = useMemo(
    () => steps[currentStepIndex],
    [currentStepIndex, steps]
  );

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  function next() {
    setCurrentIndex((state) => {
      if (state >= steps.length - 1) return state;
      return state + 1;
    });
  }

  function back() {
    setCurrentIndex((state) => {
      if (state <= 0) return state;
      return state - 1;
    });
  }

  function goTo(index: number) {
    setCurrentIndex(index);
  }

  return {
    currentStepIndex,
    isFirstStep,
    isLastStep,
    step,
    steps,
    next,
    back,
  };
}
