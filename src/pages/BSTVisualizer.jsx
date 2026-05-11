import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Search, Trash2 } from "lucide-react";
import { StructurePage } from "@/pages/StackVisualizer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

function insertNode(node, value) {
  if (!node) return { value, left: null, right: null };
  if (value < node.value) return { ...node, left: insertNode(node.left, value) };
  if (value > node.value) return { ...node, right: insertNode(node.right, value) };
  return node;
}

function minValue(node) {
  let current = node;
  while (current.left) current = current.left;
  return current.value;
}

function deleteNode(node, value) {
  if (!node) return null;
  if (value < node.value) return { ...node, left: deleteNode(node.left, value) };
  if (value > node.value) return { ...node, right: deleteNode(node.right, value) };
  if (!node.left) return node.right;
  if (!node.right) return node.left;
  const nextValue = minValue(node.right);
  return { ...node, value: nextValue, right: deleteNode(node.right, nextValue) };
}

function findPath(node, value, path = []) {
  if (!node) return path;
  const nextPath = [...path, node.value];
  if (node.value === value) return nextPath;
  return value < node.value ? findPath(node.left, value, nextPath) : findPath(node.right, value, nextPath);
}

function layoutTree(node, depth = 0, x = 0, spread = 220, nodes = [], edges = [], parent = null) {
  if (!node) return { nodes, edges };
  const id = `${node.value}-${depth}-${x}`;
  nodes.push({ id, value: node.value, x, y: depth * 90 + 48 });
  if (parent) edges.push({ from: parent, to: id });
  layoutTree(node.left, depth + 1, x - spread / (depth + 1.4), spread, nodes, edges, id);
  layoutTree(node.right, depth + 1, x + spread / (depth + 1.4), spread, nodes, edges, id);
  return { nodes, edges };
}

export function BSTVisualizer() {
  const [root, setRoot] = useState(() => [48, 24, 72, 12, 36, 60, 84].reduce((tree, value) => insertNode(tree, value), null));
  const [value, setValue] = useState("");
  const [path, setPath] = useState([]);
  const tree = useMemo(() => layoutTree(root), [root]);

  const parsedValue = Number(value);
  const hasNumber = Number.isFinite(parsedValue);

  const insert = () => {
    if (!hasNumber) return;
    setRoot((current) => insertNode(current, parsedValue));
    setValue("");
    setPath([]);
  };

  const search = () => {
    if (!hasNumber) return;
    const traversal = findPath(root, parsedValue);
    traversal.forEach((nodeValue, index) => {
      window.setTimeout(() => setPath(traversal.slice(0, index + 1)), index * 450);
    });
  };

  return (
    <StructurePage title="Binary Search Tree Visualizer" description="Insert, search, and delete values while preserving ordered tree structure.">
      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <Card>
          <CardHeader>
            <CardTitle>Binary Search Tree</CardTitle>
            <CardDescription>Left values are smaller, right values are larger.</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <div className="relative h-[430px] min-w-[720px] rounded-lg border bg-background/60">
              <svg className="absolute inset-0 size-full" viewBox="-360 0 720 430" aria-hidden="true">
                {tree.edges.map((edge) => {
                  const from = tree.nodes.find((node) => node.id === edge.from);
                  const to = tree.nodes.find((node) => node.id === edge.to);
                  return <line key={`${edge.from}-${edge.to}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} className="stroke-border" strokeWidth="2" />;
                })}
              </svg>
              <div className="absolute inset-0" style={{ transform: "translateX(360px)" }}>
                <AnimatePresence>
                  {tree.nodes.map((node) => (
                    <motion.div
                      key={node.id}
                      layout
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1, x: node.x - 24, y: node.y - 24 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      className={`absolute flex size-12 items-center justify-center rounded-full border font-semibold ${path.includes(node.value) ? "border-primary bg-primary/20 text-primary" : "bg-secondary"}`}
                    >
                      {node.value}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Controls</CardTitle>
            <CardDescription>Values are numeric for ordered placement.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Input value={value} onChange={(event) => setValue(event.target.value)} placeholder="Number" inputMode="numeric" onKeyDown={(event) => event.key === "Enter" && insert()} />
            <Button onClick={insert} disabled={!hasNumber}><Plus />Insert</Button>
            <Button variant="outline" onClick={search} disabled={!hasNumber}><Search />Search</Button>
            <Button variant="secondary" onClick={() => hasNumber && setRoot((current) => deleteNode(current, parsedValue))} disabled={!hasNumber}><Trash2 />Delete</Button>
            <Badge variant="secondary" className="w-fit">Path {path.join(" -> ") || "none"}</Badge>
          </CardContent>
        </Card>
      </div>
    </StructurePage>
  );
}
