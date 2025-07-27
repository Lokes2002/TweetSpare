import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailIcon from '@mui/icons-material/Mail';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GroupIcon from '@mui/icons-material/Group';
import VerifiedIcon from '@mui/icons-material/Verified';
import PersonIcon from '@mui/icons-material/Person';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export const navigationMenu = (user) => [
  { title: "Home", icon: <HomeIcon />, path: "/home" },
  { title: "Explore", icon: <ExploreIcon />, path: "/explore" },
  { title: "Notifications", icon: <NotificationsIcon />, path: "/notifications" },
  { title: "Messages", icon: <MailIcon />, path: "/messages" },
  { title: "Lists", icon: <ListAltIcon />, path: user?.id ? `/lists/${user.id}` : "/lists" },
  { title: "Communities", icon: <GroupIcon />, path: "/communities" },
  { title: "Verified", icon: <VerifiedIcon />, path: "/verified" },
  { title: "Profile", icon: <PersonIcon />, path: user?.id ? `/profile/${user.id}` : "/profile" },
  { title: "More", icon: <MoreHorizIcon />, path: "/more" },
];
