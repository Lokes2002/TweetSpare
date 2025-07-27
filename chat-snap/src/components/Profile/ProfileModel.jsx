import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, IconButton, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../Store/Auth/Action';
import { uploadToCloudnary } from '../../Utils/uploadToCloudnary';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500, // Adjusted width
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 4,
    outline: 'none',
    borderRadius: 4,
};

const ProfileModel = ({ open, handleClose }) => {
    const dispatch = useDispatch();
    const { auth } = useSelector(store => store);
    const [uploading, setUploading] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState("");
    const [selectedBackgroundImage, setSelectedBackgroundImage] = React.useState("");

    React.useEffect(() => {
        formik.setValues({
            fullName: auth.user?.fullName || '',
            website: auth.user?.website || '',
            location: auth.user?.location || '',
            bio: auth.user?.bio || '',
            backgroundImage: auth.user?.backgroundImage || '',
            image: auth.user?.image || '',
        });
    }, [auth.user]);

    const handleSubmit = (values) => {
        dispatch(updateUserProfile(values));
        setSelectedImage("");
        setSelectedBackgroundImage("");
        handleClose();
    };

    const formik = useFormik({
        initialValues: {
            fullName: '',
            website: '',
            location: '',
            bio: '',
            backgroundImage: '',
            image: '',
        },
        onSubmit: handleSubmit,
    });

    const handleImageChange = async (event) => {
        setUploading(true);
        const { name } = event.target;
        const file = await uploadToCloudnary(event.target.files[0], 'image');
        formik.setFieldValue(name, file);
        if (name === 'backgroundImage') {
            setSelectedBackgroundImage(file);
        } else {
            setSelectedImage(file);
        }
        setUploading(false);
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center space-x-3'>
                                <IconButton onClick={handleClose} aria-label="close">
                                    <CloseIcon />
                                </IconButton>
                                <Typography>Edit Profile</Typography>
                            </div>
                            <Button type='submit'>Save</Button>
                        </div>
                        <div className="overflow-y-scroll overflow-x-hidden h-[80vh]">
                            <React.Fragment>
                                <div className="w-full">
                                    <div className="relative">
                                        <img
                                            className="w-full h-[12rem] object-cover object-center"
                                            src={selectedBackgroundImage || formik.values.backgroundImage || ''}
                                            alt="BackgroundImage"
                                        />
                                        <input
                                            type="file"
                                            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                            name="backgroundImage"
                                            onChange={handleImageChange}
                                        />
                                    </div>

                                    <div className="w-full transform -translate-y-20 ml-4 h-[6rem]">
                                        <div className="relative">
                                            <Avatar
                                                sx={{ width: "10rem", height: "10rem", border: "4px solid white" }}
                                                src={selectedImage || formik.values.image || auth.user?.image || ''}
                                                alt=""
                                            />
                                            <input
                                                className="absolute top-0 left-0 w-[10rem] h-full opacity-0 cursor-pointer"
                                                onChange={handleImageChange}
                                                name="image"
                                                type="file"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <TextField
                                            fullWidth
                                            id="fullName"
                                            name="fullName"
                                            label="Full Name"
                                            value={formik.values.fullName}
                                            onChange={formik.handleChange}
                                            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                                            helperText={formik.touched.fullName && formik.errors.fullName}
                                        />
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={4}
                                            id="bio"
                                            name="bio"
                                            label="Bio"
                                            value={formik.values.bio}
                                            onChange={formik.handleChange}
                                            error={formik.touched.bio && Boolean(formik.errors.bio)}
                                            helperText={formik.touched.bio && formik.errors.bio}
                                        />
                                        <TextField
                                            fullWidth
                                            id="website"
                                            name="website"
                                            label="Website"
                                            value={formik.values.website}
                                            onChange={formik.handleChange}
                                            error={formik.touched.website && Boolean(formik.errors.website)}
                                            helperText={formik.touched.website && formik.errors.website}
                                        />
                                        <TextField
                                            fullWidth
                                            id="location"
                                            name="location"
                                            label="Location"
                                            value={formik.values.location}
                                            onChange={formik.handleChange}
                                            error={formik.touched.location && Boolean(formik.errors.location)}
                                            helperText={formik.touched.location && formik.errors.location}
                                        />
                                        <div className="my-3">
                                            <p className="text-lg">Birth date</p>
                                            <p className="text-2xl">October 26, 1999</p>
                                        </div>
                                        <p className="py-3 text-lg">Edit Professional Profile</p>
                                    </div>

                                </div>
                            </React.Fragment>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

export default ProfileModel;
