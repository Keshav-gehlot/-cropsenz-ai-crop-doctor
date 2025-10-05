import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Warehouse, 
  Building2, 
  Thermometer, 
  Shield, 
  Clock, 
  MapPin, 
  Phone, 
  Star,
  Plus,
  Refrigerator,
  Truck
} from 'lucide-react';

interface StorageRental {
  id: string;
  owner: string;
  location: string;
  capacity: string;
  type: 'cold' | 'dry' | 'refrigerated';
  pricePerDay: number;
  rating: number;
  available: boolean;
  features: string[];
  contact: string;
}

const StorageSuggestionsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'private' | 'government' | 'rental'>('private');
  const [isAddingRental, setIsAddingRental] = useState(false);
  const [rentalForm, setRentalForm] = useState({
    location: '',
    capacity: '',
    type: 'dry',
    pricePerDay: '',
    features: '',
    contact: '',
    description: ''
  });

  const storageRentals: StorageRental[] = [
    {
      id: '1',
      owner: 'Ramesh Kumar',
      location: 'Nashik, Maharashtra',
      capacity: '500 tons',
      type: 'cold',
      pricePerDay: 2500,
      rating: 4.8,
      available: true,
      features: ['Temperature Control', 'Humidity Control', '24/7 Security', 'Loading Dock'],
      contact: '+91 9876543210'
    },
    {
      id: '2',
      owner: 'Green Valley Farms',
      location: 'Bangalore, Karnataka',
      capacity: '1000 tons',
      type: 'refrigerated',
      pricePerDay: 3200,
      rating: 4.6,
      available: true,
      features: ['Multi-Zone Temperature', 'Automated Systems', 'Quality Monitoring'],
      contact: '+91 8765432109'
    },
    {
      id: '3',
      owner: 'Agri Storage Co.',
      location: 'Pune, Maharashtra',
      capacity: '750 tons',
      type: 'dry',
      pricePerDay: 1800,
      rating: 4.5,
      available: false,
      features: ['Pest Control', 'Moisture Control', 'Easy Access'],
      contact: '+91 7654321098'
    }
  ];

  const privateStorageTips = [
    {
      title: 'Temperature Control',
      description: 'Maintain optimal temperature ranges for different crops',
      icon: <Thermometer className="h-5 w-5" />,
      tips: [
        'Install proper ventilation systems',
        'Use temperature monitoring devices',
        'Ensure backup power for cooling systems',
        'Regular maintenance of cooling equipment'
      ]
    },
    {
      title: 'Security Measures',
      description: 'Protect your stored crops from theft and damage',
      icon: <Shield className="h-5 w-5" />,
      tips: [
        'Install CCTV surveillance systems',
        '24/7 security personnel or alarm systems',
        'Proper lighting around storage areas',
        'Secure locks and access control'
      ]
    },
    {
      title: 'Quality Monitoring',
      description: 'Regular inspection and quality checks',
      icon: <Clock className="h-5 w-5" />,
      tips: [
        'Daily visual inspections',
        'Moisture content monitoring',
        'Pest and rodent control measures',
        'First-in-first-out rotation system'
      ]
    }
  ];

  const governmentFacilities = [
    {
      name: 'Central Warehousing Corporation (CWC)',
      location: 'Pan India',
      capacity: 'Multiple locations',
      contact: '1800-123-4567',
      services: ['Scientific Storage', 'Quality Assurance', 'Insurance Coverage'],
      eligibility: 'All farmers with valid documents'
    },
    {
      name: 'Food Corporation of India (FCI)',
      location: 'All major agricultural states',
      capacity: 'Large scale storage',
      contact: '1800-567-8901',
      services: ['Grain Storage', 'Price Support', 'Distribution'],
      eligibility: 'Registered farmers, priority to small farmers'
    },
    {
      name: 'State Warehousing Corporation',
      location: 'State-wise facilities',
      capacity: 'Regional storage hubs',
      contact: 'State-specific numbers',
      services: ['Cold Storage', 'Processing Facilities', 'Market Linkage'],
      eligibility: 'State farmers, cooperatives'
    }
  ];

  const handleAddRental = () => {
    // In a real app, this would send data to a backend
    console.log('Adding new rental:', rentalForm);
    setIsAddingRental(false);
    setRentalForm({
      location: '',
      capacity: '',
      type: 'dry',
      pricePerDay: '',
      features: '',
      contact: '',
      description: ''
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'cold':
        return <Refrigerator className="h-4 w-4" />;
      case 'refrigerated':
        return <Thermometer className="h-4 w-4" />;
      default:
        return <Warehouse className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Storage Suggestions</h1>
          <p className="text-muted-foreground">
            Find the best storage solutions for your agricultural produce
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 bg-card p-1 rounded-lg border">
          <Button
            variant={activeTab === 'private' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('private')}
            className="flex items-center gap-2"
          >
            <Warehouse className="h-4 w-4" />
            Private Storage
          </Button>
          <Button
            variant={activeTab === 'government' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('government')}
            className="flex items-center gap-2"
          >
            <Building2 className="h-4 w-4" />
            Government Storage
          </Button>
          <Button
            variant={activeTab === 'rental' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('rental')}
            className="flex items-center gap-2"
          >
            <Truck className="h-4 w-4" />
            Storage Rental
          </Button>
        </div>

        {/* Private Storage Section */}
        {activeTab === 'private' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Warehouse className="h-5 w-5" />
                  Private Storage Best Practices
                </CardTitle>
                <CardDescription>
                  Essential guidelines for farmers with their own storage facilities
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {privateStorageTips.map((tip, index) => (
                <Card key={index} className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {tip.icon}
                      {tip.title}
                    </CardTitle>
                    <CardDescription>{tip.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {tip.tips.map((tipItem, tipIndex) => (
                        <li key={tipIndex} className="flex items-start gap-2 text-sm">
                          <span className="text-primary mt-1">•</span>
                          {tipItem}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Government Storage Section */}
        {activeTab === 'government' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Government Cold Storage Facilities
                </CardTitle>
                <CardDescription>
                  Available public storage facilities and access information for small farmers
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {governmentFacilities.map((facility, index) => (
                <Card key={index} className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      {facility.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-muted-foreground">Location</p>
                        <p className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {facility.location}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground">Contact</p>
                        <p className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {facility.contact}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="font-medium text-muted-foreground mb-2">Services</p>
                      <div className="flex flex-wrap gap-1">
                        {facility.services.map((service, serviceIndex) => (
                          <Badge key={serviceIndex} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="font-medium text-muted-foreground">Eligibility</p>
                      <p className="text-sm">{facility.eligibility}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Storage Rental Section */}
        {activeTab === 'rental' && (
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Storage Rental Marketplace
                  </CardTitle>
                  <CardDescription>
                    Rent storage space or list your extra storage for others
                  </CardDescription>
                </div>
                <Dialog open={isAddingRental} onOpenChange={setIsAddingRental}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      List Your Storage
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>List Your Storage for Rent</DialogTitle>
                      <DialogDescription>
                        Add your storage facility to help other farmers
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="Location"
                        value={rentalForm.location}
                        onChange={(e) => setRentalForm({...rentalForm, location: e.target.value})}
                      />
                      <Input
                        placeholder="Capacity (e.g., 100 tons)"
                        value={rentalForm.capacity}
                        onChange={(e) => setRentalForm({...rentalForm, capacity: e.target.value})}
                      />
                      <Select 
                        value={rentalForm.type} 
                        onValueChange={(value) => setRentalForm({...rentalForm, type: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Storage Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dry">Dry Storage</SelectItem>
                          <SelectItem value="cold">Cold Storage</SelectItem>
                          <SelectItem value="refrigerated">Refrigerated</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Price per day (₹)"
                        type="number"
                        value={rentalForm.pricePerDay}
                        onChange={(e) => setRentalForm({...rentalForm, pricePerDay: e.target.value})}
                      />
                      <Input
                        placeholder="Contact Number"
                        value={rentalForm.contact}
                        onChange={(e) => setRentalForm({...rentalForm, contact: e.target.value})}
                      />
                      <Input
                        placeholder="Features (comma separated)"
                        value={rentalForm.features}
                        onChange={(e) => setRentalForm({...rentalForm, features: e.target.value})}
                      />
                      <Textarea
                        placeholder="Description"
                        value={rentalForm.description}
                        onChange={(e) => setRentalForm({...rentalForm, description: e.target.value})}
                      />
                      <Button onClick={handleAddRental} className="w-full">
                        List Storage
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {storageRentals.map((rental) => (
                <Card key={rental.id} className={`glass-card ${!rental.available ? 'opacity-60' : ''}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          {getTypeIcon(rental.type)}
                          {rental.owner}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {rental.location}
                        </p>
                      </div>
                      <Badge variant={rental.available ? 'default' : 'secondary'}>
                        {rental.available ? 'Available' : 'Occupied'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-muted-foreground">Capacity</p>
                        <p>{rental.capacity}</p>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground">Price/Day</p>
                        <p className="font-semibold text-primary">₹{rental.pricePerDay}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{rental.rating}</span>
                      <span className="text-xs text-muted-foreground">rating</span>
                    </div>

                    <div>
                      <p className="font-medium text-muted-foreground mb-2">Features</p>
                      <div className="flex flex-wrap gap-1">
                        {rental.features.map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button 
                      className="w-full" 
                      disabled={!rental.available}
                      variant={rental.available ? 'default' : 'secondary'}
                    >
                      {rental.available ? 'Contact Owner' : 'Not Available'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StorageSuggestionsScreen;