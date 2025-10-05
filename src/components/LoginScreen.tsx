import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Leaf, Stethoscope, Globe } from 'lucide-react';
import { Screen } from '../App';

interface LoginScreenProps {
  onLogin: () => void;
  onNavigate: (screen: Screen) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [phoneEmail, setPhoneEmail] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState('en');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  const handleGuestLogin = () => {
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background p-4 flex flex-col">
      {}
      <div className="flex flex-col items-center pt-8 pb-6">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
          <div className="relative">
            <Leaf className="w-8 h-8 text-white" />
            <Stethoscope className="w-4 h-4 text-white absolute -bottom-0.5 -right-0.5" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-primary mb-2">CropSenz</h1>
        <p className="text-muted-foreground text-center">Smart Farming, Smarter Decisions</p>
      </div>

      {}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Globe className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Select Language</span>
        </div>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
            <SelectItem value="mr">मराठी (Marathi)</SelectItem>
            <SelectItem value="gu">ગુજરાતી (Gujarati)</SelectItem>
            <SelectItem value="pa">ਪੰਜਾਬੀ (Punjabi)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="text-center">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Phone number or Email"
                value={phoneEmail}
                onChange={(e) => setPhoneEmail(e.target.value)}
                className="h-12"
              />
            </div>

            <div>
              <Input
                type="password"
                placeholder={isLogin ? "Password" : "Create Password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12"
              />
            </div>

            <Button type="submit" className="w-full h-12" size="lg">
              {isLogin ? 'Login' : 'Register'}
            </Button>
          </form>

          <div className="mt-6 space-y-3">
            <Button
              variant="outline"
              className="w-full h-12"
              onClick={handleGuestLogin}
            >
              Continue as Guest
            </Button>

            <div className="text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:underline"
              >
                {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {}
      <div className="pt-6 text-center text-xs text-muted-foreground">
        By continuing, you agree to our Terms of Service and Privacy Policy
      </div>
    </div>
  );
}
