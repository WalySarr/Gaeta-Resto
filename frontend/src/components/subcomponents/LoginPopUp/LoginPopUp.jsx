import React, { useContext, useState } from 'react';
import './LoginPopUp.css';
import { assets } from '../../../assets/assets';
import { StoreContext } from '../../../context/StoreContext';
import axios from 'axios';
import Cookies from 'js-cookie';

const LoginPopUp = ({ setShowLogin }) => {
    const { url, setToken, setUsername, setUserId } = useContext(StoreContext);
    const [currState, setcurrState] = useState('Login');
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({ ...data, [name]: value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;
        if (currState === 'Login') {
            newUrl += '/api/user/login';
        } else {
            newUrl += '/api/user/register';
        }

        if (!data.email || !data.password) {
            setError('Please enter both email and password.');
            return;
        }

        try {
            const response = await axios.post(newUrl, data);

            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', response.data.username);
                setUsername(response.data.username);
                Cookies.remove('user_id'); // Supprimer l'identifiant de l'utilisateur invité
                setUserId(''); // Réinitialiser l'userId dans le contexte
                setShowLogin(false);
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError("Credentials don't match. Try again!");
        }
    };

    return (
        <div className="login-popup">
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="close" />
                </div>
                <div className="login-popup-inputs">
                    {error && <p className="error">{error}</p>}
                    {currState === 'Login' ? null : (
                        <input
                            type="text"
                            name="name"
                            onChange={onChangeHandler}
                            value={data.name}
                            placeholder="Your name"
                            required
                        />
                    )}
                    <input
                        type="email"
                        name="email"
                        onChange={onChangeHandler}
                        value={data.email}
                        placeholder="Your email"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        onChange={onChangeHandler}
                        value={data.password}
                        placeholder="Password"
                        required
                    />
                </div>
                <button type="submit">
                    {currState === 'Sign Up' ? 'Create account' : 'Login'}
                </button>
                <div className="login-popup-condition">
                    <input type="checkbox" required className="form-check-input" />
                    <p>I agree to the terms and conditions.</p>
                </div>
                {currState === 'Sign Up' ? (
                    <p>
                        Already have an account?{' '}
                        <span onClick={() => setcurrState('Login')}>Login here</span>
                    </p>
                ) : (
                    <p>
                        Create a new account?{' '}
                        <span onClick={() => setcurrState('Sign Up')}>Click here</span>
                    </p>
                )}
            </form>
        </div>
    );
};

export default LoginPopUp;
