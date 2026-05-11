import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { visualizers } from "@/data/visualizers";

export function Home({ onOpen }) {
  return (
    <div className="mx-auto grid max-w-7xl gap-6">
      <section className="overflow-hidden rounded-lg border bg-card surface-grid">
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.25fr_.75fr] lg:p-10">
          <div className="flex min-h-[300px] flex-col justify-center">
            <Badge className="mb-5 w-fit" variant="accent">
              <Sparkles className="mr-1 size-3" />
              Resume-ready algorithm playground
            </Badge>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-normal text-foreground sm:text-5xl">
              Data Structure & Algorithm Visualizer
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Explore sorting, stacks, queues, linked lists, and binary search trees through real-time controls, replayable animation steps, and clean implementation boundaries.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button onClick={() => onOpen("sorting")}>
                Launch Sorting
                <ArrowRight className="size-4" />
              </Button>
              <Button variant="outline" onClick={() => onOpen("bst")}>
                Try BST
              </Button>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid content-end gap-3 rounded-lg border bg-background/72 p-4"
          >
            {[58, 34, 76, 22, 88, 49, 67, 41, 94, 29, 72, 53].map((height, index) => (
              <motion.div
                key={`${height}-${index}`}
                initial={{ width: 0 }}
                animate={{ width: `${height}%` }}
                transition={{ delay: index * 0.04, type: "spring", stiffness: 90 }}
                className="h-4 rounded-sm bg-primary/80"
              />
            ))}
          </motion.div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {visualizers.map((item, index) => (
          <motion.div key={item.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
            <Card className="h-full transition-colors hover:border-primary/45">
              <CardHeader>
                <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-secondary text-primary">
                  <item.icon className="size-5" />
                </div>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" onClick={() => onOpen(item.id)}>
                  Open visualizer
                  <ArrowRight className="size-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
