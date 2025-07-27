import React, { useState, useEffect } from "react";
import api from "../../config/api";
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  TextField,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import { Search } from "lucide-react";

const tabOptions = ["For You", "Trending", "News", "Entertainment"];

const Explore = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [tabTweets, setTabTweets] = useState([]);

  useEffect(() => {
    // Agar search chal raha hai to tab tweets na fetch karo
    if (searchQuery.trim() !== "") return;

    const fetchTabTweets = async () => {
      try {
        let url = "";
        let params = {};

        if (activeTab === 0) {
          // For You: viral tweets (most liked)
          url = "/api/twits/most-liked";
        } else if (activeTab === 1) {
          // Trending: tweets sorted by views desc
          url = "/api/twits/trending"; // backend se trending route banao, jo views ke basis par sort kare
        } else if (activeTab === 2) {
          // News: tweets with news category
          url = "/api/twits/category";
          params = { type: "news" };
        } else if (activeTab === 3) {
          // Entertainment: only tweets with videos from entertainment category
          url = "/api/twits/category";
          params = { type: "entertainment", videoOnly: true };
        } else {
          setTabTweets([]);
          return;
        }

        const res = await api.get(url, { params });
        setTabTweets(res.data);
      } catch (err) {
        console.error("Error fetching tab tweets:", err);
        setTabTweets([]);
      }
    };

    fetchTabTweets();
  }, [activeTab, searchQuery]);

  const handleSearch = async (e) => {
    const keyword = e.target.value;
    setSearchQuery(keyword);

    if (keyword.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const res = await api.get(`/api/twits/search?keyword=${keyword}`);
      setSearchResults(res.data);
    } catch (err) {
      console.error("Search error:", err);
      setSearchResults([]);
    }
  };

  const tweetsToShow = searchQuery.trim() !== "" ? searchResults : tabTweets;

  return (
    <Container maxWidth="sm" style={{ paddingTop: "20px" }}>
      {/* Search Bar */}
      <Box display="flex" alignItems="center" gap={1} mb={3}>
        <Search size={20} />
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search tweets or users..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </Box>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onChange={(e, newVal) => setActiveTab(newVal)}
        textColor="primary"
        indicatorColor="primary"
        variant="scrollable"
      >
        {tabOptions.map((tab, idx) => (
          <Tab label={tab} key={idx} />
        ))}
      </Tabs>

      {/* Tweets Section */}
      {tweetsToShow.length > 0 ? (
        <Box mt={3}>
          {searchQuery.trim() !== "" && (
            <Typography variant="h6">Search Results</Typography>
          )}
          {activeTab === 0 && searchQuery.trim() === "" && (
            <Typography variant="h6">For You - Viral Tweets</Typography>
          )}
          {activeTab === 1 && searchQuery.trim() === "" && (
            <Typography variant="h6">Trending - Most Viewed Tweets</Typography>
          )}
          {activeTab === 2 && searchQuery.trim() === "" && (
            <Typography variant="h6">News</Typography>
          )}
          {activeTab === 3 && searchQuery.trim() === "" && (
            <Typography variant="h6">Entertainment (Videos Only)</Typography>
          )}

          {tweetsToShow.map((tweet) => (
            <Card
              key={tweet.id}
              sx={{ mt: 2, cursor: "pointer" }}
              onClick={() => window.location.href = `/twit/${tweet.id}`} // tweet detail page
            >
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar
                    src={
                      tweet.user.image?.startsWith("http")
                        ? tweet.user.image
                        : `/uploads/${tweet.user.image || "default-avatar.png"}`
                    }
                    alt={tweet.user.fullName}
                  />
                  <Typography>{tweet.user.fullName}</Typography>
                </Box>
                <Typography mt={1}>{tweet.content}</Typography>

                {tweet.image && (
                  <img
                    src={tweet.image}
                    alt="img"
                    style={{ width: "100%", borderRadius: 8, marginTop: 10 }}
                  />
                )}

                {tweet.video && (
                  <video
                    controls
                    style={{ width: "100%", borderRadius: 8, marginTop: 10 }}
                  >
                    <source src={tweet.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}

                {/* Likes, Comments, Views below */}
                <Box
                  display="flex"
                  gap={3}
                  mt={2}
                  color="gray"
                  fontSize={14}
                  justifyContent="flex-start"
                >
                  <Typography>{tweet.totalLikes || 0} Likes</Typography>
                  <Typography>{tweet.totalComments || 0} Comments</Typography>
                  <Typography>{tweet.views || 0} Views</Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Box mt={4}>
          <Typography variant="h6" textAlign="center">
            {searchQuery.trim() !== ""
              ? "No Search Results Found"
              : `${tabOptions[activeTab]} Section Coming Soon!`}
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Explore;
