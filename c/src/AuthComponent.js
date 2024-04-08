import React, { useState } from 'react';

const AuthComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async () => {
        try {
            const response = await fetch('http://localhost:4000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            setMessage('Failed to register');
            console.error(error);
        }
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            setMessage(data.message);
            localStorage.setItem('token', data.token);
        } catch (error) {
            setMessage('Failed to login');
            console.error(error);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Authentication</h1>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="btn btn-primary me-2" onClick={handleRegister}>Register</button>
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
            <div className="mt-3">{message}</div>
        </div>
    );
};

export default AuthComponent;
