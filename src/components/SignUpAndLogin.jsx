import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';

function SignUpAndLogin() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                login();
            } else {
                signUp();
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };


    async function login() {
        console.log(email, password)
        await signInWithEmailAndPassword(auth,email,password)
            .then((credentials) => {
                const user = credentials.user;
                console.log('Logged in as', user);

                setUsername({
                    name: username,
                });

                navigate("/home");
            })
            .catch((error) => {
                console.log("error login", error);
            });
    }

    async function signUp() {
        await createUserWithEmailAndPassword(auth, email, password)
            .then((credentials) => {
                const user = credentials.user;
                console.log('new user', user);
    
                // Set display name
                updateProfile(user, { displayName: username })
                    .then(() => {
                        console.log('Display name updated successfully');
                        navigate("/profile");
                    })
                    .catch((error) => {
                        console.error('Error updating display name:', error); // Log any errors
                    });
            })
            .catch((error) => {
                console.log("ERROR SignUp", error);
            });
    }
    
    

    return (
        <div className='page'>
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
    
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
                {!isLogin && (
            <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            /> )}
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
            <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        </form>
        <p>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Login'}
            </button>
        </p>
        </div>
    );
}

export default SignUpAndLogin;
