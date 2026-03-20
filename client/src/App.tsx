import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Buy from "@/pages/Buy";
import Sell from "@/pages/Sell";
import Rent from "@/pages/Rent";
import RentApartments from "@/pages/RentApartments";
import RentVillas from "@/pages/RentVillas";
import RentShortTerm from "@/pages/RentShortTerm";
import RentLandlord from "@/pages/RentLandlord";
import RentGuide from "@/pages/RentGuide";
import About from "@/pages/About";
import AboutFounder from "@/pages/AboutFounder";
import AboutStory from "@/pages/AboutStory";
import AboutAgents from "@/pages/AboutAgents";
import AboutMission from "@/pages/AboutMission";
import AboutValues from "@/pages/AboutValues";
import AboutExperience from "@/pages/AboutExperience";
import AboutInvestors from "@/pages/AboutInvestors";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import PropertyDetail from "@/pages/PropertyDetail";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminInquiries from "@/pages/admin/AdminInquiries";
import AdminProperties from "@/pages/admin/AdminProperties";
import AdminPropertyForm from "@/pages/admin/AdminPropertyForm";
import AdminBlog from "@/pages/admin/AdminBlog";
import AdminBlogForm from "@/pages/admin/AdminBlogForm";
import AdminAgents from "@/pages/admin/AdminAgents";
import ContactModal from "@/components/ContactModal";

function Router() {
  return (
    <Switch>
      {/* Public site */}
      <Route path="/" component={Home}/>
      <Route path="/buy" component={Buy}/>
      <Route path="/sell" component={Sell}/>
      <Route path="/rent" component={Rent}/>
      <Route path="/rent/apartments" component={RentApartments}/>
      <Route path="/rent/villas" component={RentVillas}/>
      <Route path="/rent/short-term" component={RentShortTerm}/>
      <Route path="/rent/landlord" component={RentLandlord}/>
      <Route path="/rent/guide" component={RentGuide}/>
      <Route path="/about" component={About}/>
      <Route path="/about/founder" component={AboutFounder}/>
      <Route path="/about/story" component={AboutStory}/>
      <Route path="/about/agents" component={AboutAgents}/>
      <Route path="/about/mission" component={AboutMission}/>
      <Route path="/about/values" component={AboutValues}/>
      <Route path="/about/experience" component={AboutExperience}/>
      <Route path="/about/investors" component={AboutInvestors}/>
      <Route path="/blog" component={Blog}/>
      <Route path="/blog/:id" component={BlogPost}/>
      <Route path="/property/:id" component={PropertyDetail}/>

      {/* Admin */}
      <Route path="/admin/login" component={AdminLogin}/>
      <Route path="/admin/inquiries" component={AdminInquiries}/>
      <Route path="/admin/properties/:id" component={AdminPropertyForm}/>
      <Route path="/admin/properties" component={AdminProperties}/>
      <Route path="/admin/blog/:id" component={AdminBlogForm}/>
      <Route path="/admin/blog" component={AdminBlog}/>
      <Route path="/admin/agents" component={AdminAgents}/>
      <Route path="/admin" component={AdminDashboard}/>

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
        <ContactModal />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
