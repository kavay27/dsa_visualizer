import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SortingBars({ array, activeIndices, pivotIndices, sortedIndices }) {
  const activeSet = new Set(activeIndices);
  const pivotSet = new Set(pivotIndices);
  const sortedSet = new Set(sortedIndices);

  return (
    <div className="flex h-[360px] items-end gap-1 rounded-lg border bg-background/60 p-3 sm:h-[430px]">
      {array.map((value, index) => {
        const isActive = activeSet.has(index);
        const isPivot = pivotSet.has(index);
        const isSorted = sortedSet.has(index);
        return (
          <motion.div
            layout
            key={index}
            animate={{ height: `${value}%` }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            className={cn(
              "min-w-1 flex-1 rounded-t-sm bg-primary/70",
              isActive && "bg-amber-400",
              isPivot && "bg-accent",
              isSorted && "bg-emerald-400",
            )}
          >
            <span className="sr-only">{value}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
