import dynamic from 'next/dynamic';
import React from 'react';


import type { NextPageWithLayout } from 'nextjs/types';
import PageNextJs from 'nextjs/PageNextJs';

import LayoutHome from 'ui/shared/layout/LayoutHome';

const Home = dynamic(() => import('ui/pages/Home'), { ssr: false, });

const Page: NextPageWithLayout = () => {
  return (
    <PageNextJs pathname="/">
      <Home/>
    </PageNextJs>
  );
};

Page.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <LayoutHome>
      { page }
    </LayoutHome>
  );
};

export default Page;

export { base as getServerSideProps } from 'nextjs/getServerSideProps';
