import React, { useEffect } from 'react';
import { Avatar, Box, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getFollowers, getFollowing } from '../../Store/Auth/Action';
import { useNavigate, useParams } from 'react-router-dom';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';

const Lists = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { auth } = useSelector(store => store);
    const [tabValue, setTabValue] = React.useState('1');

    useEffect(() => {
        dispatch(getFollowers(id));
        dispatch(getFollowing(id));
    }, [dispatch, id]);

    const handleBack = () => navigate(-1);
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <div>
            <section className="bg-white z-50 flex items-center sticky top-0 bg-opacity-95">
                <Button onClick={handleBack}>Back</Button>
                <h1 className="py-5 text-xl font-bold opacity-90 ml-5">Followers & Following</h1>
            </section>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={tabValue}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleTabChange} aria-label="Followers & Following Tabs">
                            <Tab label="Following" value="1" />
                            <Tab label="Followers" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <Box p={3}>
                            <h2>Following</h2>
                            <ul>
                                {auth.following.map(following => (
                                    <li key={following.id} className="flex items-center space-x-3">
                                        <Avatar src={following.image} />
                                        <span>{following.fullName}</span>
                                    </li>
                                ))}
                            </ul>
                        </Box>
                    </TabPanel>
                    <TabPanel value="2">
                        <Box p={3}>
                            <h2>Followers</h2>
                            <ul>
                                {auth.followers.map(follower => (
                                    <li key={follower.id} className="flex items-center space-x-3">
                                        <Avatar src={follower.image} />
                                        <span>{follower.fullName}</span>
                                    </li>
                                ))}
                            </ul>
                        </Box>
                    </TabPanel>
                </TabContext>
            </Box>
        </div>
    );
};

export default Lists;
