import React, { useState, useEffect } from 'react';
import {
    List,
    ListItem,
    ListItemText,
    IconButton,
    Typography,
    Button,
    Paper
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import postService from '../services/postService';
import PostForm from './PostForm';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const fetchPosts = async () => {
        const data = await postService.getAllPosts();
        setPosts(data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleCreatePost = async (newPost) => {
        await postService.createPost(newPost);
        fetchPosts();
    };

    const handleUpdatePost = async (post) => {
        await postService.updatePost(post.id, post);
        fetchPosts();
        setSelectedPost(null);
    };

    const handleDeletePost = async (id) => {
        await postService.deletePost(id);
        fetchPosts();
    };

    return (
        <Paper elevation={3} sx={{ p: 2, m: 2 }}>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenForm(true)}
                sx={{ mb: 2 }}
            >
                Create New Post
            </Button>

            <List>
                {posts.map((post) => (
                    <ListItem
                        key={post.id}
                        secondaryAction={
                            <>
                                <IconButton
                                    edge="end"
                                    onClick={() => {
                                        setSelectedPost(post);
                                        setOpenForm(true);
                                    }}
                                >
                                    <Edit />
                                </IconButton>
                                <IconButton
                                    edge="end"
                                    onClick={() => handleDeletePost(post.id)}
                                >
                                    <Delete />
                                </IconButton>
                            </>
                        }
                    >
                        <ListItemText
                            primary={post.title}
                            secondary={
                                <>
                                    <Typography variant="body2">
                                        {post.content}
                                    </Typography>
                                    <Typography variant="caption">
                                        By {post.author} | {new Date(post.createdAt).toLocaleString()}
                                    </Typography>
                                </>
                            }
                        />
                    </ListItem>
                ))}
            </List>

            <PostForm
                open={openForm}
                handleClose={() => {
                    setOpenForm(false);
                    setSelectedPost(null);
                }}
                handleSubmit={selectedPost ? handleUpdatePost : handleCreatePost}
                initialData={selectedPost}
            />
        </Paper>
    );
};

export default PostList;