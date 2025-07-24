
import { Calendar, MapPin, Users, Trophy, Clock, Target } from "lucide-react";
import { Button } from "./ui/button";

export default function EventsSection() {
  const upcomingEvents = [
    {
      title: "Annual Charity Walkathon 2024",
      date: "March 15, 2024",
      time: "6:00 AM - 10:00 AM",
      location: "Central Park, City Center",
      participants: "500+ Expected",
      description: "Join us for our biggest fundraising event of the year. Walk for a cause!",
      registrationFee: "₹500 per person",
      category: "Fundraising"
    },
    {
      title: "Educational Workshop for Parents",
      date: "February 28, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Community Hall, Village",
      participants: "100+ Parents",
      description: "Interactive session on supporting children with special needs.",
      registrationFee: "Free",
      category: "Workshop"
    },
    {
      title: "Volunteer Training Program",
      date: "March 5, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "Samruddhi Campus",
      participants: "50+ Volunteers",
      description: "Comprehensive training for new volunteers joining our mission.",
      registrationFee: "Free",
      category: "Training"
    }
  ];

  const pastAchievements = [
    { title: "Walkathon 2023", participants: "800+", fundsRaised: "₹12 Lakhs" },
    { title: "Sports Day 2023", participants: "200+", fundsRaised: "₹3 Lakhs" },
    { title: "Cultural Fest 2023", participants: "500+", fundsRaised: "₹5 Lakhs" }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral mb-4">
            Events & Community Engagement
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our community events and make a difference while having fun. Every event supports our mission of empowering children.
          </p>
          <div className="w-24 h-1 bg-secondary mx-auto mt-6"></div>
        </div>

        {/* Upcoming Events */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-neutral mb-8 text-center">Upcoming Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      {event.category}
                    </span>
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  
                  <h4 className="text-xl font-semibold text-neutral mb-3">{event.title}</h4>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      {event.participants}
                    </div>
                    <div className="flex items-center text-sm font-medium text-primary">
                      <Target className="h-4 w-4 mr-2" />
                      {event.registrationFee}
                    </div>
                  </div>
                  
                  <Button className="w-full bg-secondary hover:bg-orange-600">
                    Register Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Event Achievements */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-semibold text-neutral mb-8 text-center">Past Event Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pastAchievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-primary to-secondary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-neutral mb-2">{achievement.title}</h4>
                <p className="text-sm text-gray-600 mb-1">{achievement.participants} Participants</p>
                <p className="text-lg font-bold text-secondary">{achievement.fundsRaised} Raised</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
