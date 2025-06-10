import React, { Suspense } from "react";

const Header = React.lazy(() => import("header/Header"));
const Footer = React.lazy(() => import("footer/Footer"));
const Dashboard = React.lazy(() => import("dashboard/Dashboard"));

const App = () => (
  <div>
    <Suspense fallback={<div>Loading Header...</div>}>
      <Header />
    </Suspense>
    <Suspense fallback={<div>Loading Dashboard...</div>}>
      <Dashboard />
    </Suspense>
    <Suspense fallback={<div>Loading Footer...</div>}>
      <Footer />
    </Suspense>
  </div>
);

export default App;
