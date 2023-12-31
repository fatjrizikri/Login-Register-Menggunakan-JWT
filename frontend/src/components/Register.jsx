import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number_phone, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const Register = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/users', {
        name: name,
        email: email,
        number_phone: number_phone,
        password: password,
        confPassword: confPassword
      });
      navigate("/");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      }
    }
  };

  return (
    <section className='hero has-background-grey-light is-fullheight is-fullwidth'>
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop">
              <form onSubmit={Register} className='box'>
              <p className='has-text-centered'>{message}</p>
                <div className="field mt-5">
                  <label className='label'>Username</label>
                  <div className="controls">
                    <input type="text" className='input' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className='label'>Number Phone</label>
                  <div className="controls">
                    <input type="number" className='input' placeholder='Number' value={number_phone} onChange={(e) => setNumber(e.target.value)} />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className='label'>Email</label>
                  <div className="controls">
                    <input type="text" className='input' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className='label'>Password</label>
                  <div className="controls">
                    <input type="password" className='input' placeholder='******' value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className='label'>Confirm Password</label>
                  <div className="controls">
                    <input type="password" className='input' placeholder='******' value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
                  </div>
                </div>
                <div className="field mt-5">
                  <button className='button is-success is-fullwidth' type="submit">Register</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
