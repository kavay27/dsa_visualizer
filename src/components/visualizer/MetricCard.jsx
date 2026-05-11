import { Card, CardContent } from "@/components/ui/card";

export function MetricCard({ label, value }) {
  return (
    <Card className="shadow-none">
      <CardContent className="p-4">
        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
        <p className="mt-2 text-sm font-medium leading-6">{value}</p>
      </CardContent>
    </Card>
  );
}
