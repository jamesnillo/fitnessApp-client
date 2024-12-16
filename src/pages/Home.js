import Banner from '../components/Banner';

import { useContext } from 'react';

import UserContext from '../UserContext';

export default function Home() {

	const { user } = useContext(UserContext);

  const data = {
    title: "Welcome to Zuitt Workouts",
    content: "Your Workout Tracker!",
    destination: user.id === null ? "/login" : "/workouts",
    buttonLabel: user.id === null ? "Login to get Started" : "View Your Workouts"
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Banner data={data} />
    </div>
  );
}
