import React, { useEffect, useState } from "react";
import './EndOfStepView.css';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom"; 
import ProgressBar from '../ProgressBar/ProgressBar';  // Import the ProgressBar component

function EndOfStepView() {
    const progressList = useSelector((store) => store.userProgressReducer.progress);
    const [isComplete, setIsComplete] = useState(false);
    const dispatch = useDispatch(); 
    const { id } = useParams(); 

    const [selectedPhoto, setSelectedPhoto] = useState(null);  // State to store the selected photo

    useEffect(() => {
        dispatch({ type: 'FETCH_USER_PROGRESS', payload: id });
    }, [dispatch, id]);

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedPhoto(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedPhoto) {
            alert("Please select a photo first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedPhoto);
        formData.append("user_id", id);  
        formData.append("day", 1);  

        // Send the file to the backend
        fetch("http://localhost:5001/api/upload", {
            method: "POST",
            body: formData,
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Upload successful:", data.fileUrl);
            alert("Photo uploaded successfully!");
            
            // Now that the photo is uploaded, let's also add the initial photo URL to the userImage table
            dispatch({
                type: 'SET_INITIAL_IMAGE',
                payload: {
                    user_id: id,
                    initial_photo: data.fileUrl,
                },
            });
        })
        .catch((error) => {
            console.error("Error uploading photo:", error);
            alert("Failed to upload photo.");
        });
    };

    const handleComplete = (event) => {
        event.preventDefault();
        setIsComplete(!isComplete);
    };

    return (
        <div>
            <h2>BCX</h2>
            <h4 className="h4_EndView">Step1: HYDRATE</h4>
            <h1 className="h1_EndView">COMPLETE</h1>

            <div className="photo-upload-container">
                <h3>YOU'VE BUILT CONSESTENCY</h3>
                <p>Step 1 complete! You've shown your ability to stay consistent and
                    committed. Hydration wasn't just about water—it was about showing
                    up for yourself. Keep that momentum going as you move to the next step.
                </p>

                {/* Form to select and upload photo */}
                <form onSubmit={handleSubmit}>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        required
                    />
                    <button className="submit-button" type="submit">
                       I TOOK MY PHOTO
                    </button>
                </form>
            </div>

            <div className="progress-container" onChange={handleComplete}>          
                {progressList.map((item) => (
                    <div key={item.user_id}>
                        <ProgressBar value={item.step} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EndOfStepView;
