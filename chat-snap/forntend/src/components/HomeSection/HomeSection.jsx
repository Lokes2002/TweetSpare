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
import { getPaginatedTweets, createTweet } from '../../Store/Twit/Action';
import { uploadToCloudnary } from '../../Utils/uploadToCloudnary';
import Picker from '@emoji-mart/react';
import { useTheme } from '../../ThemeContext/ThemeContext';

const validationSchema = Yup.object().shape({
  content: Yup.string().required('Tweet text is required'),
});

const HomeSection = () => {
  const [uploadingFile, setUploadingFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState('');
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [page, setPage] = useState(0);
  const size = 10;

  const dispatch = useDispatch();
  const { twits, loading, error } = useSelector((state) => state.twit);
  const { darkMode } = useTheme();
  const authUser = useSelector((state) => state.auth.user);

  const avatarUrl = authUser?.image?.startsWith('http')
    ? authUser.image
    : `http://localhost:5000/uploads/${authUser?.image}`;

  useEffect(() => {
    dispatch(getPaginatedTweets(page, size));
  }, [dispatch, page]);

  useEffect(() => {
    const videos = document.querySelectorAll('.auto-video');
    let currentPlaying = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            if (currentPlaying && currentPlaying !== video) {
              currentPlaying.pause();
            }
            currentPlaying = video;
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: [0.5] }
    );

    videos.forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, [twits]);

  const formik = useFormik({
    initialValues: {
      content: '',
      image: '',
      video: '',
      isTweet: true,
    },
    validationSchema,
    onSubmit: async (values, actions) => {
      await dispatch(createTweet(values));
      await dispatch(getPaginatedTweets(0, size));
      setPage(0);
      actions.resetForm();
      setSelectedFile('');
    },
  });

  const handleSelectFile = async (e, type) => {
    try {
      setUploadingFile(true);
      const url = await uploadToCloudnary(e.target.files[0], type);
      if (url) {
        formik.setFieldValue(type === 'image' ? 'image' : 'video', url);
        setSelectedFile(url);
      }
    } catch (err) {
      console.error('File upload failed', err);
    } finally {
      setUploadingFile(false);
    }
  };

  const handleEmojiSelect = (emoji) => {
    formik.setFieldValue('content', formik.values.content + emoji.native);
  };

  // 🔁 Refresh tweets on reply/retweet
  const handleReplySuccess = () => {
    dispatch(getPaginatedTweets(0, size));
    setPage(0);
  };

  const handleRetweetSuccess = () => {
    dispatch(getPaginatedTweets(page, size));
  };

  if (loading && page === 0) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={`${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Header */}
      <section
        className="sticky top-0 z-10 w-full backdrop-blur-md bg-opacity-60"
        style={{
          backgroundColor: darkMode ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)',
        }}
      >
        <h2 className="text-2xl font-poppins font-semibold py-4 text-center">
          🚀 Dive into the world of thoughts ✨
        </h2>
      </section>

      {/* Compose Tweet */}
      <section className="pt-2">
        <div className="flex justify-center">
          <div className="w-full max-w-xl mx-1">
            <form
              onSubmit={formik.handleSubmit}
              className={`rounded-xl p-4 shadow-sm border ${
                darkMode ? 'border-gray-700 bg-[#121212]' : 'border-gray-300 bg-white'
              }`}
            >
              <div className="flex space-x-5 items-center">
                <Avatar src={avatarUrl} alt="user" />
                <div className="w-full">
                  <input
                    type="text"
                    name="content"
                    placeholder="What is happening?"
                    className="border-none outline-none text-xl bg-transparent w-full"
                    {...formik.getFieldProps('content')}
                  />
                  {formik.errors.content && formik.touched.content && (
                    <span className="text-red-500">{formik.errors.content}</span>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center mt-5">
                <div className="flex space-x-5 items-center">
                  <label className="cursor-pointer">
                    <ImageIcon className="text-[#1d9bf0]" />
                    <input
                      type="file"
                      name="imageFile"
                      className="hidden"
                      onChange={(e) => handleSelectFile(e, 'image')}
                    />
                  </label>
                  <label className="cursor-pointer">
                    <VideoLibraryIcon className="text-[#1d9bf0]" />
                    <input
                      type="file"
                      name="videoFile"
                      className="hidden"
                      onChange={(e) => handleSelectFile(e, 'video')}
                    />
                  </label>
                  <FmdGoodIcon className="text-[#1d9bf0]" />
                  <TagFacesIcon className="text-[#1d9bf0]" onClick={() => setEmojiPickerOpen(!emojiPickerOpen)} />
                  {emojiPickerOpen && (
                    <div className="absolute z-50 right-5 bottom-28">
                      <Picker onEmojiSelect={handleEmojiSelect} />
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    borderRadius: '20px',
                    paddingY: '6px',
                    paddingX: '14px',
                    bgcolor: '#1e88e5',
                  }}
                >
                  Tweet
                </Button>
              </div>
            </form>

            {selectedFile && (
              <div className="mt-3 flex justify-center">
                {selectedFile.endsWith('.mp4') ? (
                  <video controls className="rounded shadow-md w-full max-w-md aspect-video object-cover">
                    <source src={selectedFile} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={selectedFile}
                    alt="Uploaded"
                    className="rounded shadow-md w-full max-w-md object-cover aspect-video"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Tweet List */}
      <section className="pt-10 px-0">
        {twits?.map((item) => (
          <div
            key={item.id}
            className="group hover:bg-[#f7f7f7] dark:hover:bg-[#16181c] transition duration-200"
          >
            <TweetCard
              item={item}
              onReply={handleReplySuccess}
              onRetweet={handleRetweetSuccess}
            />
            <div className="border-b border-gray-300 dark:border-gray-700 mx-[-16px]" />
          </div>
        ))}

        <div className="flex justify-center mt-6 mb-10">
          <Button
            onClick={() => setPage((prev) => prev + 1)}
            variant="outlined"
            sx={{ borderRadius: '20px', textTransform: 'none' }}
          >
            Load More
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomeSection;
