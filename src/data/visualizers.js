import { Binary, GitBranch, Layers3, ListTree, Rows3 } from "lucide-react";

export const visualizers = [
  {
    id: "sorting",
    title: "Sorting Visualizer",
    description: "Compare, swap, partition, and merge values through replayable animation steps.",
    icon: Binary,
  },
  {
    id: "stack",
    title: "Stack",
    description: "Push, pop, and peek with LIFO motion and top-of-stack feedback.",
    icon: Layers3,
  },
  {
    id: "queue",
    title: "Queue",
    description: "Enqueue and dequeue items while tracking front and rear pointers.",
    icon: Rows3,
  },
  {
    id: "linked-list",
    title: "Linked List",
    description: "Insert, delete, and traverse connected nodes with animated links.",
    icon: GitBranch,
  },
  {
    id: "bst",
    title: "Binary Search Tree",
    description: "Insert, search, and delete nodes while highlighting traversal paths.",
    icon: ListTree,
  },
];
