
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface AuthDialogsProps {
  variant: "login" | "signup";
  triggerClassName?: string;
  children?: React.ReactNode;
  onSuccess?: () => void;
}

const AuthDialogs = ({ variant, triggerClassName, children, onSuccess }: AuthDialogsProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"login" | "signup">(variant);
  const [accountType, setAccountType] = useState<"individual" | "organisation">("individual");
  const [step, setStep] = useState<1 | 2>(1);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    // Organisation fields
    jobTitle: "",
    orgName: "",
    citbNumber: "",
    industry: "",
    orgSize: "",
    jobFunction: ""
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value as "login" | "signup");
    setStep(1);
  };
  
  const handleAccountTypeChange = (value: string) => {
    setAccountType(value as "individual" | "organisation");
  };
  
  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (accountType === "individual") {
      handleSubmit(e);
    } else {
      setStep(2);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeTab === "signup" && formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would connect to an authentication service
    toast({
      title: activeTab === "login" ? "Login successful!" : "Account created!",
      description: activeTab === "login" 
        ? "Welcome back to our platform." 
        : "Your account has been successfully created.",
    });
    
    if (onSuccess) {
      onSuccess();
    }
    
    setOpen(false);
    setStep(1);
  };
  
  const handleBack = () => {
    setStep(1);
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
      <DialogContent className="sm:max-w-[425px]">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-2 w-full mb-4">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center mb-4">
                Welcome Back
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input 
                  id="login-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input 
                  id="login-password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full mt-6">
                Log In
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            {step === 1 ? (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-center mb-4">
                    Create an Account
                  </DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleContinue} className="space-y-4">
                  <div className="space-y-3">
                    <Label>Account Type</Label>
                    <RadioGroup 
                      value={accountType} 
                      onValueChange={handleAccountTypeChange} 
                      className="flex space-x-2"
                    >
                      <div className="flex items-center space-x-2 flex-1">
                        <RadioGroupItem value="individual" id="individual" className="sr-only" />
                        <Label
                          htmlFor="individual"
                          className={`flex-1 py-2 px-3 text-center rounded-md cursor-pointer border ${
                            accountType === "individual" 
                              ? "bg-primary text-primary-foreground border-primary" 
                              : "bg-background border-input"
                          }`}
                        >
                          Individual
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 flex-1">
                        <RadioGroupItem value="organisation" id="organisation" className="sr-only" />
                        <Label
                          htmlFor="organisation"
                          className={`flex-1 py-2 px-3 text-center rounded-md cursor-pointer border ${
                            accountType === "organisation" 
                              ? "bg-primary text-primary-foreground border-primary" 
                              : "bg-background border-input"
                          }`}
                        >
                          Organisation
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input 
                      id="signup-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input 
                      id="signup-password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Create a password"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input 
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full mt-6">
                    {accountType === "individual" ? "Sign Up" : "Continue"}
                  </Button>
                </form>
              </>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-center mb-4">
                    Organisation Details
                  </DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Please enter your job title & organisation details - this will help us to personalise our service.
                  </p>
                  
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job title*</Label>
                    <Input 
                      id="jobTitle"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      placeholder="Your job title"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="orgName">Organisation name*</Label>
                    <Input 
                      id="orgName"
                      name="orgName"
                      value={formData.orgName}
                      onChange={handleInputChange}
                      placeholder="Your organisation name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="citbNumber">CITB Levy Number</Label>
                    <Input 
                      id="citbNumber"
                      name="citbNumber"
                      value={formData.citbNumber}
                      onChange={handleInputChange}
                      placeholder="CITB Levy Number (optional)"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <select 
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                      className="w-full p-2 border rounded-md bg-background dark:bg-slate-800 dark:border-slate-700"
                    >
                      <option value="">Please select</option>
                      <option value="construction">Construction</option>
                      <option value="engineering">Engineering</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="education">Education</option>
                      <option value="finance">Finance</option>
                      <option value="it">Information Technology</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="orgSize">Organisation size</Label>
                    <select 
                      id="orgSize"
                      name="orgSize"
                      value={formData.orgSize}
                      onChange={(e) => setFormData(prev => ({ ...prev, orgSize: e.target.value }))}
                      className="w-full p-2 border rounded-md bg-background dark:bg-slate-800 dark:border-slate-700"
                    >
                      <option value="">Please select</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="501+">501+ employees</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="jobFunction">Job function</Label>
                    <select 
                      id="jobFunction"
                      name="jobFunction"
                      value={formData.jobFunction}
                      onChange={(e) => setFormData(prev => ({ ...prev, jobFunction: e.target.value }))}
                      className="w-full p-2 border rounded-md bg-background dark:bg-slate-800 dark:border-slate-700"
                    >
                      <option value="">Please select</option>
                      <option value="management">Management</option>
                      <option value="hr">Human Resources</option>
                      <option value="finance">Finance</option>
                      <option value="operations">Operations</option>
                      <option value="it">IT</option>
                      <option value="sales">Sales</option>
                      <option value="marketing">Marketing</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="flex gap-2 mt-6">
                    <Button type="button" variant="outline" className="w-1/3" onClick={handleBack}>
                      Back
                    </Button>
                    <Button type="submit" className="w-2/3">
                      Continue
                    </Button>
                  </div>
                </form>
              </>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialogs;
