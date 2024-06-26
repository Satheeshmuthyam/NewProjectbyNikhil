import React, { useState } from 'react';
import styles from './Registration.module.css';

function NewRegistration() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        // update the user state with prevState

        setUser((prevState) => ({
            ...prevState,
            [name]: value
        }));

        // validate the input fields
        validateFields(name, value);
       
    }   

    const validateFields = (name, value) => {
        let errorMessage = '';

        switch (name) {
            case 'name':
                errorMessage = value.length < 3 ? 'Name must be at least 3 characters long' : '';
                break;
            case 'email':
                errorMessage = value.trim() ?
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email format.' :
                'Email is required';
                break;
            case 'phone':
                errorMessage = value.trim() ?
                /^\d{10}$/.test(value) ? '' : 'Phone number must be a valid Indian phone number (10 digits).' :
                'Phone is required';
                break;
            case 'password':
                errorMessage = value.trim() ?
                /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/.test(value) ? '' : 'Password must be at least 8 characters long and include at least one number, one uppercase letter, and one special character.' :
                'Password is required';
                break;
            default:
                break;
        }

        setErrors((prevState) => ({ 
            ...prevState,
            [name]: errorMessage
        }));

    }




    const handleSubmit = (event) => {
        event.preventDefault();

        // for each field in state call validate method.
        Object.keys(user).forEach((key) => {
            validateFields(key, user[key]);
        });

    };
       
    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
                <label htmlFor="name" className={styles.label}>Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className={styles.input}
                    value={user.name}
                    onChange={handleChange}
                />
                {errors.name && <p className={styles.error}>{errors.name}</p>}
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className={styles.input}
                    value={user.email}
                    onChange={handleChange}
                />
                {errors.email && <p className={styles.error}>{errors.email}</p>}
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="phone" className={styles.label}>Phone:</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className={styles.input}
                    value={user.phone}
                    onChange={handleChange}
                />
                {errors.phone && <p className={styles.error}>{errors.phone}</p>}
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.label}>Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className={styles.input}
                    value={user.password}
                    onChange={handleChange}
                />
            </div>
                {errors.password && <p className={styles.error}>{errors.password}</p>}
            <button type="submit" className={styles.submitButton}>Register</button>
        </form>
    );
}

export default NewRegistration;