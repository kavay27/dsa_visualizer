import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function StackVisualizer() {
  const [items, setItems] = useState(["42", "18", "73"]);
  const [value, setValue] = useState("");
  const [peeked, setPeeked] = useState(false);

  const push = () => {
    if (!value.trim()) return;
    setItems((current) => [...current, value.trim()]);
    setValue("");
    setPeeked(false);
  };

  return (
    <StructurePage title="Stack Visualizer" description="Last in, first out operations with animated top-of-stack changes.">
      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <Card>
          <CardHeader>
            <CardTitle>Stack</CardTitle>
            <CardDescription>Top item exits first.</CardDescription>
          </CardHeader>
          <CardContent className="flex min-h-[430px] items-end justify-center">
            <div className="flex w-full max-w-sm flex-col-reverse gap-2">
              <AnimatePresence initial={false}>
                {items.map((item, index) => (
                  <motion.div
                    key={`${item}-${index}`}
                    layout
                    initial={{ opacity: 0, y: -24, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 60, scale: 0.95 }}
                    className={`rounded-md border px-4 py-4 text-center font-semibold ${peeked && index === items.length - 1 ? "border-primary bg-primary/15 text-primary" : "bg-secondary"}`}
                  >
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
            <CardDescription>Push, pop, or peek at the top value.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Input value={value} onChange={(event) => setValue(event.target.value)} placeholder="Value" onKeyDown={(event) => event.key === "Enter" && push()} />
            <Button onClick={push}><Plus />Push</Button>
            <Button variant="secondary" onClick={() => setItems((current) => current.slice(0, -1))} disabled={!items.length}><Minus />Pop</Button>
            <Button variant="outline" onClick={() => setPeeked(true)} disabled={!items.length}><Eye />Peek</Button>
            <Badge variant="secondary" className="w-fit">Size {items.length}</Badge>
          </CardContent>
        </Card>
      </div>
    </StructurePage>
  );
}

function StructurePage({ title, description, children }) {
  return (
    <div className="mx-auto grid max-w-7xl gap-5">
      <div>
        <h1 className="text-3xl font-semibold tracking-normal">{title}</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
}

export { StructurePage };
