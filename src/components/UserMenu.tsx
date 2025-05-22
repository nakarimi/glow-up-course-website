
import { useState } from "react";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AuthDialogs from "./AuthDialogs";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserMenuProps {
  className?: string;
}

const UserMenu = ({ className }: UserMenuProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  
  // Mock sign out function - would be replaced with actual auth logic
  const handleSignOut = () => {
    setIsAuthenticated(false);
    toast({
      title: "Signed out successfully",
      description: "You have been signed out of your account",
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className={className}>
          {isAuthenticated ? (
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          ) : (
            <User className="h-5 w-5" />
          )}
          <span className="sr-only">User account</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2 mr-2">
        {isAuthenticated ? (
          <div className="space-y-2">
            <div className="flex items-center space-x-2 pb-2 mb-2 border-b">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">User Name</p>
                <p className="text-xs text-muted-foreground">user@example.com</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-sm"
              onClick={() => {}}
            >
              My Profile
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-sm"
              onClick={() => {}}
            >
              My Courses
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-sm"
              onClick={handleSignOut}
            >
              Sign out
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <AuthDialogs 
              variant="login" 
              triggerClassName="w-full justify-center"
              onSuccess={() => setIsAuthenticated(true)}
            >
              <Button variant="outline" className="w-full">
                Sign in
              </Button>
            </AuthDialogs>
            <AuthDialogs 
              variant="signup" 
              triggerClassName="w-full justify-center"
              onSuccess={() => setIsAuthenticated(true)}
            >
              <Button className="w-full">
                Sign up
              </Button>
            </AuthDialogs>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default UserMenu;
