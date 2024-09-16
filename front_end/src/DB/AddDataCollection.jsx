import React, { useState, useEffect } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useAuth } from '../connections/AuthContext';

export default function AddDataCollection({ newTarget, onSuccess , collection}) {
    const { user } = useAuth();
    const userEmail = user.email

    // console.log("xx");

    const [message, setMessage] = useState('');

    useEffect(() => {
        const addLocationToFirebase = async () => {
            if (newTarget && userEmail) {
                try {
                    await setDoc(doc(db, "Users", userEmail, collection , newTarget.place_id), {
                        name: newTarget.name,
                        address: newTarget.address,
                        latitude: newTarget.latitude,
                        longitude: newTarget.longitude,
                        visit: false,
                        tripTypes: newTarget.tripTypes,
                        notes: newTarget.notes,
                        addedAt: newTarget.addedAt

                    });
                    setMessage("Location added successfully");
                    if (onSuccess) onSuccess();
                } catch (error) {
                    console.error("Error adding location:", error);
                    setMessage("An error occurred while adding the location");
                }
            }
        };
        

        addLocationToFirebase();
    }, [newTarget, userEmail, onSuccess]);

    
    return (
        <div>
            <p>{message}</p>
        </div>
    );
};