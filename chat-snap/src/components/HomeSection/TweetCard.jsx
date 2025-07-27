import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BarChartIcon from '@mui/icons-material/BarChart';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ReplyModel from './ReplyModel';
import { createReTweet, likeTweet, deleteTweet } from '../../Store/Twit/Action';
import { uploadToCloudnary } from '../../Utils/uploadToCloudnary';

const TweetCard = ({ item, isLast }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [openReplyModel, setOpenReplyModel] = useState(false);
    const [selectedFile, setSelectedFile] = useState("");
    const [uploadingFile, setUploadingFile] = useState(false);

    const tweet = useSelector(state => state.twits ? state.twits.find(twit => twit.id === item.id) : null);

    const handleOpenReplyModel = () => {
        console.log('Opening Reply Model');
        setOpenReplyModel(true);
    };
    const handleCloseReplyModel = () => {
        console.log('Closing Reply Model');
        setOpenReplyModel(false);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteTweet = () => {
        dispatch(deleteTweet(item.id));
        handleClose();
    };

    const handleCreateRetweet = () => {
        dispatch(createReTweet(item.id));
    };

    const handleLikeTweet = () => {
        dispatch(likeTweet(item.id));
    };

    const handleSelectFile = async (event, resourceType) => {
        try {
            setUploadingFile(true);
            const fileUrl = await uploadToCloudnary(event.target.files[0], resourceType);
            if (fileUrl) {
                setSelectedFile(fileUrl);
            }
        } catch (error) {
            console.error("Error during file upload:", error);
        } finally {
            setUploadingFile(false);
        }
    };

    if (!item || !item.user || !item.user.fullName) {
        return null;
    }

    const displayTweet = tweet || item;

    return (
        <React.Fragment>
            <div className='flex justify-center'>
                <div className='w-full max-w-2xl px-4 py-2' style={{ marginLeft: '-50px' }}>
                    <div className='flex space-x-5'>
                        <Avatar
                            onClick={() => navigate(`/profile/${displayTweet.user.id}`)}
                            className='cursor-pointer'
                            alt='username'
                            src={displayTweet.user.avatar}
                        />
                        <div className='w-full'>
                            <div className='flex justify-between items-center'>
                                <div className='flex cursor-pointer items-center space-x-2'>
                                    <span className='font-semibold'>{displayTweet.user.fullName}</span>
                                    <span className='text-gray-600'>
                                        @{displayTweet.user.fullName.split(" ").join("_").toLowerCase()} · 2m
                                    </span>
                                    <img
                                        className='ml-2 w-4 h-4'
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv6CEBObsZa5RkI_eVLNvFbxy_SCpTHMSa3A&s"
                                        alt="Special Icon"
                                    />
                                </div>
                                <div>
                                    <Button
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    >
                                        <MoreHorizIcon />
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem onClick={handleDeleteTweet}>Delete</MenuItem>
                                    </Menu>
                                </div>
                            </div>

                            <div className="mt-2">
                                <div onClick={() => navigate(`/tweet/${displayTweet.id}`)} className="cursor-pointer">
                                    <p className="mb-2 p-0 text-sm">{displayTweet.content}</p>
                                    {displayTweet.image && (
                                        <div
                                            style={{
                                                width: '80%',
                                                paddingTop: '80%',
                                                position: 'relative',
                                                borderRadius: '8px',
                                                overflow: 'hidden',
                                                margin: '0 auto'
                                            }}
                                        >
                                            <img
                                                src={displayTweet.image}
                                                alt="Tweet"
                                                style={{
                                                    position: 'absolute',
                                                    top: '0',
                                                    left: '0',
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'contain'
                                                }}
                                            />
                                        </div>
                                    )}
                                    {displayTweet.video && (
                                        <div
                                            style={{
                                                width: '80%',
                                                paddingTop: '80%',
                                                position: 'relative',
                                                borderRadius: '8px',
                                                overflow: 'hidden',
                                                margin: '0 auto'
                                            }}
                                        >
                                            <video
                                                controls
                                                autoPlay
                                                style={{
                                                    position: 'absolute',
                                                    top: '0',
                                                    left: '0',
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'contain'
                                                }}
                                            >
                                                <source src={displayTweet.video} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                    )}
                                </div>
                                <div className="py-1 flex flex-wrap justify-between items-center">
                                    <div className="space-x-3 flex items-center text-gray-600">
                                        <ChatBubbleOutlineIcon className="cursor-pointer" onClick={handleOpenReplyModel} />
                                        <p>{displayTweet.totalReplies}</p>
                                    </div>

                                    <div className={`${
                                        displayTweet.retwit ? "text-pink-600" : "text-gray-600"
                                    } space-x-3 flex items-center`}>
                                        <RepeatIcon onClick={handleCreateRetweet} className="cursor-pointer" />
                                        <p>{displayTweet.totalTweets}</p>
                                    </div>

                                    <div className={`${
                                        displayTweet.liked ? "text-pink-600" : "text-gray-600"
                                    } space-x-3 flex items-center`}>
                                        {displayTweet.liked ? (
                                            <FavoriteIcon onClick={handleLikeTweet} className="cursor-pointer" />
                                        ) : (
                                            <FavoriteBorderIcon onClick={handleLikeTweet} className="cursor-pointer" />
                                        )}
                                        <p>{displayTweet.totalLikes}</p>
                                    </div>

                                    <div className="space-x-3 flex items-center text-gray-600">
                                        <BarChartIcon className="cursor-pointer" />
                                        <p>10.3k</p>
                                    </div>

                                    <div className="space-x-3 flex items-center text-gray-600">
                                        <input
                                            hidden
                                            id={`file-upload-${displayTweet.id}`}
                                            type="file"
                                            onChange={(e) => handleSelectFile(e, 'image')}
                                        />
                                        <label htmlFor={`file-upload-${displayTweet.id}`}>
                                            <FileUploadIcon className="cursor-pointer" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ReplyModel item={item} open={openReplyModel} handleClose={handleCloseReplyModel} />

            {isLast && (
                <div className='h-96 flex justify-center items-center'>
                    <h1 className='text-center text-3xl font-semibold text-gray-500'>That's It</h1>
                </div>
            )}
        </React.Fragment>
    );
};

export default TweetCard;
