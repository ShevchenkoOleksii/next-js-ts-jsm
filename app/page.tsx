import React from 'react';
import { fetchAllProjects } from '../lib/actions';
import { ProjectInterface } from '../common.types';

type SearchParams = {
  category?: string | null;
  endcursor?: string | null;
}

type Props = {
  searchParams: SearchParams
}

type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  },
}

// export const dynamic = 'force-dynamic';
// export const dynamicParams = true;
// export const revalidate = 0;

const Home = async () => {
  const data = await fetchAllProjects() as ProjectSearch;
  const projectsToDisplay = data?.projectSearch?.edges || [];
  console.log(projectsToDisplay);

  return (
    <section className="flexStart flex-col paddings mb-16">
      <h1>1</h1>
      <h1>2</h1>
      <h1>3</h1>
    </section>
  );
};

export default Home;
