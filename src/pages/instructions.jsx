import { Helmet } from 'react-helmet-async';
import InstructionsView from 'src/sections/Instructions/view/intstructionsview';

// ----------------------------------------------------------------------

export default function Instructions() {
  return (
    <>
      <Helmet>
        <title> Tehnika Xavfsizligi </title>
      </Helmet>

      <InstructionsView />
    </>
  );
}
