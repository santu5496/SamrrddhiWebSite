The code has been refactored to fix undefined variables, improve component structure, address dialog warnings, and enhance accessibility.
```

```replit_final_file
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Calendar, Clock, MapPin, Users, Filter, Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Event } from "@shared/schema";
import { ArrowRight, Star, Share2, Heart, CheckCircle, AlertCircle, Sparkles, ExternalLink } from "lucide-react";
import { Progress } from "./ui/progress";

const EventsSection = () => {
  const { data: events = [], isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(parseInt(dateString));
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return '';
    return new Date(`2024-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const isUpcoming = (dateString: string) => {
    return new Date(parseInt(dateString)) > new Date();
  };

  const daysUntilEvent = (dateString: string) => {
    const eventDate = new Date(parseInt(dateString));
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Filter events based on search and type
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || event.eventType === selectedType;
    return matchesSearch && matchesType;
  });

  // Separate upcoming and past events
  const upcomingEvents = filteredEvents.filter(event => isUpcoming(event.eventDate));
  const pastEvents = filteredEvents.filter(event => !isUpcoming(event.eventDate));

  const categories = ['all', ...Array.from(new Set(events.map(event => event.eventType).filter(Boolean)))];

  const filteredUpcomingEvents = selectedType === 'all'
    ? upcomingEvents
    : upcomingEvents.filter(event => event.eventType === selectedType);

  const filteredPastEvents = selectedType === 'all'
    ? pastEvents
    : pastEvents.filter(event => event.eventType === selectedType);

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-12 bg-gradient-to-r from-gray-300 to-gray-200 rounded-lg w-80 mx-auto mb-6"></div>
            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-96 mx-auto mb-16"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="h-48 bg-gradient-to-r from-gray-300 to-gray-200"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-100 rounded"></div>
                    <div className="h-4 bg-gray-100 rounded w-2/3"></div>
                    <div className="flex gap-2">
                      <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                      <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                    </div>
                    <div className="h-10 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const getEventTypeColor = (type: string) => {
    const colors = {
      fundraiser: "bg-gradient-to-r from-pink-500 to-rose-500 text-white",
      educational: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white",
      workshop: "bg-gradient-to-r from-purple-500 to-violet-500 text-white",
      community: "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
      health: "bg-gradient-to-r from-red-500 to-pink-500 text-white"
    };
    return colors[type as keyof typeof colors] || "bg-gradient-to-r from-gray-500 to-slate-500 text-white";
  };

  const getEventIcon = (type: string) => {
    const icons = {
      fundraiser: "💰",
      educational: "📚",
      workshop: "🛠️",
      community: "🤝",
      health: "🏥"
    };
    return icons[type as keyof typeof icons] || "📅";
  };

  const EventCard = ({ event }: { event: Event }) => {
    const participationRate = event.maxParticipants
      ? (event.currentParticipants || 0) / event.maxParticipants * 100
      : 0;
    const daysLeft = daysUntilEvent(event.eventDate);
    const upcoming = isUpcoming(event.eventDate);

    return (
      <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white rounded-2xl">
        <div className="relative overflow-hidden">
          <img
            src={event.imageUrl || '/api/placeholder/600/400'}
            alt={event.title}
            className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Event Type Badge */}
          <div className="absolute top-4 left-4">
            <Badge className={`${getEventTypeColor(event.eventType)} px-3 py-1 text-sm font-medium shadow-lg`}>
              <span className="mr-1">{getEventIcon(event.eventType)}</span>
              {event.eventType}
            </Badge>
          </div>

          {/* Status Badge */}
          <div className="absolute top-4 right-4">
            {upcoming ? (
              daysLeft <= 7 ? (
                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 shadow-lg animate-pulse">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {daysLeft} days left
                </Badge>
              ) : (
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 shadow-lg">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Upcoming
                </Badge>
              )
            ) : (
              <Badge className="bg-gradient-to-r from-gray-500 to-slate-500 text-white px-3 py-1 shadow-lg">
                <CheckCircle className="w-3 h-3 mr-1" />
                Completed
              </Badge>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30">
                <Heart className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <CardContent className="p-6 space-y-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {event.title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
              {event.description}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-2 text-blue-500" />
              <span className="font-medium">{formatDate(event.eventDate)}</span>
            </div>

            {event.startTime && (
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-2 text-green-500" />
                <span>{formatTime(event.startTime)} - {formatTime(event.endTime || '')}</span>
              </div>
            )}

            {event.location && (
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="w-4 h-4 mr-2 text-red-500" />
                <span className="line-clamp-1">{event.location}</span>
              </div>
            )}

            {event.organizer && (
              <div className="flex items-center text-sm text-gray-500">
                <Star className="w-4 h-4 mr-2 text-yellow-500" />
                <span className="font-medium">by {event.organizer}</span>
              </div>
            )}
          </div>

          {/* Participation Progress */}
          {event.maxParticipants && (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">
                  <Users className="w-4 h-4 inline mr-1" />
                  {event.currentParticipants || 0} / {event.maxParticipants} participants
                </span>
                <span className="text-sm font-semibold text-blue-600">
                  {Math.round(participationRate)}% full
                </span>
              </div>
              <Progress
                value={participationRate}
                className="h-2 bg-gray-100"
              />
            </div>
          )}

          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => setSelectedEvent(event)}
              >
                {upcoming && event.isRegistrationOpen ? (
                  <>
                    Register Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-900 pr-8">
                  {event.title}
                </DialogTitle>
                <CardDescription className="text-gray-600 mt-2">
                  {event.description}
                </CardDescription>
              </DialogHeader>

              <div className="mt-6 space-y-6">
                <img
                  src={event.imageUrl || '/api/placeholder/800/400'}
                  alt={event.title}
                  className="w-full h-64 object-cover rounded-xl shadow-lg"
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg text-gray-900">Event Details</h4>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-blue-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900">{formatDate(event.eventDate)}</p>
                          <p className="text-sm text-gray-500">
                            {event.startTime && `${formatTime(event.startTime)} - ${formatTime(event.endTime || '')}`}
                          </p>
                        </div>
                      </div>

                      {event.location && (
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-red-500 mt-0.5" />
                          <p className="text-gray-700">{event.location}</p>
                        </div>
                      )}

                      {event.organizer && (
                        <div className="flex items-start gap-3">
                          <Star className="w-5 h-5 text-yellow-500 mt-0.5" />
                          <p className="text-gray-700">Organized by {event.organizer}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg text-gray-900">Registration Info</h4>

                    {event.maxParticipants && (
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm font-medium text-gray-700">Participation</span>
                          <span className="text-sm font-bold text-blue-600">
                            {Math.round(participationRate)}% Full
                          </span>
                        </div>
                        <Progress value={participationRate} className="h-3 mb-2" />
                        <p className="text-sm text-gray-600">
                          {event.currentParticipants || 0} out of {event.maxParticipants} spots filled
                        </p>
                      </div>
                    )}

                    {upcoming && event.isRegistrationOpen ? (
                      <div className="space-y-3">
                        {event.registrationDeadline && (
                          <p className="text-sm text-gray-600">
                            <strong>Registration Deadline:</strong> {formatDate(event.registrationDeadline)}
                          </p>
                        )}
                        <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 rounded-xl shadow-lg">
                          Register for This Event
                        </Button>
                      </div>
                    ) : upcoming ? (
                      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
                        <p className="text-yellow-800 font-medium">Registration Closed</p>
                        <p className="text-yellow-600 text-sm mt-1">Registration for this event is no longer available.</p>
                      </div>
                    ) : (
                      <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl">
                        <p className="text-gray-800 font-medium">Event Completed</p>
                        <p className="text-gray-600 text-sm mt-1">This event has already taken place.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    );
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Upcoming <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Events</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join us in our mission to empower communities. Discover upcoming workshops, fundraisers, and community events that make a difference.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search events, locations, or organizers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl bg-white/90"
            />
          </div>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full sm:w-64 py-3 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl bg-white/90">
              <Filter className="w-4 h-4 mr-2 text-gray-400" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="fundraiser">💰 Fundraisers</SelectItem>
              <SelectItem value="educational">📚 Educational</SelectItem>
              <SelectItem value="workshop">🛠️ Workshops</SelectItem>
              <SelectItem value="community">🤝 Community</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Events Tabs */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/80 backdrop-blur-sm p-1 rounded-xl shadow-lg border border-white/20">
            <TabsTrigger
              value="upcoming"
              className="text-sm font-medium py-3 px-6 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300"
            >
              🔥 Upcoming Events ({upcomingEvents.length})
            </TabsTrigger>
            <TabsTrigger
              value="past"
              className="text-sm font-medium py-3 px-6 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-500 data-[state=active]:to-slate-500 data-[state=active]:text-white transition-all duration-300"
            >
              📅 Past Events ({pastEvents.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-0">
            {upcomingEvents.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-white/20 max-w-md mx-auto">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Upcoming Events</h3>
                  <p className="text-gray-600">
                    {searchTerm || selectedType !== "all"
                      ? "No events match your search criteria. Try adjusting your filters."
                      : "Check back soon for new events and opportunities to get involved!"
                    }
                  </p>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="mt-0">
            {pastEvents.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pastEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-white/20 max-w-md mx-auto">
                  <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Past Events</h3>
                  <p className="text-gray-600">
                    {searchTerm || selectedType !== "all"
                      ? "No past events match your search criteria."
                      : "Past events will appear here once they are completed."
                    }
                  </p>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 shadow-2xl text-white">
            <h3 className="text-2xl font-bold mb-4">Stay Updated on Our Events</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Don't miss out on upcoming opportunities to make a difference. Subscribe to our newsletter for event updates and community news.
            </p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Subscribe to Updates
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EventsSection;