import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Divider } from '@mui/material';
import TweetCard from '../HomeSection/TweetCard';
import { findTwitsById } from '../../Store/Twit/Action';
import { useDispatch, useSelector } from 'react-redux';

const TweetDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { twit, loading, error } = useSelector((store) => store.twit);

    useEffect(() => {
        if (id) {
            dispatch(findTwitsById(id));
        }
    }, [dispatch, id]);

    const handleBack = () => navigate(-1);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!twit) {
        return <div>No tweet found.</div>;
    }

    return (
        <div>
            <section className="bg-white z-50 flex items-center sticky top-0 bg-opacity-95 p-4">
                <KeyboardBackspaceIcon
                    className="cursor-pointer"
                    onClick={handleBack}
                />
                <h1 className="text-xl font-bold opacity-90 ml-5">Tweet</h1>
            </section>
            <section>
                <TweetCard item={twit} />
                <Divider sx={{ margin: "2rem 0" }} />
            </section>
            <section>
                {twit.replyTwits && twit.replyTwits.map((item) => (
                    <TweetCard key={item.id} item={item} />
                ))}
            </section>
        </div>
    );
};

export default TweetDetails;
