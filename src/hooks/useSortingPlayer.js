import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getSortingSteps } from "@/algorithms/sorting";
import { createRandomArray } from "@/utils/array";

const initialSize = 36;

export function useSortingPlayer() {
  const [algorithm, setAlgorithm] = useState("bubble");
  const [arraySize, setArraySize] = useState(initialSize);
  const [speed, setSpeed] = useState(48);
  const [array, setArray] = useState(() => createRandomArray(initialSize));
  const [initialArray, setInitialArray] = useState(array);
  const [isPlaying, setIsPlaying] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [activeIndices, setActiveIndices] = useState([]);
  const [pivotIndices, setPivotIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const timeoutRef = useRef(null);

  const steps = useMemo(() => getSortingSteps(algorithm, initialArray), [algorithm, initialArray]);
  const delay = 620 - speed * 5.4;

  const clearTimer = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
  };

  const applyStep = useCallback((step) => {
    if (!step) return;
    setActiveIndices([]);
    setPivotIndices([]);

    if (step.type === "compare") setActiveIndices(step.indices);
    if (step.type === "select" || step.type === "pivot") setPivotIndices(step.indices);
    if (step.type === "sorted") setSortedIndices((current) => Array.from(new Set([...current, ...step.indices])));
    if (step.type === "swap") {
      setActiveIndices(step.indices);
      setArray((current) => {
        const next = [...current];
        const [i, j] = step.indices;
        [next[i], next[j]] = [next[j], next[i]];
        return next;
      });
    }
    if (step.type === "overwrite") {
      setActiveIndices([step.index]);
      setArray((current) => {
        const next = [...current];
        next[step.index] = step.value;
        return next;
      });
    }
  }, []);

  const stepForward = useCallback(() => {
    if (stepIndex >= steps.length) {
      setIsPlaying(false);
      return;
    }
    applyStep(steps[stepIndex]);
    setStepIndex((current) => current + 1);
  }, [applyStep, stepIndex, steps]);

  useEffect(() => {
    clearTimer();
    if (!isPlaying) return undefined;
    timeoutRef.current = window.setTimeout(stepForward, delay);
    return clearTimer;
  }, [delay, isPlaying, stepForward]);

  const reset = useCallback(() => {
    clearTimer();
    setArray(initialArray);
    setIsPlaying(false);
    setStepIndex(0);
    setActiveIndices([]);
    setPivotIndices([]);
    setSortedIndices([]);
  }, [initialArray]);

  const generate = useCallback((size = arraySize) => {
    const next = createRandomArray(size);
    clearTimer();
    setInitialArray(next);
    setArray(next);
    setIsPlaying(false);
    setStepIndex(0);
    setActiveIndices([]);
    setPivotIndices([]);
    setSortedIndices([]);
  }, [arraySize]);

  const updateSize = useCallback((size) => {
    setArraySize(size);
    generate(size);
  }, [generate]);

  const updateAlgorithm = useCallback((value) => {
    setAlgorithm(value);
    setIsPlaying(false);
    setArray(initialArray);
    setStepIndex(0);
    setActiveIndices([]);
    setPivotIndices([]);
    setSortedIndices([]);
  }, [initialArray]);

  return {
    activeIndices,
    algorithm,
    array,
    arraySize,
    generate,
    isComplete: stepIndex >= steps.length,
    isPlaying,
    pivotIndices,
    progress: steps.length ? Math.round((stepIndex / steps.length) * 100) : 0,
    reset,
    setIsPlaying,
    setSpeed,
    sortedIndices,
    speed,
    stepForward,
    stepIndex,
    steps,
    updateAlgorithm,
    updateSize,
  };
}
