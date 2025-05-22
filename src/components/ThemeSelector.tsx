
import { useState, useEffect } from "react";
import { Check, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

type ColorTheme = "blue" | "green" | "yellow" | "orange" | "sky" | "purple" | "rose";

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();
  const [colorTheme, setColorTheme] = useState<ColorTheme>("blue");

  useEffect(() => {
    // Get stored color theme from local storage or default to blue
    const storedColorTheme = localStorage.getItem("color-theme") as ColorTheme | null;
    if (storedColorTheme) {
      setColorTheme(storedColorTheme);
      document.documentElement.setAttribute("data-color-theme", storedColorTheme);
    }
  }, []);

  const handleColorThemeChange = (value: ColorTheme) => {
    setColorTheme(value);
    localStorage.setItem("color-theme", value);
    document.documentElement.setAttribute("data-color-theme", value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative hover:scale-105 transition-transform">
          <Palette className="h-4 w-4" />
          <span className="sr-only">Toggle theme</span>
          <span className={`absolute bottom-0 right-0 h-2 w-2 rounded-full ${
            {
              blue: "bg-blue-500",
              green: "bg-green-500",
              yellow: "bg-yellow-500",
              orange: "bg-orange-500",
              sky: "bg-sky-500",
              purple: "bg-purple-500",
              rose: "bg-rose-500",
            }[colorTheme]
          }`}></span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="animate-fade-in backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 border border-white/20 dark:border-white/10">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          <DropdownMenuRadioItem value="light" className="transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
            <Check className={`mr-2 h-4 w-4 ${theme === "light" ? "opacity-100" : "opacity-0"}`} />
            Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark" className="transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
            <Check className={`mr-2 h-4 w-4 ${theme === "dark" ? "opacity-100" : "opacity-0"}`} />
            Dark
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system" className="transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
            <Check className={`mr-2 h-4 w-4 ${theme === "system" ? "opacity-100" : "opacity-0"}`} />
            System
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Color Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={colorTheme} onValueChange={handleColorThemeChange}>
          <DropdownMenuRadioItem value="blue" className="flex items-center transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
            <span className="h-4 w-4 rounded-full bg-blue-500 mr-2"></span>
            Blue
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="green" className="flex items-center transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
            <span className="h-4 w-4 rounded-full bg-green-500 mr-2"></span>
            Green
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="yellow" className="flex items-center transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
            <span className="h-4 w-4 rounded-full bg-yellow-500 mr-2"></span>
            Yellow
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="orange" className="flex items-center transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
            <span className="h-4 w-4 rounded-full bg-orange-500 mr-2"></span>
            Orange
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="sky" className="flex items-center transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
            <span className="h-4 w-4 rounded-full bg-sky-500 mr-2"></span>
            Sky Blue
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="purple" className="flex items-center transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
            <span className="h-4 w-4 rounded-full bg-purple-500 mr-2"></span>
            Purple
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="rose" className="flex items-center transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
            <span className="h-4 w-4 rounded-full bg-rose-500 mr-2"></span>
            Rose
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;
