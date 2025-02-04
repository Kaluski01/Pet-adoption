import React, { useState, useEffect } from 'react';
import IMG from '../Pages/assests/beauty dog.jpg';
// import './StoryCard.css'; // Import CSS file for styling

const StoryCard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        try {
            const storedUsers = localStorage.getItem('users');
            if (storedUsers) {
                setUsers(JSON.parse(storedUsers));
            }
        } catch (error) {
            console.error('Error loading users from local storage:', error);
        }
    }, []);

    return (
        <div className="container"> {/* Center the card using Bootstrap */}
            <div className="row justify-content-center"> {/* Center the card on small screens */}
                <div className="col-md-8"> {/* Make the card span full width on small screens */}
                    <div className="card small-card"> {/* Apply small-card class for smaller size */}
                        <div className="card-body">
                            <img src={IMG} alt="" />
                            <h5 className="card-title">A Tale of My Beloved Shiba Inu, King</h5>
                            <p className="card-text">
                                Dear Reader,
                            </p>
                            <p className="card-text">
                                I wanted to share with you a little story about my beloved Shiba Inu, King. From the moment King entered my life, he brought an abundance of joy, laughter, and love into my home.
                            </p>
                            <p className="card-text">
                                With his distinctive fox-like appearance and spirited personality, King quickly became the heart and soul of our family. His playful antics and unwavering loyalty never fail to brighten even the darkest of days.
                            </p>
                            <p className="card-text">
                                Whether it's chasing squirrels in the park, going for long walks in the countryside, or simply cuddling up on the couch, King is always by my side, filling my life with endless happiness and companionship.
                            </p>
                            {users.length > 1 && users[1] && (
                                <p className="card-text">
                                    With love and gratitude,
                                    <br />
                                    {users[1].name} (Owner)
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoryCard;
