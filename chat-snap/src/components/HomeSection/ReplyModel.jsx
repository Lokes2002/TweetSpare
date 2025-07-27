import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ImageIcon from '@mui/icons-material/Image';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { createTweetReply } from '../../Store/Twit/Action'; // Assuming you have a function for uploading to Cloudinary
import { uploadToCloudnary } from '../../Utils/uploadToCloudnary';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: 4
};


export default function ReplyModel({ open, handleClose, item }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [uploadingImage, setUploadingImage] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState("");

  const handleSubmit = (values, actions) => {
    dispatch(createTweetReply(values));
    handleClose();
    console.log("handle submit", values);
    actions.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
      twitId: item?.id || "" // Optional chaining to avoid errors
    },
    onSubmit: handleSubmit
  });

  const handleSelectImage = async (event) => {
    setUploadingImage(true);
    const file = event.target.files[0];
    const imgUrl = await uploadToCloudnary(file);
    formik.setFieldValue("image", imgUrl);
    setSelectedImage(URL.createObjectURL(file));
    setUploadingImage(false);
  };

  if (!item) return null; // Ensure item is present before rendering

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='flex space-x-5'>
            <Avatar
              onClick={() => navigate(`/profile/${item.userId}`)}
              className='cursor-pointer'
              alt='username'
              src={item.userAvatar || "/default-avatar.png"} // Fallback if image not present
            />
            <div className='w-full'>
              <div className='flex justify-between items-center'>
                <div className='flex cursor-pointer items-center space-x-2'>
                  <span className='font-semibold'>{item.username || "Username"}</span>
                  <span className='text-gray-600'>{item.userEmail || "Email"}</span>
                  <img className='ml-2 w-4 h-4' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv6CEBObsZa5RkI_eVLNvFbxy_SCpTHMSa3A&s" alt="Verified" />
                </div>
              </div>

              <div className="mt-2">
                <div onClick={() => navigate(`/tweet/${item.id}`)} className="cursor-pointer">
                  <p className="mb-2">{item.tweetContent || "Tweet content not available"}</p>
                </div>
              </div>
              <section className='py-5'>
                <div className='flex space-x-9'>
                  <Avatar alt="username" src={item.userAvatar || "/default-avatar.png"} />
                  <div className='w-full'>
                    <form onSubmit={formik.handleSubmit}>
                      <div>
                        <input
                          type="text"
                          name='content'
                          placeholder='What is happening'
                          className='border-none outline-none text-xl bg-transparent'
                          {...formik.getFieldProps("content")}
                        />
                        {formik.errors.content && formik.touched.content && (
                          <span className='text-red-500'>{formik.errors.content}</span>
                        )}
                      </div>

                      {selectedImage && (
                        <div className='mt-4'>
                          <img src={selectedImage} alt="Selected" className="w-full rounded-md" />
                        </div>
                      )}

                      <div className='flex justify-between items-center mt-5'>
                        <div className='flex space-x-5 items-center'>
                          <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                            <ImageIcon className='text-[#1d9bf0]' />
                            <input
                              type="file"
                              name="image"
                              className="hidden"
                              onChange={handleSelectImage}
                            />
                          </label>
                          <FmdGoodIcon className="text-[#1d9bf0]" />
                          <TagFacesIcon className="text-[#1d9bf0]" />
                        </div>
                        <div>
                          <Button
                            sx={{ width: "100%", borderRadius: "20px", paddingY: "8px", paddingX: "20px", bgcolor: '#1e88e5' }}
                            variant="contained"
                            type="submit"
                            disabled={uploadingImage}
                          >
                            Tweet
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
