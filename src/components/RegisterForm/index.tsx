'use client';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useFormState } from 'react-dom';

import { registerUser } from '@/lib/action';

import styles from './RegisterForm.module.css';

const RegisterForm = () => {
    const [formState, formAction] = useFormState(registerUser, null);
    const router = useRouter();

    useEffect(() => {
        formState?.success && router.push('/login');
    }, [formState?.success, router]);

    return (
        <form className={styles.form} action={formAction}>
            <input type='text' placeholder='username' name='username' />
            <input type='email' placeholder='email' name='email' />
            <input type='password' placeholder='password' name='password' />
            <input type='password' placeholder='password again' name='passwordRepeat' />
            <button>Register</button>
            {formState?.error}
            <Link href='/login'>
                Have an account? <b>Login</b>
            </Link>
        </form>
    );
};

export default RegisterForm;
