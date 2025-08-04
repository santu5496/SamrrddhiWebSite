import { useQuery } from "@tanstack/react-query";
import { Calendar, MapPin, Clock, Users, ArrowRight, Filter, Search, Star, Share2, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useState } from "react";

interface Event {
  id: number;
  title: string;
  description?: string;
  eventDate: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  maxParticipants?: number;
  currentParticipants?: number;
  eventType: string;
  isRegistrationOpen: boolean;
  registrationDeadline?: string;
  organizer?: string;
  imageUrl?: string;
}

export default function EventsSection() {
  const { data: events = [], isLoading } = useQuery<Event[]>({
    queryKey: ['/api/events'],
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [showPast, setShowPast] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-96 mx-auto mb-12"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div className="h-40 bg-gray-300 rounded"></div>
                  <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-10 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2024-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const isUpcoming = (eventDate: string) => {
    return new Date(eventDate) > new Date();
  };

  const getEventTypeColor = (eventType: string) => {
    switch (eventType.toLowerCase()) {
      case 'workshop':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'fundraiser':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'community':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'educational':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEventTypeIcon = (eventType: string) => {
    switch (eventType.toLowerCase()) {
      case 'workshop':
        return '🔧';
      case 'fundraiser':
        return '💝';
      case 'community':
        return '👥';
      case 'educational':
        return '📚';
      default:
        return '📅';
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesType = selectedType === "all" || event.eventType.toLowerCase() === selectedType;
    const matchesTimeFilter = showPast ? !isUpcoming(event.eventDate) : isUpcoming(event.eventDate);
    
    return matchesSearch && matchesType && matchesTimeFilter;
  });

  const eventTypes = Array.from(new Set(events.map(event => event.eventType.toLowerCase())));

  const getDaysUntilEvent = (eventDate: string) => {
    const days = Math.ceil((new Date(eventDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    return days;
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50" id="events">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full mr-3">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-4xl font-bold text-neutral">Events & Programs</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Join us in our community events, workshops, and fundraising activities that create lasting impact.
          </p>
          
          {/* Filter Controls */}
          <div className="bg-white rounded-xl shadow-sm border p-6 max-w-4xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Event Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  {eventTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {getEventTypeIcon(type)} {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="flex gap-2">
                <Button
                  variant={!showPast ? "default" : "outline"}
                  onClick={() => setShowPast(false)}
                  size="sm"
                >
                  Upcoming
                </Button>
                <Button
                  variant={showPast ? "default" : "outline"}
                  onClick={() => setShowPast(true)}
                  size="sm"
                >
                  Past Events
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-0 shadow-md overflow-hidden">
                <div className="relative">
                  {event.imageUrl ? (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <div className="text-6xl opacity-20">{getEventTypeIcon(event.eventType)}</div>
                    </div>
                  )}
                  
                  {/* Event Type Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className={`${getEventTypeColor(event.eventType)} border`}>
                      {getEventTypeIcon(event.eventType)} {event.eventType.charAt(0).toUpperCase() + event.eventType.slice(1)}
                    </Badge>
                  </div>

                  {/* Registration Status */}
                  {isUpcoming(event.eventDate) && (
                    <div className="absolute top-4 right-4">
                      {event.isRegistrationOpen ? (
                        <Badge className="bg-green-500 text-white">
                          <Heart className="h-3 w-3 mr-1" />
                          Open
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Closed</Badge>
                      )}
                    </div>
                  )}

                  {/* Days Until Event */}
                  {isUpcoming(event.eventDate) && (
                    <div className="absolute bottom-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium">
                        {getDaysUntilEvent(event.eventDate)} days to go
                      </div>
                    </div>
                  )}
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-neutral mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>

                  {event.description && (
                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                      {event.description}
                    </p>
                  )}

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-3 text-primary flex-shrink-0" />
                      <span className="font-medium">{formatDate(event.eventDate)}</span>
                    </div>
                    
                    {event.startTime && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-3 text-primary flex-shrink-0" />
                        <span>
                          {formatTime(event.startTime)}
                          {event.endTime && ` - ${formatTime(event.endTime)}`}
                        </span>
                      </div>
                    )}

                    {event.location && (
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-3 text-primary flex-shrink-0" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                    )}

                    {event.maxParticipants && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-3 text-primary flex-shrink-0" />
                        <span>
                          {event.currentParticipants || 0} / {event.maxParticipants} participants
                        </span>
                        {event.maxParticipants && (
                          <div className="ml-auto">
                            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full transition-all"
                                style={{ width: `${Math.min(((event.currentParticipants || 0) / event.maxParticipants) * 100, 100)}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex-1" onClick={() => setSelectedEvent(event)}>
                          View Details
                        </Button>
                      </DialogTrigger>
                    </Dialog>

                    {isUpcoming(event.eventDate) && event.isRegistrationOpen && (
                      <Button className="flex-1 group">
                        Register
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    )}
                    
                    <Button variant="ghost" size="icon" className="flex-shrink-0">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No events found</h3>
            <p className="text-gray-500">
              {searchTerm || selectedType !== "all" 
                ? "Try adjusting your search or filters" 
                : showPast 
                  ? "No past events to display" 
                  : "No upcoming events scheduled at the moment"
              }
            </p>
          </div>
        )}

        {/* Event Details Modal */}
        <Dialog>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {selectedEvent?.title}
              </DialogTitle>
              <DialogDescription>
                Event Details & Information
              </DialogDescription>
            </DialogHeader>
            
            {selectedEvent && (
              <div className="space-y-6">
                {selectedEvent.imageUrl && (
                  <img
                    src={selectedEvent.imageUrl}
                    alt={selectedEvent.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                )}
                
                <div className="flex gap-2 flex-wrap">
                  <Badge className={getEventTypeColor(selectedEvent.eventType)}>
                    {getEventTypeIcon(selectedEvent.eventType)} {selectedEvent.eventType}
                  </Badge>
                  {selectedEvent.isRegistrationOpen && isUpcoming(selectedEvent.eventDate) && (
                    <Badge className="bg-green-500 text-white">Registration Open</Badge>
                  )}
                </div>

                {selectedEvent.description && (
                  <div>
                    <h3 className="font-semibold mb-2">About This Event</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedEvent.description}</p>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h3 className="font-semibold">Event Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-primary" />
                        {formatDate(selectedEvent.eventDate)}
                      </div>
                      {selectedEvent.startTime && (
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-primary" />
                          {formatTime(selectedEvent.startTime)}
                          {selectedEvent.endTime && ` - ${formatTime(selectedEvent.endTime)}`}
                        </div>
                      )}
                      {selectedEvent.location && (
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-primary" />
                          {selectedEvent.location}
                        </div>
                      )}
                      {selectedEvent.organizer && (
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-primary" />
                          Organized by {selectedEvent.organizer}
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedEvent.maxParticipants && (
                    <div className="space-y-3">
                      <h3 className="font-semibold">Participation</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Registered</span>
                          <span>{selectedEvent.currentParticipants || 0} / {selectedEvent.maxParticipants}</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${Math.min(((selectedEvent.currentParticipants || 0) / selectedEvent.maxParticipants) * 100, 100)}%` }}
                          />
                        </div>
                        {selectedEvent.registrationDeadline && isUpcoming(selectedEvent.registrationDeadline) && (
                          <p className="text-xs text-gray-500">
                            Registration closes on {formatDate(selectedEvent.registrationDeadline)}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {isUpcoming(selectedEvent.eventDate) && selectedEvent.isRegistrationOpen && (
                  <div className="flex gap-3 pt-4 border-t">
                    <Button className="flex-1">
                      Register for This Event
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                    <Button variant="outline">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {events.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No events scheduled at the moment. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}