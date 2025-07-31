import { useQuery } from "@tanstack/react-query";
import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

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
        return 'bg-blue-100 text-blue-800';
      case 'fundraiser':
        return 'bg-green-100 text-green-800';
      case 'community':
        return 'bg-purple-100 text-purple-800';
      case 'educational':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const upcomingEvents = events.filter(event => isUpcoming(event.eventDate));
  const pastEvents = events.filter(event => !isUpcoming(event.eventDate));

  return (
    <section className="py-16 bg-white" id="events">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Calendar className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-3xl font-bold text-neutral">Events & Programs</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join us in our community events, workshops, and fundraising activities that make a difference.
          </p>
        </div>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-neutral mb-8 text-center">Upcoming Events</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden">
                  {event.imageUrl && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.eventType)}`}>
                        {event.eventType.charAt(0).toUpperCase() + event.eventType.slice(1)}
                      </span>
                      {event.isRegistrationOpen && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          Registration Open
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold text-neutral mb-2 line-clamp-2">
                      {event.title}
                    </h3>

                    {event.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {event.description}
                      </p>
                    )}

                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-primary" />
                        {formatDate(event.eventDate)}
                      </div>
                      
                      {event.startTime && (
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-primary" />
                          {formatTime(event.startTime)}
                          {event.endTime && ` - ${formatTime(event.endTime)}`}
                        </div>
                      )}

                      {event.location && (
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-primary" />
                          {event.location}
                        </div>
                      )}

                      {event.maxParticipants && (
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-primary" />
                          {event.currentParticipants || 0} / {event.maxParticipants} participants
                        </div>
                      )}
                    </div>

                    {event.isRegistrationOpen && (
                      <Button className="w-full group">
                        Register Now
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-neutral mb-8 text-center">Past Events</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {pastEvents.slice(0, 4).map((event) => (
                <div key={event.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.eventType)}`}>
                      {event.eventType}
                    </span>
                  </div>
                  
                  <h4 className="font-medium text-neutral mb-1 text-sm line-clamp-2">{event.title}</h4>
                  
                  <div className="text-xs text-gray-500">
                    <div className="flex items-center mb-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(event.eventDate)}
                    </div>
                    {event.currentParticipants && (
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {event.currentParticipants} participants
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {pastEvents.length > 4 && (
              <div className="text-center mt-6">
                <Button variant="outline">
                  View All Past Events
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
        )}

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