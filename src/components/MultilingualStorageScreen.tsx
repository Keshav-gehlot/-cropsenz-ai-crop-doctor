import { memo, useState, useEffect } from 'react';
import { 
  Warehouse, 
  Building2, 
  Home, 
  MapPin, 
  Phone, 
  Star, 
  Filter,
  Search,
  Thermometer,
  Shield,
  DollarSign,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useLanguage } from '../contexts/LanguageContext';

interface StorageFacility {
  id: string;
  name: string;
  type: 'private' | 'government' | 'rental';
  location: string;
  capacity: number;
  available: number;
  temperature: string;
  humidity: string;
  rating: number;
  pricePerUnit: number;
  currency: string;
  contact: string;
  features: string[];
  distance: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  description: string;
  image?: string;
}

interface StorageFilter {
  type: string;
  location: string;
  capacity: string;
  priceRange: string;
  rating: string;
}

const MultilingualStorageScreen = memo(function MultilingualStorageScreen() {
  const { t } = useLanguage();
  const [facilities, setFacilities] = useState<StorageFacility[]>([]);
  const [filteredFacilities, setFilteredFacilities] = useState<StorageFacility[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<StorageFilter>({
    type: 'all',
    location: 'all',
    capacity: 'all',
    priceRange: 'all',
    rating: 'all'
  });
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data loading
  useEffect(() => {
    const loadFacilities = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockFacilities: StorageFacility[] = [
        {
          id: '1',
          name: 'Green Valley Storage',
          type: 'private',
          location: 'Punjab, India',
          capacity: 10000,
          available: 2500,
          temperature: '15-20°C',
          humidity: '60-65%',
          rating: 4.8,
          pricePerUnit: 50,
          currency: '₹',
          contact: '+91 98765 43210',
          features: ['Climate Control', '24/7 Security', 'Pest Control', 'Easy Access'],
          distance: 5.2,
          coordinates: { lat: 30.7333, lng: 76.7794 },
          description: 'Modern climate-controlled facility with advanced monitoring systems.'
        },
        {
          id: '2',
          name: 'Government Warehouse Complex',
          type: 'government',
          location: 'Haryana, India',
          capacity: 50000,
          available: 15000,
          temperature: '12-18°C',
          humidity: '55-70%',
          rating: 4.2,
          pricePerUnit: 30,
          currency: '₹',
          contact: '+91 87654 32109',
          features: ['Subsidized Rates', 'Large Capacity', 'Government Certified', 'Insurance'],
          distance: 12.8,
          coordinates: { lat: 29.0588, lng: 76.0856 },
          description: 'Government-operated facility with subsidized storage rates for farmers.'
        },
        {
          id: '3',
          name: 'AgriStore Pro',
          type: 'rental',
          location: 'Uttar Pradesh, India',
          capacity: 8000,
          available: 3200,
          temperature: '16-22°C',
          humidity: '58-68%',
          rating: 4.6,
          pricePerUnit: 45,
          currency: '₹',
          contact: '+91 76543 21098',
          features: ['Flexible Rental', 'Online Monitoring', 'Quality Assurance', 'Transport'],
          distance: 8.1,
          coordinates: { lat: 26.8467, lng: 80.9462 },
          description: 'Professional storage with flexible rental terms and online monitoring.'
        },
        {
          id: '4',
          name: 'FarmFresh Cold Storage',
          type: 'private',
          location: 'Maharashtra, India',
          capacity: 15000,
          available: 6000,
          temperature: '4-8°C',
          humidity: '85-90%',
          rating: 4.9,
          pricePerUnit: 75,
          currency: '₹',
          contact: '+91 65432 10987',
          features: ['Cold Storage', 'Fruits & Vegetables', 'Quick Processing', 'Export Ready'],
          distance: 25.5,
          coordinates: { lat: 19.0760, lng: 72.8777 },
          description: 'Specialized cold storage facility for fruits and vegetables.'
        },
        {
          id: '5',
          name: 'Community Storage Hub',
          type: 'rental',
          location: 'Rajasthan, India',
          capacity: 12000,
          available: 4800,
          temperature: '20-25°C',
          humidity: '50-60%',
          rating: 4.4,
          pricePerUnit: 35,
          currency: '₹',
          contact: '+91 54321 09876',
          features: ['Community Managed', 'Affordable Rates', 'Local Access', 'Grain Storage'],
          distance: 18.3,
          coordinates: { lat: 26.9124, lng: 75.7873 },
          description: 'Community-managed storage facility with affordable rates for local farmers.'
        }
      ];
      
      setFacilities(mockFacilities);
      setFilteredFacilities(mockFacilities);
      setIsLoading(false);
    };

    loadFacilities();
  }, []);

  // Filter facilities based on search and filters
  useEffect(() => {
    let filtered = facilities;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(facility =>
        facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        facility.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        facility.features.some(feature =>
          feature.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Filter by tab (type)
    if (activeTab !== 'all') {
      filtered = filtered.filter(facility => facility.type === activeTab);
    }

    // Apply other filters
    if (filters.location !== 'all') {
      filtered = filtered.filter(facility =>
        facility.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.capacity !== 'all') {
      const capacityRange = parseInt(filters.capacity);
      filtered = filtered.filter(facility => facility.capacity >= capacityRange);
    }

    if (filters.priceRange !== 'all') {
      const maxPrice = parseInt(filters.priceRange);
      filtered = filtered.filter(facility => facility.pricePerUnit <= maxPrice);
    }

    if (filters.rating !== 'all') {
      const minRating = parseFloat(filters.rating);
      filtered = filtered.filter(facility => facility.rating >= minRating);
    }

    setFilteredFacilities(filtered);
  }, [searchQuery, filters, activeTab, facilities]);

  const handleFilterChange = (key: keyof StorageFilter, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const renderFacilityCard = (facility: StorageFacility) => (
    <Card key={facility.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2 text-lg">
              {facility.type === 'government' && <Building2 className="h-5 w-5 text-blue-600" />}
              {facility.type === 'private' && <Home className="h-5 w-5 text-green-600" />}
              {facility.type === 'rental' && <Warehouse className="h-5 w-5 text-purple-600" />}
              {facility.name}
            </CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{facility.location}</span>
              <Badge variant="outline" className="text-xs">
                {facility.distance} km
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">{facility.rating}</span>
            </div>
            <Badge 
              variant={facility.type === 'government' ? 'secondary' : 
                      facility.type === 'private' ? 'default' : 'outline'}
              className="mt-1"
            >
              {t(facility.type)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {facility.description}
        </p>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Warehouse className="h-4 w-4 text-gray-500" />
              <span>{facility.available.toLocaleString()} / {facility.capacity.toLocaleString()} {t('units')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-blue-500" />
              <span>{facility.temperature}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-500" />
              <span className="font-medium">{facility.currency}{facility.pricePerUnit}/{t('unit')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-gray-500" />
              <span>{facility.humidity}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {facility.features.slice(0, 3).map((feature, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {feature}
            </Badge>
          ))}
          {facility.features.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{facility.features.length - 3} {t('more')}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Phone className="h-4 w-4" />
            <span>{facility.contact}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <MapPin className="h-4 w-4 mr-1" />
              {t('viewMap')}
            </Button>
            <Button size="sm">
              {t('bookNow')}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('storageTitle')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('storageSubtitle')}
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/20">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder={t('searchStorage')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Select onValueChange={(value) => handleFilterChange('location', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('selectLocation')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('allLocations')}</SelectItem>
                    <SelectItem value="punjab">Punjab</SelectItem>
                    <SelectItem value="haryana">Haryana</SelectItem>
                    <SelectItem value="uttar pradesh">Uttar Pradesh</SelectItem>
                    <SelectItem value="maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="rajasthan">Rajasthan</SelectItem>
                  </SelectContent>
                </Select>

                <Select onValueChange={(value) => handleFilterChange('capacity', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('minCapacity')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('anyCapacity')}</SelectItem>
                    <SelectItem value="5000">5,000+ {t('units')}</SelectItem>
                    <SelectItem value="10000">10,000+ {t('units')}</SelectItem>
                    <SelectItem value="20000">20,000+ {t('units')}</SelectItem>
                    <SelectItem value="50000">50,000+ {t('units')}</SelectItem>
                  </SelectContent>
                </Select>

                <Select onValueChange={(value) => handleFilterChange('priceRange', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('maxPrice')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('anyPrice')}</SelectItem>
                    <SelectItem value="30">₹30/{t('unit')}</SelectItem>
                    <SelectItem value="50">₹50/{t('unit')}</SelectItem>
                    <SelectItem value="75">₹75/{t('unit')}</SelectItem>
                    <SelectItem value="100">₹100/{t('unit')}</SelectItem>
                  </SelectContent>
                </Select>

                <Select onValueChange={(value) => handleFilterChange('rating', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('minRating')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('anyRating')}</SelectItem>
                    <SelectItem value="4.0">4.0+ ⭐</SelectItem>
                    <SelectItem value="4.5">4.5+ ⭐</SelectItem>
                    <SelectItem value="4.8">4.8+ ⭐</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 bg-white/80 dark:bg-gray-800/80">
            <TabsTrigger value="all">{t('allStorage')}</TabsTrigger>
            <TabsTrigger value="private">{t('private')}</TabsTrigger>
            <TabsTrigger value="government">{t('government')}</TabsTrigger>
            <TabsTrigger value="rental">{t('rental')}</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {/* Results Summary */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {filteredFacilities.length} {t('facilitiesFound')}
              </p>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                {t('moreFilters')}
              </Button>
            </div>

            {/* Facilities Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredFacilities.map(renderFacilityCard)}
            </div>

            {/* Empty State */}
            {filteredFacilities.length === 0 && (
              <div className="text-center py-12">
                <Warehouse className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {t('noFacilitiesFound')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {t('tryAdjustingFilters')}
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({
                      type: 'all',
                      location: 'all',
                      capacity: 'all',
                      priceRange: 'all',
                      rating: 'all'
                    });
                    setActiveTab('all');
                  }}
                >
                  {t('clearFilters')}
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-200 dark:border-green-800">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {t('needCustomStorage')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('customStorageDescription')}
            </p>
            <Button>
              <ExternalLink className="h-4 w-4 mr-2" />
              {t('contactUs')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
});

export default MultilingualStorageScreen;