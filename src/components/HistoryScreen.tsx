import { useState } from 'react';
import { ArrowLeft, Download, Share, Calendar, Search, Award, AlertTriangle, CheckCircle, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Screen } from '../App';

interface HistoryScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function HistoryScreen({ onNavigate }: HistoryScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const historyData = [
    {
      id: '1',
      type: 'diagnosis',
      crop: 'Wheat',
      title: 'Leaf Blight Detection',
      date: '2024-01-15',
      time: '10:30 AM',
      result: 'Disease Detected',
      severity: 'High',
      confidence: 89,
      status: 'infected',
      summary: 'Severe leaf blight infection detected with 89% confidence'
    },
    {
      id: '2',
      type: 'grading',
      crop: 'Rice',
      title: 'Quality Assessment',
      date: '2024-01-14',
      time: '02:15 PM',
      result: 'Grade A',
      grade: 'A',
      score: 92,
      status: 'excellent',
      summary: 'Excellent quality rice with Grade A classification'
    },
    {
      id: '3',
      type: 'diagnosis',
      crop: 'Tomato',
      title: 'Health Checkup',
      date: '2024-01-13',
      time: '11:45 AM',
      result: 'Healthy',
      severity: 'None',
      confidence: 95,
      status: 'healthy',
      summary: 'Crop appears healthy with no disease symptoms detected'
    },
    {
      id: '4',
      type: 'grading',
      crop: 'Maize',
      title: 'Harvest Quality Check',
      date: '2024-01-12',
      time: '09:20 AM',
      result: 'Grade B',
      grade: 'B',
      score: 78,
      status: 'good',
      summary: 'Good quality maize suitable for domestic market'
    },
    {
      id: '5',
      type: 'diagnosis',
      crop: 'Cotton',
      title: 'Pest Analysis',
      date: '2024-01-11',
      time: '04:30 PM',
      result: 'Aphid Infestation',
      severity: 'Medium',
      confidence: 82,
      status: 'infected',
      summary: 'Medium-level aphid infestation requires immediate treatment'
    }
  ];

  const filteredHistory = historyData.filter(item => {
    const matchesSearch = item.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string, type: string) => {
    if (type === 'grading') {
      return <Award className="w-5 h-5 text-orange-600" />;
    }

    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'infected':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default:
        return <Search className="w-5 h-5 text-blue-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800';
      case 'infected':
        return 'bg-red-100 text-red-800';
      case 'excellent':
        return 'bg-green-100 text-green-800';
      case 'good':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {}
      <div className="bg-primary text-white p-4 flex items-center gap-3">
        <div className="container-responsive max-w-7xl mx-auto flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => onNavigate('home')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Analysis History</h1>
        </div>
      </div>

      <div className="container-responsive max-w-7xl mx-auto p-4 space-y-4">
        {}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by crop or analysis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-32">
              <Filter className="w-4 h-4 mr-1" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="diagnosis">Diagnosis</SelectItem>
              <SelectItem value="grading">Grading</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {}
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {historyData.filter(item => item.type === 'diagnosis').length}
              </div>
              <div className="text-sm text-muted-foreground">Diagnoses</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {historyData.filter(item => item.type === 'grading').length}
              </div>
              <div className="text-sm text-muted-foreground">Gradings</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {historyData.filter(item => item.status === 'healthy').length}
              </div>
              <div className="text-sm text-muted-foreground">Healthy</div>
            </CardContent>
          </Card>
        </div>

        {}
        <div className="space-y-3">
          {filteredHistory.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">No Results Found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredHistory.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                      {getStatusIcon(item.status, item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold truncate">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.crop}</p>
                        </div>
                        <Badge className={getStatusColor(item.status)}>
                          {item.result}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {item.summary}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(item.date)}
                          </div>
                          <span>{item.time}</span>
                          {item.confidence && (
                            <Badge variant="outline" className="text-xs">
                              {item.confidence}% confidence
                            </Badge>
                          )}
                          {item.score && (
                            <Badge variant="outline" className="text-xs">
                              Score: {item.score}/100
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share className="w-3 h-3 mr-1" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {}
        {filteredHistory.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Bulk Actions</h3>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download All Reports
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share className="w-4 h-4 mr-2" />
                  Share via WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
