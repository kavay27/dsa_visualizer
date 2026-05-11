import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/visualizer/MetricCard";

export function AlgorithmInfo({ algorithm }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <CardTitle>{algorithm.label}</CardTitle>
          <Badge variant={algorithm.stability === "Stable" ? "default" : "secondary"}>{algorithm.stability}</Badge>
        </div>
        <CardDescription>{algorithm.description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        <MetricCard label="Time Complexity" value={algorithm.time} />
        <MetricCard label="Space Complexity" value={algorithm.space} />
        <MetricCard label="Best Case" value={algorithm.best} />
        <MetricCard label="Worst Case" value={algorithm.worst} />
      </CardContent>
    </Card>
  );
}
