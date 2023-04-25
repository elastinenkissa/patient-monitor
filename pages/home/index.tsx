import Head from 'next/head';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';

import HomeCards from '@/components/home/HomeCards/HomeCards';
import HomeLayout from '@/components/shared/Layout/HomeLayout/HomeLayout';

import withAuth from '@/util/higherOrderComponents';
import { connectDatabase } from '@/util/connectDatabase';

import { PatientType } from '@/models/patient';
import { User } from '@/models/user';
import { Appointment, AppointmentType } from '@/models/appointment';

import classes from './Home.module.css';

interface HomeProps extends Record<string, unknown> {
  recentPatients: Array<PatientType>;
  appointments: Array<AppointmentType>;
}

const Home: NextPage<HomeProps> = (props) => {
  return (
    <>
      <Head>
        <title>Patients Monitor</title>
        <meta name="description" content="Some description" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <HomeLayout>
        <div className={classes.container}>
          <HomeCards
            patients={props.recentPatients}
            appointments={props.appointments}
          />
        </div>
      </HomeLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context: GetServerSidePropsContext
) => {
  const userId = context.req.cookies.userId;

  try {
    await connectDatabase();

    const user = await User.findById(userId);

    const recentPatients = (
      await user!.populate(
        'recentPatients',
        '-identificationNumber -occupation -gender -diagnosis -prescriptions -entries'
      )
    ).recentPatients;

    const appointments = await Appointment.find({ doctor: userId }).populate(
      'patient'
    );

    return {
      props: {
        recentPatients: JSON.parse(JSON.stringify(recentPatients)),
        appointments: JSON.parse(JSON.stringify(appointments))
      }
    };
  } catch (error: any) {
    return {
      notFound: true
    };
  }
};

export default withAuth(Home);
