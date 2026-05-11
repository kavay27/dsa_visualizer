const markSorted = (steps, length) => {
  steps.push({ type: "sorted", indices: Array.from({ length }, (_, index) => index) });
};

export function generateBubbleSortSteps(input) {
  const array = [...input];
  const steps = [];

  for (let end = array.length - 1; end > 0; end -= 1) {
    let swapped = false;
    for (let i = 0; i < end; i += 1) {
      steps.push({ type: "compare", indices: [i, i + 1] });
      if (array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        swapped = true;
        steps.push({ type: "swap", indices: [i, i + 1] });
      }
    }
    steps.push({ type: "sorted", indices: [end] });
    if (!swapped) break;
  }
  markSorted(steps, array.length);
  return steps;
}

export function generateSelectionSortSteps(input) {
  const array = [...input];
  const steps = [];

  for (let i = 0; i < array.length - 1; i += 1) {
    let minIndex = i;
    steps.push({ type: "select", indices: [i] });
    for (let j = i + 1; j < array.length; j += 1) {
      steps.push({ type: "compare", indices: [minIndex, j] });
      if (array[j] < array[minIndex]) minIndex = j;
    }
    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      steps.push({ type: "swap", indices: [i, minIndex] });
    }
    steps.push({ type: "sorted", indices: [i] });
  }
  markSorted(steps, array.length);
  return steps;
}

export function generateMergeSortSteps(input) {
  const array = [...input];
  const steps = [];

  const merge = (left, mid, right) => {
    const leftPart = array.slice(left, mid + 1);
    const rightPart = array.slice(mid + 1, right + 1);
    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftPart.length && j < rightPart.length) {
      steps.push({ type: "compare", indices: [left + i, mid + 1 + j] });
      if (leftPart[i] <= rightPart[j]) {
        array[k] = leftPart[i];
        steps.push({ type: "overwrite", index: k, value: leftPart[i] });
        i += 1;
      } else {
        array[k] = rightPart[j];
        steps.push({ type: "overwrite", index: k, value: rightPart[j] });
        j += 1;
      }
      k += 1;
    }

    while (i < leftPart.length) {
      array[k] = leftPart[i];
      steps.push({ type: "overwrite", index: k, value: leftPart[i] });
      i += 1;
      k += 1;
    }

    while (j < rightPart.length) {
      array[k] = rightPart[j];
      steps.push({ type: "overwrite", index: k, value: rightPart[j] });
      j += 1;
      k += 1;
    }
  };

  const sort = (left, right) => {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    sort(left, mid);
    sort(mid + 1, right);
    merge(left, mid, right);
  };

  sort(0, array.length - 1);
  markSorted(steps, array.length);
  return steps;
}

export function generateQuickSortSteps(input) {
  const array = [...input];
  const steps = [];

  const partition = (low, high) => {
    const pivot = array[high];
    let i = low;
    steps.push({ type: "pivot", indices: [high] });

    for (let j = low; j < high; j += 1) {
      steps.push({ type: "compare", indices: [j, high] });
      if (array[j] < pivot) {
        if (i !== j) {
          [array[i], array[j]] = [array[j], array[i]];
          steps.push({ type: "swap", indices: [i, j] });
        }
        i += 1;
      }
    }

    [array[i], array[high]] = [array[high], array[i]];
    steps.push({ type: "swap", indices: [i, high] });
    steps.push({ type: "sorted", indices: [i] });
    return i;
  };

  const sort = (low, high) => {
    if (low > high) return;
    if (low === high) {
      steps.push({ type: "sorted", indices: [low] });
      return;
    }
    const pivotIndex = partition(low, high);
    sort(low, pivotIndex - 1);
    sort(pivotIndex + 1, high);
  };

  sort(0, array.length - 1);
  markSorted(steps, array.length);
  return steps;
}

export function getSortingSteps(algorithm, array) {
  const generators = {
    bubble: generateBubbleSortSteps,
    selection: generateSelectionSortSteps,
    merge: generateMergeSortSteps,
    quick: generateQuickSortSteps,
  };
  return generators[algorithm](array);
}
