import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://codebuddy.review/posts");
        const data = await response.json();
        setPosts(data?.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="m-6 rounded-lg bg-gray-50 p-7 text-gray-900 shadow-lg">
      <h1 className="mb-7 text-4xl font-bold">Posts</h1>
      <Link to="/" className="mb-4 flex items-center text-blue-600 hover:underline">
        <Icon icon="mdi:arrow-left" className="mr-2" />
        Back to Home
      </Link>

      {/* <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-7 shadow-lg">
          <h2 className="text-2xl font-bold">Post 1</h2>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo voluptatem, quibusdam,
            quos, voluptatum voluptas quod quas voluptates quia doloribus nobis voluptatibus. Quam,
            voluptate voluptatum. Quod, voluptate? Quisquam, voluptate voluptatum.
          </p>
        </div>
        <div className="rounded-lg bg-white p-7 shadow-lg">
          <h2 className="text-2xl font-bold">Post 2</h2>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo voluptatem, quibusdam,
            quos, voluptatum voluptas quod quas voluptates quia doloribus nobis voluptatibus. Quam,
            voluptate voluptatum. Quod, voluptate? Quisquam, voluptate voluptatum.
          </p>
        </div>
        <div className="rounded-lg bg-white p-7 shadow-lg">
          <h2 className="text-2xl font-bold">Post 3</h2>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo voluptatem, quibusdam,
            quos, voluptatum voluptas quod quas voluptates quia doloribus nobis voluptatibus. Quam,
            voluptate voluptatum. Quod, voluptate? Quisquam, voluptate voluptatum.
          </p>
        </div>
      </div> */}

      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid container spacing={2}>
          {posts?.map((post) => (
            <Grid
              item
              xs={12} // 1 post per row on small screens
              sm={6} // 2 posts per row on medium screens
              lg={4} // 3 posts per row on large screens
              key={post?.id}
            >
              <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <CardMedia component="img" height="140" image={post?.image} alt={post?.writeup} />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {post?.firstName} {post?.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post?.writeup}
                  </Typography>
                  <Box
                    component="img"
                    src={post?.avatar}
                    alt={`${post?.firstName}'s avatar`}
                    sx={{ borderRadius: "50%", width: 50, height: 50, marginTop: 1 }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Posts;
