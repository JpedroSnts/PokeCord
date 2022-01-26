import React, { ReactNode } from "react";
import Head from "next/head";

type Props = {
  children?: ReactNode;
  title?: string;
  classes?: string;
};

const Layout = ({
  children,
  title = "PokeCord",
  classes = "flex items-center justify-center w-screen h-screen",
}: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="description" content="Chat between pokemons!" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <main className={classes}>{children}</main>
  </>
);

export default Layout;
