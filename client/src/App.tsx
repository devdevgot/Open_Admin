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
import PropertyDetail from "@/pages/PropertyDetail";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/buy" component={Buy}/>
      <Route path="/sell" component={Sell}/>
      <Route path="/rent" component={Rent}/>
      <Route path="/rent/apartments" component={RentApartments}/>
      <Route path="/rent/villas" component={RentVillas}/>
      <Route path="/rent/short-term" component={RentShortTerm}/>
      <Route path="/rent/landlord" component={RentLandlord}/>
      <Route path="/rent/guide" component={RentGuide}/>
      <Route path="/property/:id" component={PropertyDetail}/>
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
