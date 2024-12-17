import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from 'axios';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";

import { API_ENDPOINT } from './Api';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavBar from 'react-bootstrap/NavBar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { jwtDecode } from 'jwt-decode';
import Form from 'react-bootstrap/Form';

import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register'; // Import the Register component

function App() {
  return (
    <>
      <Router>
        <Row>
          <Col md={12}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/register" element={<Register />} /> {/* Add the Register route */}
            </Routes>
          </Col>
        </Row>
      </Router>
    </>
  );
}

export default App;