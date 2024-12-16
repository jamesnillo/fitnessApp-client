import { Button, Form } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Notyf } from 'notyf';
import UserContext from '../UserContext';

export default function Register() {
  const notyf = new Notyf();
  const { user } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (email !== '' && password !== '' && password === confirmPassword) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password, confirmPassword]);

  const registerUser = (event) => {
    event.preventDefault();

    fetch('https://fitnessapp-api-ln8u.onrender.com/users/register', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);

      if (data.message === 'Registered Successfully') {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        notyf.success("Registration successful!");
      } else if (data.message === "Invalid email format") {
        notyf.error('Email is invalid');
      } else if (data.message === "Password must be at least 8 characters long") {
        notyf.error("Password must be at least 8 characters");
      } else {
        notyf.error("Something went wrong!");
      }
    });
  }

  return (
    (user.id !== null) ?
      <Navigate to="/login" /> :
      <Form className="col-6 mx-auto" onSubmit={event => registerUser(event)}>
        <h1 className="my-5 text-center">Register</h1>
        <Form.Group className="mb-3">
          <Form.Label>Email address:</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email" 
            value={email}
            onChange={event => setEmail(event.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password:</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password (at least 8 characters)" 
            value={password}
            onChange={event => setPassword(event.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Confirm your Password" 
            value={confirmPassword}
            onChange={event => setConfirmPassword(event.target.value)}
            required
          />
        </Form.Group>

        {isActive ? 
          <Button variant="primary" type="submit">
            Register
          </Button> :
          <Button variant="danger" type="submit" disabled>
            Register
          </Button>
        }
      </Form>
  );
}
