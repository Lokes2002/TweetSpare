import React from 'react';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../Store/Auth/Action';
import { uploadToCloudnary } from '../../Utils/uploadToCloudnary';
import './ProfileModel.css'; // <-- Make sure to import your CSS

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 0,
  borderRadius: 4,
  maxHeight: '90vh',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
};

const ProfileModel = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const [selectedImage, setSelectedImage] = React.useState('');
  const [selectedBackgroundImage, setSelectedBackgroundImage] = React.useState('');
  const [uploading, setUploading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      bio: '',
      website: '',
      location: '',
      image: '',
      backgroundImage: '',
    },
    onSubmit: (values) => {
      dispatch(updateUserProfile(values));
      handleClose();
    },
    validate: (values) => {
      const errors = {};
      if (values.bio?.length > 1000) {
        errors.bio = 'Max 1000 characters allowed';
      }
      return errors;
    }
  });

  React.useEffect(() => {
    formik.setValues({
      fullName: auth.user?.fullName || '',
      bio: auth.user?.bio || '',
      website: auth.user?.website || '',
      location: auth.user?.location || '',
      image: auth.user?.image || '',
      backgroundImage: auth.user?.backgroundImage || '',
    });
  }, [auth.user]);

  const handleImageChange = async (e) => {
    setUploading(true);
    const { name } = e.target;
    try {
      const url = await uploadToCloudnary(e.target.files[0], 'image');
      formik.setFieldValue(name, url);
      if (name === 'image') setSelectedImage(url);
      else setSelectedBackgroundImage(url);
    } catch (err) {
      console.log('Upload error', err);
    }
    setUploading(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <div className="flex items-center gap-2">
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h6">Edit Profile</Typography>
          </div>
          <Button
            variant="contained"
            onClick={formik.handleSubmit}
            disabled={uploading}
            sx={{ textTransform: 'none', borderRadius: 5 }}
          >
            Save
          </Button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto hideScrollBar px-4 pb-6 pt-2 flex-grow" style={{ maxHeight: 'calc(90vh - 56px)' }}>
          {/* Background Image */}
          <div className="relative mb-4">
            <img
              src={selectedBackgroundImage || formik.values.backgroundImage || ''}
              alt="background"
              className="w-full h-[180px] object-cover rounded"
            />
            <input
              type="file"
              name="backgroundImage"
              onChange={handleImageChange}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          {/* Avatar */}
          <div className="relative w-[100px] h-[100px] -mt-[50px] ml-4 mb-4">
            <Avatar
              src={selectedImage || formik.values.image}
              sx={{ width: 100, height: 100, border: '3px solid white' }}
            />
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          {/* Form fields */}
          <div className="space-y-4">
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
            />
            <TextField
              fullWidth
              multiline
              rows={6}
              name="bio"
              label="Bio"
              value={formik.values.bio}
              onChange={formik.handleChange}
              inputProps={{ maxLength: 1000, style: { whiteSpace: 'pre-wrap' } }}
              helperText={`${formik.values.bio.length}/1000`}
            />
            <TextField
              fullWidth
              label="Website"
              name="website"
              value={formik.values.website}
              onChange={formik.handleChange}
            />
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={formik.values.location}
              onChange={formik.handleChange}
            />
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ProfileModel;
