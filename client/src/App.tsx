import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Programs from "@/pages/Programs";
import Leadership from "@/pages/Leadership";
import News from "@/pages/News";
import NewsDetail from "@/pages/NewsDetail";
import Events from "@/pages/Events";
import Media from "@/pages/Media";
import Gallery from "@/pages/Gallery";
import Resources from "@/pages/Resources";
import Donate from "@/pages/Donate";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/programs" component={Programs} />
      <Route path="/leadership" component={Leadership} />
      <Route path="/news" component={News} />
      <Route path="/news/:slug" component={NewsDetail} />
      <Route path="/events" component={Events} />
      <Route path="/media" component={Media} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/resources" component={Resources} />
      <Route path="/donate" component={Donate} />
      {isAuthenticated && <Route path="/admin" component={Admin} />}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;