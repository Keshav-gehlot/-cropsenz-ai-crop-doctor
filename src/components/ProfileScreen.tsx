import { useState } from "react";
import {
  ArrowLeft,
  Edit,
  Phone,
  Mail,
  MapPin,
  Wheat,
  Moon,
  Sun,
  Globe,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Switch } from "./ui/switch";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Screen } from "../App";

interface ProfileScreenProps {
  onNavigate: (screen: Screen) => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: (darkMode: boolean) => void;
}

export function ProfileScreen({
  onNavigate,
  isDarkMode = false,
  onToggleDarkMode,
}: ProfileScreenProps) {
  const [notifications, setNotifications] = useState(true);
  const [language] = useState("English");

  const profileData = {
    name: "Rajesh Kumar",
    phone: "+91 9876543210",
    email: "rajesh.farmer@email.com",
    location: "Ludhiana, Punjab",
    farmSize: "15 acres",
    primaryCrops: ["Wheat", "Rice", "Maize"],
    joinDate: "January 2024",
    totalAnalyses: 45,
    healthyScans: 32,
    avgGrade: "A",
  };

  const menuItems = [
    {
      icon: Globe,
      title: "Language",
      subtitle: language,
      action: () => {},
    },
    {
      icon: Bell,
      title: "Notifications",
      subtitle: "Manage alerts",
      action: () => {},
      hasSwitch: true,
      switchValue: notifications,
      onSwitchChange: setNotifications,
    },
    {
      icon: isDarkMode ? Sun : Moon,
      title: "Appearance",
      subtitle: isDarkMode ? "Light mode" : "Dark mode",
      action: () => {},
      hasSwitch: true,
      switchValue: isDarkMode,
      onSwitchChange: onToggleDarkMode || (() => {}),
    },
    {
      icon: HelpCircle,
      title: "Help & Support",
      subtitle: "Get assistance",
      action: () => {},
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {}
      <div className="bg-primary text-white p-4 flex items-center gap-3">
        <div className="container-responsive max-w-7xl mx-auto flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => onNavigate("home")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">
            Profile & Settings
          </h1>
        </div>
      </div>

      <div className="container-responsive max-w-7xl mx-auto p-4 space-y-6">
        {}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-primary text-white text-xl">
                  RK
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-semibold">
                  {profileData.name}
                </h2>
                <p className="text-muted-foreground">
                  Farmer since {profileData.joinDate}
                </p>
                <Badge variant="secondary" className="mt-1">
                  Premium Member
                </Badge>
              </div>
              <Button variant="outline" size="icon">
                <Edit className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">
                  {profileData.phone}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">
                  {profileData.email}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">
                  {profileData.location}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Wheat className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">
                  {profileData.farmSize} •{" "}
                  {profileData.primaryCrops.join(", ")}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {}
        <Card>
          <CardHeader>
            <CardTitle>Your Farming Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {profileData.totalAnalyses}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Scans
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {profileData.healthyScans}
                </div>
                <div className="text-sm text-muted-foreground">
                  Healthy Crops
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {profileData.avgGrade}
                </div>
                <div className="text-sm text-muted-foreground">
                  Avg Grade
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {}
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {menuItems.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.hasSwitch ? (
                      <Switch
                        checked={item.switchValue}
                        onCheckedChange={item.onSwitchChange}
                      />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
                {index < menuItems.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>

        {}
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>App Version</span>
                <span className="text-muted-foreground">
                  1.2.0
                </span>
              </div>
              <div className="flex justify-between">
                <span>Last Updated</span>
                <span className="text-muted-foreground">
                  Jan 15, 2024
                </span>
              </div>
              <div className="flex justify-between">
                <span>Data Usage</span>
                <span className="text-muted-foreground">
                  45.2 MB
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => onNavigate("history")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            View Analysis History
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            Contact Support
          </Button>

          <Button
            variant="destructive"
            className="w-full justify-start"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {}
        <div className="text-center text-xs text-muted-foreground pb-4">
          <p>CropSenz</p>
          <p>Smart Farming, Smarter Decisions</p>
          <p className="mt-2">© 2025 All rights reserved</p>
        </div>
      </div>
    </div>
  );
}
