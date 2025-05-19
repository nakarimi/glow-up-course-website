
import { useState, useEffect } from "react";
import { Moon, Sun, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

// Define available theme colors
const themeColors = [
  { name: "Blue", value: "blue" },
  { name: "Green", value: "green" },
  { name: "Yellow", value: "yellow" },
  { name: "Orange", value: "orange" },
  { name: "Sky", value: "sky" },
  { name: "Purple", value: "purple" },
];

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentColorTheme, setCurrentColorTheme] = useState<string>("blue");
  
  useEffect(() => {
    // Check for user's preference in localStorage
    const storedTheme = localStorage.getItem("theme");
    const storedColor = localStorage.getItem("colorTheme") || "blue";
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    // Set color theme
    setCurrentColorTheme(storedColor);
    document.documentElement.setAttribute("data-color", storedColor);
    
    // Set light/dark theme
    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);
  
  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };
  
  const changeColorTheme = (color: string) => {
    setCurrentColorTheme(color);
    document.documentElement.setAttribute("data-color", color);
    localStorage.setItem("colorTheme", color);
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Palette className="h-5 w-5" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuItem onClick={toggleTheme}>
          {isDarkMode ? (
            <Sun className="h-4 w-4 mr-2" />
          ) : (
            <Moon className="h-4 w-4 mr-2" />
          )}
          <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Color Theme</DropdownMenuLabel>
        
        {themeColors.map(color => (
          <DropdownMenuItem 
            key={color.value}
            onClick={() => changeColorTheme(color.value)}
            className={currentColorTheme === color.value ? "bg-muted" : ""}
          >
            <div 
              className={`h-4 w-4 mr-2 rounded-full`} 
              style={{ 
                backgroundColor: 
                  color.value === "blue" ? "#3b82f6" :
                  color.value === "green" ? "#22c55e" :
                  color.value === "yellow" ? "#eab308" :
                  color.value === "orange" ? "#f97316" :
                  color.value === "sky" ? "#0ea5e9" :
                  color.value === "purple" ? "#8b5cf6" : "#3b82f6"
              }}
            />
            <span>{color.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
