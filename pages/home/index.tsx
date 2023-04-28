import Head from 'next/head';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useContext, useState } from 'react';

import HomeLayout from '@/components/shared/Layout/HomeLayout/HomeLayout';
import UpcomingAppointments from '@/components/home/UpcomingAppointments/UpcomingAppointments';
import NewAppointment from '@/components/home/NewAppointment/NewAppointment';
import ViewPatientsCard from '@/components/home/ViewPatientsCard/ViewPatientsCard';
import NewPatientCard from '@/components/home/NewPatientCard/NewPatientCard';

import withAuth from '@/util/higherOrderComponents';
import { connectDatabase } from '@/util/connectDatabase';

import { PatientType } from '@/models/patient';
import { User } from '@/models/user';
import { Appointment, AppointmentType } from '@/models/appointment';

import { UserContext, UserContextType } from '@/context/UserContext';

import classes from './Home.module.css';

interface HomeProps extends Record<string, unknown> {
  recentPatients: Array<PatientType>;
  appointments: Array<AppointmentType>;
}

const Home: NextPage<HomeProps> = (props) => {
  const { user } = useContext<UserContextType>(UserContext);

  const [newAppointment, setNewAppointment] = useState<AppointmentType>();

  return (
    <>
      <Head>
        <title>Patient Monitor</title>
        <meta name="description" content="Patient monitoring and management services avaialble to anyone" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <HomeLayout>
        <div className={classes.wrapper}>
          <div className={classes.container}>
            <div className={classes.leftCards}>
              <ViewPatientsCard user={user} patients={props.recentPatients} />
              <UpcomingAppointments
                newAppointment={newAppointment!}
                appointments={props.appointments}
              />
            </div>
            <div className={classes.secondContainer}>
              <NewPatientCard />
              <NewAppointment
                onNewAppointment={(appointment) =>
                  setNewAppointment(appointment)
                }
              />
            </div>
          </div>
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

    const currentDate = new Date(new Date().getTime() + 30 * 60000);

    await Appointment.deleteMany({ scheduled: { $lte: currentDate } });

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
