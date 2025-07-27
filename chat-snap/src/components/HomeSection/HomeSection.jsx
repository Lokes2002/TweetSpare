import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Avatar, Button } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import TweetCard from './TweetCard';
import { getAllTweets, createTweet } from '../../Store/Twit/Action';
import { uploadToCloudnary } from '../../Utils/uploadToCloudnary';
import Picker from '@emoji-mart/react';
import { useTheme } from '../../ThemeContext/ThemeContext';
import Chat from '../Features/Chat';


const validationSchema = Yup.object().shape({
    content: Yup.string().required("Tweet text is required"),
});

const HomeSection = () => {
    const [uploadingFile, setUploadingFile] = useState(false);
    const [selectedFile, setSelectedFile] = useState("");
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
    const [showChat, setShowChat] = useState(false); // State to toggle chat
    const dispatch = useDispatch();
    const { twits, loading, error } = useSelector((state) => state.twit);
    const { darkMode } = useTheme();

    useEffect(() => {
        dispatch(getAllTweets());
    }, [dispatch]);

    const formik = useFormik({
        initialValues: {
            content: "",
            image: "",
            isTweet: true,
        },
        validationSchema,
        onSubmit: (values, actions) => {
            dispatch(createTweet(values));
            actions.resetForm();
            setSelectedFile("");
        },
    });

    const handleSelectFile = async (event, resourceType) => {
        try {
            setUploadingFile(true);
            const fileUrl = await uploadToCloudnary(event.target.files[0], resourceType);
            if (fileUrl) {
                formik.setFieldValue(resourceType === 'image' ? 'image' : 'video', fileUrl);
                setSelectedFile(fileUrl);
            }
        } catch (error) {
            console.error("Error during file upload:", error);
        } finally {
            setUploadingFile(false);
        }
    };

    const toggleEmojiPicker = () => {
        setEmojiPickerOpen(!emojiPickerOpen);
    };

    const handleEmojiSelect = (emoji) => {
        const currentContent = formik.values.content;
        formik.setFieldValue('content', currentContent + emoji.native);
    };

    const toggleChat = () => {
        setShowChat(!showChat);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className={`space-y-1 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <section className='sticky top-0 z-9 bg-inherit'>
                <h1 className='py-3 text-xl font-bold'>
                    Home
                </h1>
    
            </section>
            <section className='pb-38 pt-2'>
                <div className='flex justify-center'>
                    <div className='w-full max-w-xl mx-2'>
                        <form onSubmit={formik.handleSubmit} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                            <div className='flex space-x-5 items-center'>
                                <Avatar alt="username" src='' />
                                <div className='w-full'>
                                    <input
                                        type="text"
                                        name='content'
                                        placeholder='What is happening'
                                        className='border-none outline-none text-xl bg-transparent w-full'
                                        {...formik.getFieldProps("content")}
                                    />
                                    {formik.errors.content && formik.touched.content && (
                                        <span className='text-red-500'>{formik.errors.content}</span>
                                    )}
                                </div>
                            </div>

                            <div className='flex justify-between items-center mt-5'>
                                <div className='flex space-x-5 items-center'>
                                    <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                                        <ImageIcon className='text-[#1d9bf0]' />
                                        <input
                                            type="file"
                                            name="imageFile"
                                            className="hidden"
                                            onChange={(e) => handleSelectFile(e, 'image')}
                                        />
                                    </label>
                                    <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                                        <VideoLibraryIcon className='text-[#1d9bf0]' />
                                        <input
                                            type="file"
                                            name="videoFile"
                                            className="hidden"
                                            onChange={(e) => handleSelectFile(e, 'video')}
                                        />
                                    </label>
                                    <FmdGoodIcon className="text-[#1d9bf0]" />
                                    <TagFacesIcon className="text-[#1d9bf0]" onClick={toggleEmojiPicker} />
                                    {emojiPickerOpen && (
                                        <Picker 
                                            onEmojiSelect={handleEmojiSelect} 
                                            style={{ 
                                                position: 'absolute', 
                                                bottom: '70px', 
                                                right: '20px', 
                                                width: '200px', 
                                                zIndex: 1000, 
                                            }} 
                                        />
                                    )}
                                </div>
                                <div>
                                    <Button
                                        sx={{ width: "100%", borderRadius: "20px", paddingY: "6px", paddingX: "10px", bgcolor: '#1e88e5' }}
                                        variant="contained"
                                        type="submit"
                                    >
                                        Tweet
                                    </Button>
                                </div>
                            </div>
                        </form>
                        {selectedFile && (
                            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
                                {selectedFile.endsWith('.mp4') ? (
                                    <video style={{ width: '100%', maxWidth: '320px', height: 'auto', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }} controls autoPlay>
                                        <source src={selectedFile} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    <img style={{ width: '100%', maxWidth: '320px', height: 'auto', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }} src={selectedFile} alt="" />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>
            {showChat && (  // Conditionally render Chat component
                <section className='pt-10'>
                    <Chat />  {/* Render Chat component */}
                </section>
            )}
            <section className='pt-10'>
                {twits?.map((item) => (
                    <TweetCard key={item.id} item={item} />
                ))}
            </section>
        </div>
    );
};

export default HomeSection;
