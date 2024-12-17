import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { API_ENDPOINT } from './Api'; 

const SuccessMessage = ({ message }) => {
  return (
    <Alert variant="success" className="mt-3">
      {message}
    </Alert>
  );
};

function Register() {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage(''); 

    if (fullname.trim() === '' || username.trim() === '' || password.trim() === '') {
      setError('All fields are required.');
      return;
    }

    if (password.length < 6) { 
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_ENDPOINT}/api/auth/register`, {
        fullname,
        username,
        password, 
      });

      // Handle successful registration
      setSuccessMessage('Registration successful! You can now login.');
      navigate('/login'); 

    } catch (err) {
      if (err.response && err.response.status === 409) { 
        setError('Username already exists.'); 
      } else {
        setError('Registration failed. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center" style={{ marginTop: '10vh' }}>
        <Col md={4}>
          <div
            className="card"
            style={{
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              borderRadius: '12px',
              background: '#ffffff',
              padding: '20px',
            }}
          >
            <div className="card-body">
              <h3
                className="text-center"
                style={{
                  fontFamily: "'Roboto', sans-serif",
                  fontWeight: '700',
                  color: '#333',
                }}
              >
                Register
              </h3>
              {successMessage && <SuccessMessage message={successMessage} />} 
              {error && (
                <Alert variant="danger" className="mt-3">
                  {error}
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFullname">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    placeholder="Enter your full name"
                    style={{
                      borderRadius: '5px',
                      border: '1px solid #ddd',
                      padding: '10px',
                    }}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formUsername" className="mt-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    style={{
                      borderRadius: '5px',
                      border: '1px solid #ddd',
                      padding: '10px',
                    }}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    style={{
                      borderRadius: '5px',
                      border: '1px solid #ddd',
                      padding: '10px',
                    }}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formConfirmPassword" className="mt-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    style={{
                      borderRadius: '5px',
                      border: '1px solid #ddd',
                      padding: '10px',
                    }}
                    required
                  />
                </Form.Group>
                <Button
                  variant="dark"
                  type="submit"
                  className="w-100 mt-3"
                  style={{
                    background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '12px 0',
                    fontWeight: 'bold',
                  }}
                  disabled={loading}
                >
                  {loading ? 'Registering...' : 'Register'}
                </Button>
                <Button
                  variant="secondary"
                  className="w-100 mt-2"
                  onClick={() => navigate('/login')}
                  disabled={loading}
                  style={{
                    borderRadius: '5px',
                    border: '1px solid #ddd',
                    padding: '12px 0',
                    fontWeight: 'bold',
                  }}
                >
                  Back to Login
                </Button>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;