import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useDispatch, useSelector } from 'react-redux';
import { subscribeUser } from '../../Store/Twit/Action';

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
    borderRadius: 10,
    outline: "none"
};

const features = [
    "Prioritized ranking in conversations and search",
    "See approximately twice as many Tweets between ads in your for you and following timeline.",
    "Post longer video and 1080p video uploads.",
    "All the existing Blue_features, including Edit Tweet, Bookmarks Folders and early access to new features."
];

export default function SubscriptionModel({ handleClose, open }) {
    const dispatch = useDispatch();
    const { subscriptionLoading, subscriptionError } = useSelector((state) => state.auth);
    const [plan, setPlan] = React.useState("Annually");

    const handleSubscription = () => {
        const subscriptionData = {
            plan
        };
        dispatch(subscribeUser(subscriptionData));
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
                    <div className='flex items-center space-x-3'>
                        <IconButton onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <div className='flex justify-center py-10'>
                        <div className='w-[80%] space-y-10'>
                            <div className='p-5 rounded-md flex items-center justify-between bg-slate-400 shadow-lg'>
                                <h1 className='text-xl pr-5'>Blue tick with a verified number will get a subscription once approved.</h1>
                                <img className='w-24 h-24' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv6CEBObsZa5RkI_eVLNvFbxy_SCpTHMSa3A&s" />
                            </div>
                            <div className='flex justify-between border rounded-full px-5 py-3 border-gray-500'>
                                <div>
                                    <span onClick={() => setPlan("Annually")} className={`${plan === "Annually" ? "text-black" : "text-gray-400"} cursor-pointer`}>
                                        Annually
                                    </span>
                                    <span className='text-green-500 text-sm ml-5'>Save 12%</span>
                                </div>
                                <p onClick={() => setPlan("Monthly")} className={`${plan === "Monthly" ? "text-black" : "text-gray-400"} cursor-pointer`}>
                                    Monthly
                                </p>
                            </div>
                            <div className='space-y-3'>
                                {features.map((item, index) => (
                                    <div key={index} className='flex items-center space-x-5'>
                                        <FiberManualRecordIcon sx={{ width: "7px", height: "7px" }} />
                                        <p className='text-xs'>{item}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="cursor-pointer flex justify-center bg-gray-900 text-white rounded-full px-5 py-3" onClick={handleSubscription}>
                                <span className="line-through italic">₹7,800.00</span>
                                <span className="px-5">₹6,800/year</span>
                            </div>
                        </div>
                    </div>
                    {subscriptionLoading && <div>Loading...</div>}
                    {subscriptionError && <div>Error: {subscriptionError}</div>}
                </Box>
            </Modal>
        </div>
    );
}
