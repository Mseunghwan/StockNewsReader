import React, { useState, useEffect } from 'react';  // React와 훅들 import
// Material-UI 컴포넌트들 import
import {
    Box,
    Button,
    Paper,           // 카드 같은 elevation이 있는 컨테이너
    List,            // 목록 컴포넌트
    ListItem,        // 목록 항목
    ListItemText,    // 목록 항목 텍스트
    Typography,      // 텍스트 스타일링
    IconButton,      // 아이콘 버튼
} from '@mui/material';
// Material-UI 아이콘들 import
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';          // HTTP 요청 라이브러리
import PostForm from './PostForm';  // 게시글 작성/수정 폼

const PostList = () => {
    // 상태 관리
    const [posts, setPosts] = useState([]);              // 게시글 목록
    const [openForm, setOpenForm] = useState(false);     // 폼 모달 열림/닫힘
    const [selectedPost, setSelectedPost] = useState(null); // 선택된 게시글(수정 시)

    // 컴포넌트 마운트 시 게시글 목록 가져오기
    useEffect(() => {
        fetchPosts();
    }, []);

    // 게시글 목록 가져오기 함수
    const fetchPosts = async () => {
        try {
            const response = await axios.get('/api/posts');
            setPosts(response.data);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        }
    };

    // 게시글 저장/수정 처리 함수
    const handleSubmit = async (postData) => {
        try {
            if (selectedPost) {  // 수정
                await axios.put(`/api/posts/${selectedPost.id}`, postData);
            } else {            // 새글 작성
                await axios.post('/api/posts', postData);
            }
            fetchPosts();       // 목록 새로고침
            setSelectedPost(null);  // 선택된 게시글 초기화
        } catch (error) {
            console.error('Failed to save post:', error);
        }
    };

    // 게시글 삭제 처리 함수
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/posts/${id}`);
            fetchPosts();  // 목록 새로고침
        } catch (error) {
            console.error('Failed to delete post:', error);
        }
    };

    return (
        <Box>
            {/* 새 게시글 작성 버튼 */}
            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenForm(true)}
                sx={{ mb: 2 }}
            >
                새 게시글 작성
            </Button>

            {/* 게시글 목록 */}
            <Paper elevation={3}>
                <List>
                    {/* 각 게시글을 순회하며 표시 */}
                    {posts.map((post) => (
                        <ListItem
                            key={post.id}
                            divider
                            secondaryAction={  // 우측에 표시될 버튼들
                                <Box>
                                    {/* 수정 버튼 */}
                                    <IconButton onClick={() => {
                                        setSelectedPost(post);
                                        setOpenForm(true);
                                    }}>
                                        <EditIcon />
                                    </IconButton>
                                    {/* 삭제 버튼 */}
                                    <IconButton onClick={() => handleDelete(post.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            }
                        >
                            {/* 게시글 내용 */}
                            <ListItemText
                                primary={post.title}  // 제목
                                secondary={           // 내용과 메타 정보
                                    <>
                                        <Typography component="span" variant="body2">
                                            {post.content}
                                        </Typography>
                                        <br />
                                        <Typography component="span" variant="caption">
                                            작성자: {post.author} | 작성일: {new Date(post.createdAt).toLocaleString()}
                                        </Typography>
                                    </>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>

            {/* 게시글 작성/수정 폼 모달 */}
            <PostForm
                open={openForm}
                handleClose={() => {
                    setOpenForm(false);
                    setSelectedPost(null);
                }}
                handleSubmit={handleSubmit}
                initialData={selectedPost}
            />
        </Box>
    );
};

export default PostList;