
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface AuthDialogsProps {
  variant: "login" | "signup";
  triggerClassName?: string;
  children?: React.ReactNode;
}

const AuthDialogs = ({ variant, triggerClassName, children }: AuthDialogsProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: ""
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (variant === "signup" && formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would connect to an authentication service
    toast({
      title: variant === "login" ? "Login successful!" : "Account created!",
      description: variant === "login" 
        ? "Welcome back to our platform." 
        : "Your account has been successfully created.",
    });
    
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant={variant === "login" ? "default" : "outline"} className={triggerClassName}>
            {variant === "login" ? "Log in" : "Sign up"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            {variant === "login" ? "Welcome Back" : "Create an Account"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {variant === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required={variant === "signup"}
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder={variant === "login" ? "Enter your password" : "Create a password"}
              required
            />
          </div>
          
          {variant === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                required={variant === "signup"}
              />
            </div>
          )}
          
          <Button type="submit" className="w-full mt-6">
            {variant === "login" ? "Log In" : "Sign Up"}
          </Button>
        </form>
        
        <div className="mt-4 text-center text-sm text-muted-foreground">
          {variant === "login" ? (
            <>Don't have an account? <Button variant="link" className="p-0" onClick={() => setOpen(false)}>Sign up</Button></>
          ) : (
            <>Already have an account? <Button variant="link" className="p-0" onClick={() => setOpen(false)}>Log in</Button></>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialogs;
