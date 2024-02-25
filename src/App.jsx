import React, { lazy, Suspense } from "react";
import { BootScreenSaverPage } from "./pages/boot-screen-saver-page";
import { BootScreenSaver } from "./components/loading";

const Routes = lazy(() => import("./routing/main"));
const Layout = lazy(() => import("./layouts/main/main"));

const App = () => (
  <Suspense fallback={<BootScreenSaverPage />}>
    <Layout>
      <Suspense fallback={<BootScreenSaver />}>
        <Routes />
      </Suspense>
    </Layout>
  </Suspense>
);

export default App;
