import { useEffect, useRef, useState } from 'react';

const AudioRecorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioURL, setAudioURL] = useState(null);
    const [timer, setTimer] = useState('00:00');
    const [audioBlob, setAudioBlob] = useState(null);
    const [podcastTitle, setPodcastTitle] = useState('');
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const timerRef = useRef(null);

    useEffect(() => {
        const setupRecorder = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaRecorderRef.current = new MediaRecorder(stream);

                mediaRecorderRef.current.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        audioChunksRef.current.push(event.data);
                    }
                };

                mediaRecorderRef.current.onstop = () => {
                    const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                    const url = URL.createObjectURL(blob);
                    setAudioURL(url);
                    setAudioBlob(blob);
                    audioChunksRef.current = [];
                };
            } catch (error) {
                console.error('Error accessing microphone:', error);
            }
        };

        setupRecorder();
    }, []);

    useEffect(() => {
        const uploadAudioBlob = async () => {
            if (audioBlob) {
                try {
                    const formData = new FormData();
                    formData.append("file", audioBlob, `${podcastTitle || "audio"}.webm`);
                    console.log('uploading', formData);

                    const uploadResponse = await fetch('/api/files', {
                        method: 'POST',
                        body: formData,
                    });

                    if (!uploadResponse.ok) {
                        console.log('Failed to upload file');
                    }

                    const result = await uploadResponse.json();
                    console.log("Uploaded successfully:", result);
                } catch (error) {
                    console.error("Error uploading file:", error);
                }
            }
        };

        uploadAudioBlob();
    }, [audioBlob, podcastTitle]); // Added podcastTitle as a dependency

    const startRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.start();
            setIsRecording(true);
            startTimer();
            console.log('Recording started');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            stopTimer();
            console.log('Recording stopped');
        }
    };

    // Timer functions
    const startTimer = () => {
        let seconds = 0;
        timerRef.current = setInterval(() => {
            seconds += 1;
            const minutes = Math.floor(seconds / 60);
            const displaySeconds = seconds % 60;
            setTimer(
                `${String(minutes).padStart(2, '0')}:${String(displaySeconds).padStart(2, '0')}`
            );
        }, 1000);
    };

    const stopTimer = () => {
        clearInterval(timerRef.current);
        setTimer('00:00'); // Reset the timer
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <input
                type="text"
                placeholder="Podcast Title"
                value={podcastTitle}
                onChange={(e) => setPodcastTitle(e.target.value)}
                className="px-4 py-2 border rounded"
            />

            <div className="relative flex items-center justify-center w-48 h-48 rounded-full bg-gray-300 border-4 border-gray-500">
                <div className="flex items-center justify-center w-36 h-36 bg-white rounded-full">
                    <span className="text-2xl font-bold">{timer}</span>
                </div>
            </div>

            <div className="space-x-4">
                <button
                    onClick={startRecording}
                    disabled={isRecording}
                    className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-green-300"
                >
                    Start Recording
                </button>
                <button
                    onClick={stopRecording}
                    disabled={!isRecording}
                    className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-red-300"
                >
                    Stop Recording
                </button>
            </div>

            {audioURL && (
                <audio controls src={audioURL} className="mt-4">
                    Your browser does not support the audio element.
                </audio>
            )}
        </div>
    );
};

export default AudioRecorder;