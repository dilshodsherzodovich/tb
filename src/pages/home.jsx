import { Helmet } from 'react-helmet-async';

import HomeView from 'src/sections/home/view/homeview';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Tehnika Xavfsizligi </title>
      </Helmet>

      <HomeView />
    </>
  );
}
