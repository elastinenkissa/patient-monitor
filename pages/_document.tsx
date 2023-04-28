import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta property="og:image" content="../public/embed.png" />
        <meta
          name="keywords"
          content="Healthcare, Patients, Patient, Diagnosis, Patient monitoring, Patients monitoring, Prescription, Prescriptions"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
