import { RotateCcw, Shuffle, Pause, Play, SkipForward, Volume2, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { AlgorithmInfo } from "@/components/visualizer/AlgorithmInfo";
import { SortingBars } from "@/components/visualizer/SortingBars";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { sortingAlgorithms } from "@/data/algorithmInfo";
import { useSortingPlayer } from "@/hooks/useSortingPlayer";

export function SortingVisualizer() {
  const player = useSortingPlayer();
  const algorithm = sortingAlgorithms[player.algorithm];

  return (
    <div className="mx-auto grid max-w-7xl gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Badge variant="accent" className="mb-3 w-fit">Step replay architecture</Badge>
          <h1 className="text-3xl font-semibold tracking-normal">Sorting Visualizer</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Generate animation steps first, then replay comparisons, swaps, pivots, and overwrites with pauseable controls.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{player.steps.length} steps</Badge>
          <Badge>{player.progress}% complete</Badge>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>{algorithm.label}</CardTitle>
              <CardDescription>Comparisons are amber, pivots are violet, sorted values are green.</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={player.generate}>
                    <Shuffle />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Generate random array</TooltipContent>
              </Tooltip>
              <Button onClick={() => player.setIsPlaying(!player.isPlaying)} disabled={player.isComplete}>
                {player.isPlaying ? <Pause /> : <Play />}
                {player.isPlaying ? "Pause" : "Start"}
              </Button>
              <Button variant="secondary" onClick={player.stepForward} disabled={player.isPlaying || player.isComplete}>
                <SkipForward />
                Step
              </Button>
              <Button variant="outline" onClick={player.reset}>
                <RotateCcw />
                Reset
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <SortingBars array={player.array} activeIndices={player.activeIndices} pivotIndices={player.pivotIndices} sortedIndices={player.sortedIndices} />
          </CardContent>
        </Card>

        <div className="grid gap-5">
          <Card>
            <CardHeader>
              <CardTitle>Control Panel</CardTitle>
              <CardDescription>Dial in the run before or during playback.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5">
              <label className="grid gap-2 text-sm font-medium">
                Algorithm
                <Select value={player.algorithm} onValueChange={player.updateAlgorithm}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(sortingAlgorithms).map(([key, value]) => (
                      <SelectItem key={key} value={key}>{value.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>

              <div className="grid gap-3">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Speed</span>
                  <span className="text-muted-foreground">{player.speed}%</span>
                </div>
                <Slider value={[player.speed]} min={10} max={100} step={1} onValueChange={([value]) => player.setSpeed(value)} />
              </div>

              <div className="grid gap-3">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Array Size</span>
                  <span className="text-muted-foreground">{player.arraySize}</span>
                </div>
                <Slider value={[player.arraySize]} min={12} max={84} step={1} onValueChange={([value]) => player.updateSize(value)} />
              </div>

              <Separator />

              <div className="flex flex-wrap gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Zap />
                      Speed presets
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {[25, 50, 75, 100].map((value) => (
                      <DropdownMenuCheckboxItem key={value} checked={player.speed === value} onCheckedChange={() => player.setSpeed(value)}>
                        {value === 25 ? "Careful" : value === 50 ? "Balanced" : value === 75 ? "Fast" : "Turbo"}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline">
                  <Volume2 />
                  Sound off
                </Button>
              </div>
            </CardContent>
          </Card>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
            <AlgorithmInfo algorithm={algorithm} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
