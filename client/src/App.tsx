import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminInquiries from "@/pages/admin/AdminInquiries";
import AdminProperties from "@/pages/admin/AdminProperties";
import AdminPropertyForm from "@/pages/admin/AdminPropertyForm";
import AdminBlog from "@/pages/admin/AdminBlog";
import AdminBlogForm from "@/pages/admin/AdminBlogForm";
import AdminAgents from "@/pages/admin/AdminAgents";

function Router() {
  return (
    <Switch>
      <Route path="/">
        <Redirect to="/admin" />
      </Route>
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/inquiries" component={AdminInquiries} />
      <Route path="/admin/properties/:id" component={AdminPropertyForm} />
      <Route path="/admin/properties" component={AdminProperties} />
      <Route path="/admin/blog/:id" component={AdminBlogForm} />
      <Route path="/admin/blog" component={AdminBlog} />
      <Route path="/admin/agents" component={AdminAgents} />
      <Route path="/admin" component={AdminDashboard} />
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
