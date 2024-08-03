'use client';

import Link from 'next/link';

import { useFormState } from 'react-dom';

import { handleLoginWithCredentials } from '@/lib/action';

import styles from './LoginForm.module.css';

const LoginForm = () => {
    const [formState, formAction] = useFormState(handleLoginWithCredentials, null);
    return (
        <form className={styles.form} action={formAction}>
            <input type='text' placeholder='username' name='username' />
            <input type='password' placeholder='password' name='password' />
            <button>Login</button>
            {formState?.error}
            <Link href='/register'>
                {"Don't have an account?"} <b>Register</b>
            </Link>
        </form>
    );
};

export default LoginForm;
