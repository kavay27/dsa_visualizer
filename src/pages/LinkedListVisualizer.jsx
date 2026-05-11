import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Plus, ScanLine, Trash2 } from "lucide-react";
import { StructurePage } from "@/pages/StackVisualizer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function LinkedListVisualizer() {
  const [nodes, setNodes] = useState(["19", "35", "51"]);
  const [value, setValue] = useState("");
  const [active, setActive] = useState(null);

  const insert = () => {
    if (!value.trim()) return;
    setNodes((current) => [...current, value.trim()]);
    setValue("");
  };

  const traverse = () => {
    nodes.forEach((_, index) => {
      window.setTimeout(() => setActive(index), index * 450);
    });
    window.setTimeout(() => setActive(null), nodes.length * 450 + 400);
  };

  return (
    <StructurePage title="Linked List Visualizer" description="Nodes are connected by explicit next pointers and can be inserted, deleted, and traversed.">
      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <Card>
          <CardHeader>
            <CardTitle>Singly Linked List</CardTitle>
            <CardDescription>Each node points to the next node in sequence.</CardDescription>
          </CardHeader>
          <CardContent className="min-h-[360px] overflow-x-auto">
            <div className="flex min-w-max items-center gap-3 pt-20">
              <AnimatePresence initial={false}>
                {nodes.map((node, index) => (
                  <div key={`${node}-${index}`} className="flex items-center gap-3">
                    <motion.div layout initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} className={`rounded-md border px-6 py-5 text-center font-semibold ${active === index ? "border-primary bg-primary/15 text-primary" : "bg-secondary"}`}>
                      {index === 0 && <Badge className="mb-2">Head</Badge>}
                      <div>{node}</div>
                    </motion.div>
                    {index < nodes.length - 1 && <ArrowRight className="size-6 text-muted-foreground" />}
                  </div>
                ))}
              </AnimatePresence>
              <Badge variant="secondary">null</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Controls</CardTitle>
            <CardDescription>Operate on the tail for insertion and deletion.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Input value={value} onChange={(event) => setValue(event.target.value)} placeholder="Value" onKeyDown={(event) => event.key === "Enter" && insert()} />
            <Button onClick={insert}><Plus />Insert</Button>
            <Button variant="secondary" onClick={() => setNodes((current) => current.slice(0, -1))} disabled={!nodes.length}><Trash2 />Delete</Button>
            <Button variant="outline" onClick={traverse} disabled={!nodes.length}><ScanLine />Traverse</Button>
          </CardContent>
        </Card>
      </div>
    </StructurePage>
  );
}
