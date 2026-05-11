import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LogIn, LogOut } from "lucide-react";
import { StructurePage } from "@/pages/StackVisualizer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function QueueVisualizer() {
  const [items, setItems] = useState(["12", "27", "64"]);
  const [value, setValue] = useState("");

  const enqueue = () => {
    if (!value.trim()) return;
    setItems((current) => [...current, value.trim()]);
    setValue("");
  };

  return (
    <StructurePage title="Queue Visualizer" description="First in, first out flow with front and rear indicators.">
      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <Card>
          <CardHeader>
            <CardTitle>Queue</CardTitle>
            <CardDescription>Front exits first, rear receives new values.</CardDescription>
          </CardHeader>
          <CardContent className="grid min-h-[360px] content-center gap-5 overflow-x-auto">
            <div className="flex min-w-max items-center gap-3">
              <AnimatePresence initial={false}>
                {items.map((item, index) => (
                  <motion.div key={`${item}-${index}`} layout initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="relative min-w-24 rounded-md border bg-secondary px-5 py-6 text-center font-semibold">
                    {index === 0 && <Badge className="absolute -top-4 left-2">Front</Badge>}
                    {index === items.length - 1 && <Badge variant="accent" className="absolute -bottom-4 right-2">Rear</Badge>}
                    {item}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Controls</CardTitle>
            <CardDescription>Add to rear or remove from front.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Input value={value} onChange={(event) => setValue(event.target.value)} placeholder="Value" onKeyDown={(event) => event.key === "Enter" && enqueue()} />
            <Button onClick={enqueue}><LogIn />Enqueue</Button>
            <Button variant="secondary" onClick={() => setItems((current) => current.slice(1))} disabled={!items.length}><LogOut />Dequeue</Button>
            <Badge variant="secondary" className="w-fit">Length {items.length}</Badge>
          </CardContent>
        </Card>
      </div>
    </StructurePage>
  );
}
