import React, { useEffect, useState } from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Avatar, Box, Button, Tab } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import TweetCard from '../HomeSection/TweetCard';
import ProfileModel from './ProfileModel';
import { useSelector, useDispatch } from 'react-redux';
import { findUserById, followUserAction } from '../../Store/Auth/Action';
import { getUsersTweet, findTwitsByLikeContainUser } from '../../Store/Twit/Action';
import { format } from 'date-fns';

const Profile = () => {
  const [tabValue, setTabValue] = useState("1");
  const [openProfileModel, setOpenProfileModel] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth, twit } = useSelector(store => store);
  const { id } = useParams();
  const loggedInUserId = auth.user?.id;

  const handleOpenProfileModel = () => setOpenProfileModel(true);
  const handleCloseProfileModel = () => setOpenProfileModel(false);
  const handleBack = () => navigate(-1);

  const handleFollowUser = () => {
    dispatch(followUserAction(id)).then(() => {
      dispatch(findUserById(id));
    });
  };

  const handleTabChange = (event, newValue) => setTabValue(newValue);

  useEffect(() => {
    dispatch(findUserById(id));
    dispatch(getUsersTweet(id));
    dispatch(findTwitsByLikeContainUser(id));
  }, [dispatch, id]);

  const handleNavigateToFollowers = () => navigate(`/followers/${id}`);
  const handleNavigateToFollowing = () => navigate(`/following/${id}`);
  const handleMessageClick = () => navigate(`/chat/${id}`);

  const joinedDate = auth.findUser?.joinedDate ? format(new Date(auth.findUser?.joinedDate), 'MMMM yyyy') : 'Unknown';
  const birthDate = auth.findUser?.birthDate ? format(new Date(auth.findUser?.birthDate), 'dd MMM yyyy') : null;

  return (
    <div>
      <section className="bg-white z-50 flex items-center sticky top-0 bg-opacity-95 p-4">
        <KeyboardBackspaceIcon className="cursor-pointer" onClick={handleBack} />
        <h1 className="text-xl font-bold opacity-90 ml-5">{auth.findUser?.fullName}</h1>
      </section>

      <section>
        <img className="w-full h-60 object-cover" src={auth.findUser?.backgroundImage} alt="Cover" />
      </section>

      <section className="pl-6">
        <div className="flex justify-between items-start mt-5 h-20">
          <Avatar
            className="transform -translate-y-24"
            alt="Profile Picture"
            src={auth.findUser?.image}
            sx={{ width: "10rem", height: "10rem", border: "4px solid white" }}
          />
          {auth.findUser?.reqUser ? (
            <Button onClick={handleOpenProfileModel} variant="contained" sx={{ borderRadius: "20px" }}>
              Edit Profile
            </Button>
          ) : (
            <Button onClick={handleFollowUser} variant="contained" sx={{ borderRadius: "20px" }}>
              {auth.findUser?.followed ? "Unfollow" : "Follow"}
            </Button>
          )}
        </div>

        <div>
          <h1 className="font-bold text-lg">{auth.findUser?.fullName}</h1>
          <h1 className="text-gray-500">@{auth.findUser?.fullName?.split(" ").join("_").toLowerCase()}</h1>
        </div>

        <div className="mt-2 space-y-3">
          <p className="whitespace-pre-line">{auth.findUser?.bio}</p>

          <div className="py-1 flex flex-wrap gap-5 text-gray-500">
            {auth.findUser?.location && (
              <div className="flex items-center">
                <LocationOnIcon fontSize="small" />
                <p className="ml-1">{auth.findUser.location}</p>
              </div>
            )}
            {birthDate && (
              <div className="flex items-center">
                <CalendarMonthIcon fontSize="small" />
                <p className="ml-1">Born {birthDate}</p>
              </div>
            )}
            {joinedDate && (
              <div className="flex items-center">
                <CalendarMonthIcon fontSize="small" />
                <p className="ml-1">Joined {joinedDate}</p>
              </div>
            )}
          </div>

          <div className="flex items-center flex-wrap gap-6">
            <div className="flex items-center space-x-1 font-semibold cursor-pointer" onClick={handleNavigateToFollowing}>
              <span>{auth.findUser?.following?.length || 0}</span>
              <span className="text-gray-500">Following</span>
            </div>
            <div className="flex items-center space-x-1 font-semibold cursor-pointer" onClick={handleNavigateToFollowers}>
              <span>{auth.findUser?.followers?.length || 0}</span>
              <span className="text-gray-500">Followers</span>
            </div>
            {auth.findUser?.id !== loggedInUserId && (
              <Button variant="outlined" sx={{ marginLeft: 'auto', borderRadius: "40px" }} onClick={handleMessageClick}>
                Message
              </Button>
            )}
          </div>
        </div>
      </section>

      <section className="py-5">
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleTabChange} aria-label="Profile Tabs">
                <Tab label="Tweets" value="1" />
                <Tab label="Replies" value="2" />
                <Tab label="Media" value="3" />
                <Tab label="Likes" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              {twit.twits.length > 0 ? (
                twit.twits.map((item) => <TweetCard key={item.id} item={item} />)
              ) : (
                <p>No tweets available</p>
              )}
            </TabPanel>
            <TabPanel value="2">User's replies</TabPanel>
            <TabPanel value="3">
              {twit.twits.filter(t => t.image || t.video).map((item) => (
                <TweetCard key={item.id} item={item} />
              ))}
            </TabPanel>
            <TabPanel value="4">
              {twit.likedTwits && twit.likedTwits.length > 0 ? (
                twit.likedTwits.map((item) => <TweetCard key={item.id} item={item} />)
              ) : (
                <p>No liked tweets available</p>
              )}
            </TabPanel>
          </TabContext>
        </Box>
      </section>

      <section>
        <ProfileModel handleClose={handleCloseProfileModel} open={openProfileModel} onUpdate={() => dispatch(findUserById(id))} />
      </section>
    </div>
  );
};

export default Profile;
