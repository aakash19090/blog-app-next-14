import { createNewPost, deletePost } from '@/lib/action';

const ServerActionPage = () => {
    return (
        <main>
            <form action={createNewPost}>
                <div>
                    <label htmlFor='title'></label>
                    <input type='text' name='title' id='title' placeholder='Enter Title' />
                </div>

                <div>
                    <label htmlFor='slug'></label>
                    <input type='text' name='slug' id='slug' placeholder='Enter slug' />
                </div>

                <div>
                    <label htmlFor='description'></label>
                    <input type='text' name='description' id='description' placeholder='Enter description' />
                </div>

                <div>
                    <label htmlFor='userId'></label>
                    <input type='text' name='userId' id='userId' placeholder='Enter userId' />
                </div>

                <div>
                    <button type='submit'>Create Post</button>
                </div>
            </form>

            <form action={deletePost}>
                <div>
                    <label htmlFor='id'></label>
                    <input type='text' name='id' id='id' placeholder='Enter Id' />
                </div>

                <div>
                    <button type='submit'>Delete Post</button>
                </div>
            </form>
        </main>
    );
};

export default ServerActionPage;
