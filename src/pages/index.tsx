import Head from "next/head";

import Container from "@/components/Container";

export default function Home() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Age calculator app</title>
        <meta
          name="description"
          content="Frontend Mentor | Age calculator app"
        />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="/age-calculator-app/images/favicon.ico"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/age-calculator-app/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/age-calculator-app/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/age-calculator-app/images/favicon-16x16.png"
        />
      </Head>
      <Container />
    </>
  );
}
