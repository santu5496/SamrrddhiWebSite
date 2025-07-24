import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { 
  HeroContent, 
  AboutContent, 
  Program, 
  Testimonial, 
  ContactInfo, 
  ContactSubmission,
  DonationConfig 
} from "@shared/schema";

export default function Admin() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  // Queries
  const { data: heroContent } = useQuery<HeroContent>({
    queryKey: ["/api/admin/hero"],
    enabled: isAuthenticated,
  });

  const { data: aboutContent } = useQuery<AboutContent>({
    queryKey: ["/api/admin/about"],
    enabled: isAuthenticated,
  });

  const { data: programs } = useQuery<Program[]>({
    queryKey: ["/api/admin/programs"],
    enabled: isAuthenticated,
  });

  const { data: testimonials } = useQuery<Testimonial[]>({
    queryKey: ["/api/admin/testimonials"],
    enabled: isAuthenticated,
  });

  const { data: contactInfo } = useQuery<ContactInfo>({
    queryKey: ["/api/admin/contact"],
    enabled: isAuthenticated,
  });

  const { data: contactSubmissions } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/admin/contact/submissions"],
    enabled: isAuthenticated,
  });

  const { data: donationConfig } = useQuery<DonationConfig>({
    queryKey: ["/api/admin/donation-config"],
    enabled: isAuthenticated,
  });

  // Mutations
  const updateHeroMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("PUT", "/api/admin/hero", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/hero"] });
      toast({ title: "Success", description: "Hero content updated successfully" });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({ title: "Error", description: "Failed to update hero content", variant: "destructive" });
    },
  });

  const updateAboutMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("PUT", "/api/admin/about", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/about"] });
      toast({ title: "Success", description: "About content updated successfully" });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({ title: "Error", description: "Failed to update about content", variant: "destructive" });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Samruddhi Service Society CMS</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.firstName || user?.email}
              </span>
              <Button asChild>
                <a href="/api/logout">Logout</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/">View Site</a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="grid grid-cols-6 lg:w-auto">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="headline">Headline</Label>
                  <Input
                    id="headline"
                    defaultValue={heroContent?.headline}
                    onBlur={(e) => {
                      if (heroContent && e.target.value !== heroContent.headline) {
                        updateHeroMutation.mutate({
                          ...heroContent,
                          headline: e.target.value,
                        });
                      }
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="subheading">Subheading</Label>
                  <Textarea
                    id="subheading"
                    defaultValue={heroContent?.subheading}
                    onBlur={(e) => {
                      if (heroContent && e.target.value !== heroContent.subheading) {
                        updateHeroMutation.mutate({
                          ...heroContent,
                          subheading: e.target.value,
                        });
                      }
                    }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="years">Years of Service</Label>
                    <Input
                      id="years"
                      defaultValue={heroContent?.yearsOfService}
                      onBlur={(e) => {
                        if (heroContent && e.target.value !== heroContent.yearsOfService) {
                          updateHeroMutation.mutate({
                            ...heroContent,
                            yearsOfService: e.target.value,
                          });
                        }
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="children">Children Supported</Label>
                    <Input
                      id="children"
                      defaultValue={heroContent?.childrenSupported}
                      onBlur={(e) => {
                        if (heroContent && e.target.value !== heroContent.childrenSupported) {
                          updateHeroMutation.mutate({
                            ...heroContent,
                            childrenSupported: e.target.value,
                          });
                        }
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="programs">Core Programs</Label>
                    <Input
                      id="programs"
                      defaultValue={heroContent?.corePrograms}
                      onBlur={(e) => {
                        if (heroContent && e.target.value !== heroContent.corePrograms) {
                          updateHeroMutation.mutate({
                            ...heroContent,
                            corePrograms: e.target.value,
                          });
                        }
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="mission-title">Mission Title</Label>
                  <Input
                    id="mission-title"
                    defaultValue={aboutContent?.missionTitle}
                    onBlur={(e) => {
                      if (aboutContent && e.target.value !== aboutContent.missionTitle) {
                        updateAboutMutation.mutate({
                          ...aboutContent,
                          missionTitle: e.target.value,
                        });
                      }
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="mission-description">Mission Description</Label>
                  <Textarea
                    id="mission-description"
                    rows={4}
                    defaultValue={aboutContent?.missionDescription}
                    onBlur={(e) => {
                      if (aboutContent && e.target.value !== aboutContent.missionDescription) {
                        updateAboutMutation.mutate({
                          ...aboutContent,
                          missionDescription: e.target.value,
                        });
                      }
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="journey-title">Journey Title</Label>
                  <Input
                    id="journey-title"
                    defaultValue={aboutContent?.journeyTitle}
                    onBlur={(e) => {
                      if (aboutContent && e.target.value !== aboutContent.journeyTitle) {
                        updateAboutMutation.mutate({
                          ...aboutContent,
                          journeyTitle: e.target.value,
                        });
                      }
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="journey-description">Journey Description</Label>
                  <Textarea
                    id="journey-description"
                    rows={4}
                    defaultValue={aboutContent?.journeyDescription}
                    onBlur={(e) => {
                      if (aboutContent && e.target.value !== aboutContent.journeyDescription) {
                        updateAboutMutation.mutate({
                          ...aboutContent,
                          journeyDescription: e.target.value,
                        });
                      }
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="programs">
            <div className="space-y-6">
              {programs?.map((program) => (
                <Card key={program.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{program.title}</span>
                      <Badge variant={program.isActive ? "default" : "secondary"}>
                        {program.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Title</Label>
                      <Input defaultValue={program.title} />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea defaultValue={program.description} rows={3} />
                    </div>
                    <div>
                      <Label>Icon Class</Label>
                      <Input defaultValue={program.icon} placeholder="e.g., fas fa-home" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="testimonials">
            <div className="space-y-6">
              {testimonials?.map((testimonial) => (
                <Card key={testimonial.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{testimonial.name}</span>
                      <Badge variant={testimonial.isActive ? "default" : "secondary"}>
                        {testimonial.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Name</Label>
                      <Input defaultValue={testimonial.name} />
                    </div>
                    <div>
                      <Label>Role</Label>
                      <Input defaultValue={testimonial.role} />
                    </div>
                    <div>
                      <Label>Quote</Label>
                      <Textarea defaultValue={testimonial.quote} rows={3} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    defaultValue={contactInfo?.address}
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      defaultValue={contactInfo?.phone}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={contactInfo?.email}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="facebook">Facebook URL</Label>
                    <Input
                      id="facebook"
                      defaultValue={contactInfo?.facebook || ""}
                      placeholder="https://facebook.com/..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="twitter">Twitter URL</Label>
                    <Input
                      id="twitter"
                      defaultValue={contactInfo?.twitter || ""}
                      placeholder="https://twitter.com/..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="instagram">Instagram URL</Label>
                    <Input
                      id="instagram"
                      defaultValue={contactInfo?.instagram || ""}
                      placeholder="https://instagram.com/..."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Form Submissions</h3>
              {contactSubmissions?.map((submission) => (
                <Card key={submission.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-base">
                      <span>{submission.subject}</span>
                      <div className="flex items-center space-x-2">
                        <Badge variant={submission.isRead ? "secondary" : "default"}>
                          {submission.isRead ? "Read" : "Unread"}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {new Date(submission.createdAt!).toLocaleDateString()}
                        </span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label className="text-sm font-medium">Name</Label>
                        <p className="text-sm">{submission.name}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Email</Label>
                        <p className="text-sm">{submission.email}</p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Message</Label>
                      <p className="text-sm mt-1">{submission.message}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
