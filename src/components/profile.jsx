import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import "./profile.css";

function Profile() {
    const [editMode, setEditMode] = useState(false);
    const [userData, setUserData] = useState({
        username: '',
        handle: '',
        region: '',
        experience: '',
        faceitRank: '',
        elo: '',
        lookingFor: []
    });

    useEffect(() => {
        const fetchData = async () => {
            const currentUser = auth.currentUser;
            if (currentUser) {
                const docRef = doc(db, 'users', currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setUserData(userData);
                }
            }
        };

        fetchData();
    }, [auth.currentUser]);

    async function handleSave() {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const docRef = doc(db, 'users', currentUser.uid);
            await setDoc(docRef, userData, { merge: true });
            setEditMode(false);
        }
    }

    return (
        <div className="profile-container">
            <div className="profile-details">
                {!editMode && (
                    <>
                        <div>Username: {userData.username}</div>
                        <div>Handle: {userData.handle}</div>
                        <div>Region: {userData.region}</div>
                        <div>Experience: {userData.experience}</div>
                        <div>Rank (FaceIT): {userData.faceitRank}</div>
                        <div>ELO: {userData.elo}</div>
                        <div>Looking for: {userData.lookingFor.join(', ')}</div>
                        <button onClick={() => setEditMode(true)}>Edit Profile</button>
                    </>
                )}
                {editMode && (
                    <>
                        <label>Handle:</label>
                        <input type="text" value={userData.handle} onChange={(e) => setUserData({...userData, handle: e.target.value})} />
                        <label>Region:</label>
                        <input type="text" value={userData.region} onChange={(e) => setUserData({...userData, region: e.target.value})} />
                        <label>Experience:</label>
                        <textarea value={userData.experience} onChange={(e) => setUserData({...userData, experience: e.target.value})} />
                        <label>Rank (FaceIT):</label>
                        <select value={userData.faceitRank} onChange={(e) => setUserData({...userData, faceitRank: e.target.value})}>
                            <option value="">Select rank</option>
                            {[...Array(10).keys()].map(rank => (
                                <option key={rank+1} value={rank+1}>{rank+1}</option>
                            ))}
                        </select>
                        <label>ELO:</label>
                        <input type="text" value={userData.elo} onChange={(e) => setUserData({...userData, elo: e.target.value})} />
                        <div className="looking-for">
                            <label>
                                <input type="checkbox" checked={userData.lookingFor.includes('LFT')} onChange={(e) => {
                                    const lookingFor = e.target.checked ? [...userData.lookingFor, 'LFT'] : userData.lookingFor.filter(item => item !== 'LFT');
                                    setUserData({...userData, lookingFor});
                                }} />
                                Looking for Team (LFT)
                            </label>
                            <label>
                                <input type="checkbox" checked={userData.lookingFor.includes('Recruiting')} onChange={(e) => {
                                    const lookingFor = e.target.checked ? [...userData.lookingFor, 'Recruiting'] : userData.lookingFor.filter(item => item !== 'Recruiting');
                                    setUserData({...userData, lookingFor});
                                }} />
                                Recruiting
                            </label>
                        </div>
                        <button onClick={handleSave}>Save</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Profile;
