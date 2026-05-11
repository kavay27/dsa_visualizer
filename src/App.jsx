import { useEffect, useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppShell } from "@/layouts/AppShell";
import { BSTVisualizer } from "@/pages/BSTVisualizer";
import { Home } from "@/pages/Home";
import { LinkedListVisualizer } from "@/pages/LinkedListVisualizer";
import { QueueVisualizer } from "@/pages/QueueVisualizer";
import { SortingVisualizer } from "@/pages/SortingVisualizer";
import { StackVisualizer } from "@/pages/StackVisualizer";

const pages = {
  home: Home,
  sorting: SortingVisualizer,
  stack: StackVisualizer,
  queue: QueueVisualizer,
  "linked-list": LinkedListVisualizer,
  bst: BSTVisualizer,
};

export default function App() {
  const [activeView, setActiveView] = useState("home");
  const [isDark, setIsDark] = useState(true);
  const ActivePage = pages[activeView] ?? Home;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.classList.toggle("light", !isDark);
  }, [isDark]);

  return (
    <TooltipProvider delayDuration={200}>
      <AppShell activeView={activeView} isDark={isDark} onChangeView={setActiveView} onToggleTheme={() => setIsDark((current) => !current)}>
        <ActivePage onOpen={setActiveView} />
      </AppShell>
    </TooltipProvider>
  );
}
