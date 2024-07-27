'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('error boundary', error);
    }, [error]);

    return (
        <div className='blog-error-page'>
            <h2>Something went wrong fetching blogs!</h2>
            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Fetch Blog Posts Again
            </button>
        </div>
    );
}
