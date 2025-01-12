import React, { useState } from 'react';
import {
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';

const PostForm = ({ open, handleClose, handleSubmit, initialData }) => {
    const [post, setPost] = useState(initialData || {
        title: '',
        content: '',
        author: ''
    });

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(post);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                {initialData ? 'Edit Post' : 'Create New Post'}
            </DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Title"
                    margin="normal"
                    value={post.title}
                    onChange={(e) => setPost({...post, title: e.target.value})}
                />
                <TextField
                    fullWidth
                    label="Content"
                    margin="normal"
                    multiline
                    rows={4}
                    value={post.content}
                    onChange={(e) => setPost({...post, content: e.target.value})}
                />
                <TextField
                    fullWidth
                    label="Author"
                    margin="normal"
                    value={post.author}
                    onChange={(e) => setPost({...post, author: e.target.value})}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={onSubmit} variant="contained" color="primary">
                    {initialData ? 'Update' : 'Create'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PostForm;