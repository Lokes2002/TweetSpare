// src/components/MessagePage/MessagePage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, TextField, Button } from '@mui/material';
import { getMessages, sendMessage } from '../../Store/Auth/Action';

const MessagePage = () => {
    const { id } = useParams(); // Profile user ID
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const { messages } = useSelector(state => state.message);

    useEffect(() => {
        dispatch(getMessages(id));
    }, [dispatch, id]);

    const handleSendMessage = () => {
        dispatch(sendMessage({ recipientId: id, message })).then(() => {
            setMessage('');
            dispatch(getMessages(id));
        });
    };

    return (
        <Box>
            <h2>Messages with User {id}</h2>
            <Box>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <p><strong>{msg.senderName}:</strong> {msg.content}</p>
                    </div>
                ))}
            </Box>
            <TextField
                label="Message"
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                multiline
                rows={4}
                variant="outlined"
                margin="normal"
            />
            <Button variant="contained" onClick={handleSendMessage}>Send</Button>
        </Box>
    );
};

export default MessagePage;
