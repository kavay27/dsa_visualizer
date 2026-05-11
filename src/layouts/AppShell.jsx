import { Menu, Moon, Sun, Waypoints } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { visualizers } from "@/data/visualizers";
import { cn } from "@/lib/utils";

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
        <Waypoints className="size-5" />
      </div>
      <div>
        <p className="text-sm font-semibold leading-none">DSA Visualizer</p>
        <p className="mt-1 text-xs text-muted-foreground">Interactive algorithm lab</p>
      </div>
    </div>
  );
}

function Navigation({ activeView, onChange }) {
  return (
    <nav className="grid gap-1">
      <Button variant={activeView === "home" ? "secondary" : "ghost"} className="justify-start" onClick={() => onChange("home")}>
        Dashboard
      </Button>
      {visualizers.map((item) => (
        <Button key={item.id} variant={activeView === item.id ? "secondary" : "ghost"} className="justify-start" onClick={() => onChange(item.id)}>
          <item.icon className="size-4" />
          {item.title}
        </Button>
      ))}
    </nav>
  );
}

export function AppShell({ activeView, children, isDark, onChangeView, onToggleTheme }) {
  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r bg-card/70 p-5 backdrop-blur xl:block">
        <Brand />
        <Separator className="my-5" />
        <Navigation activeView={activeView} onChange={onChangeView} />
        <div className="absolute bottom-5 left-5 right-5">
          <Button variant="outline" className="w-full justify-start" onClick={onToggleTheme}>
            {isDark ? <Moon /> : <Sun />}
            {isDark ? "Dark mode" : "Light mode"}
          </Button>
        </div>
      </aside>

      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/86 px-4 backdrop-blur xl:hidden">
        <Brand />
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={onToggleTheme}>
                {isDark ? <Moon /> : <Sun />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Toggle theme</TooltipContent>
          </Tooltip>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <Brand />
              <Separator className="my-5" />
              <Navigation activeView={activeView} onChange={onChangeView} />
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className={cn("min-h-screen p-4 sm:p-6 xl:ml-72 xl:p-8")}>{children}</main>
    </div>
  );
}
