import React from 'react';
import './dashboard.css'; // CSS file for styling
import { Avatar, Button, Typography, Box, Paper } from '@mui/material';

function Dashboard() {
    return (
        <div className="dashboard-container">
            <Paper elevation={3} sx={{ width: '100%', padding: 3 }}>
                <Box display="flex" alignItems="center" flexDirection="column">
                    <Avatar
                        src="/path-to-profile-image.jpg"
                        alt="User Avatar"
                        sx={{ width: 100, height: 100, marginBottom: 2 }}
                    />
                    <Typography variant="h6" sx={{ color: 'black' }}>Username</Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ color: 'black' }}>
                        @userid
                    </Typography>
                    <Button variant="outlined" sx={{ marginTop: 2 }}>Edit Profile</Button>

                    <Box mt={3} textAlign="left" width="100%">
                        <Typography variant="body1" sx={{ color: 'black' }}><strong>Roll Number:</strong> 12345</Typography>
                        <Typography variant="body1" sx={{ color: 'black' }}><strong>Course Name:</strong> B.Sc. Computer Science</Typography>
                    </Box>
                </Box>
            </Paper>

            <div className="center-section">
                <div className="tasks-box">
                    <h3 style={{ color: 'black' }}>Assignments</h3>
                    <div className="task-item">
                        <h4 style={{ color: 'black' }}>Math Assignment</h4>
                        <p style={{ color: 'black' }}>Due Date: 25th Nov</p>
                        <p style={{ color: 'black' }}>Status: Pending</p>
                    </div>
                    <div className="task-item">
                        <h4 style={{ color: 'black' }}>Science Project</h4>
                        <p style={{ color: 'black' }}>Due Date: 30th Nov</p>
                        <p style={{ color: 'black' }}>Status: In Progress</p>
                    </div>
                </div>

                <div className="tasks-box">
                    <h3 style={{ color: 'black' }}>New Tasks</h3>
                    <div className="task-item">
                        <h4 style={{ color: 'black' }}>Lab Report</h4>
                        <p style={{ color: 'black' }}>Due Date: 28th Nov</p>
                        <p style={{ color: 'black' }}>Status: Not Started</p>
                    </div>
                    <div className="task-item">
                        <h4 style={{ color: 'black' }}>Group Presentation</h4>
                        <p style={{ color: 'black' }}>Due Date: 1st Dec</p>
                        <p style={{ color: 'black' }}>Status: Not Started</p>
                    </div>
                </div>
            </div>

            <div className="right-section">
                <div className="calendar-box">
                    <h3 style={{ color: 'black' }}>Event Calendar</h3>
                    <p style={{ color: 'black' }}>Workshop on 26th Nov</p>
                    <p style={{ color: 'black' }}>Exam Week from 1st Dec</p>
                </div>
                
                <div className="batch-section">
                    <h3 style={{ color: 'black' }}>Batch Details</h3>
                    <p style={{ color: 'black' }}>Section: A</p>
                    <p style={{ color: 'black' }}>Year: Second</p>
                </div>
                
                <div className="rewards-box">
                    <h3 style={{ color: 'black' }}>Rewards</h3>
                    <p style={{ color: 'black' }}>Badge: Top Scorer</p>
                    <p style={{ color: 'black' }}>Certificate: Coding Marathon</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
