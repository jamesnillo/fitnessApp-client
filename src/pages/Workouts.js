import { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';

export default function Workouts() {
    const { user } = useContext(UserContext);
    const [workouts, setWorkouts] = useState([]);

    const fetchData = () => {
        fetch('https://fitnessapp-api-ln8u.onrender.com/workouts/getMyWorkouts', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setWorkouts(data.workouts || []);
        });
    };

    useEffect(() => {
        fetchData();
    }, [user]);

    return (
        <div className="container mt-4">
            <h2>Workouts</h2>
            {workouts.length === 0 ? (
                <p>You have no workouts added yet. Add a workout first!</p>
            ) : (
                <div className="row">
                    {workouts.map((workout, index) => (
                        <div key={index} className="col-md-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{workout.name}</h5>
                                    <p className="card-text">Duration: {workout.duration} minutes</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
