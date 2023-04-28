import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="keywords"
          content="Healthcare, Patients, Patient, Diagnosis, Patient monitoring, Patients monitoring, Prescription, Prescriptions"
        />

        <meta property="og:image" content="https://i.imgur.com/qq94gA7.png" />
        <meta property="og:title" content="Patient Monitor" />
        <meta
          property="og:url"
          content="https://sensational-sprinkles-170f00.netlify.app/"
        />
        <meta
          property="og:description"
          content="Patient monitoring and management services available to anyone"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
