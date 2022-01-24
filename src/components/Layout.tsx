import React, { ReactNode } from "react";
import Head from "next/head";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "PokeCord" }: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="description" content="Chat between pokemons!" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <main className="w-screen h-screen flex items-center justify-center">
      {children}
    </main>
  </>
);

export default Layout;
