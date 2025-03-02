import LoginForm from '@/components/LoginForm';

import { handleGithubLogin, handleLoginWithCredentials } from '@/lib/action';

import styles from './login.module.css';

const LoginPage = async () => {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <form action={handleGithubLogin}>
                    <button className={styles.github}>Login with Github</button>
                </form>

                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;
