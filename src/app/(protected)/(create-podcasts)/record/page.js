'use client';
import AudioRecorder from './_components/AudioRecorder';

const Home = () => {
  return (
    <div>
      <h1 className='text-3xl bold'>Record a Podcast</h1>
      <div className='mt-28'>
        <AudioRecorder />
      </div>
    </div>
  );
};

export default Home;