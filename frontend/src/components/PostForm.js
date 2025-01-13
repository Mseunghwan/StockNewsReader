import React, { useState } from 'react';  // React와 useState 훅 import
// Material-UI 컴포넌트들 import
import {
    Button,         // 버튼
    TextField,      // 입력 필드
    Dialog,         // 모달 창
    DialogTitle,    // 모달 제목
    DialogContent,  // 모달 내용
    DialogActions,  // 모달 하단 버튼 영역
    Box            // 레이아웃 컴포넌트
} from '@mui/material';

// props로 받는 값들:
// open: 모달 창 열림/닫힘 상태
// handleClose: 모달 닫기 함수
// handleSubmit: 폼 제출 처리 함수
// initialData: 수정 시 기존 게시글 데이터
const PostForm = ({ open, handleClose, handleSubmit, initialData }) => {
    // useState로 폼 데이터 상태 관리
    // initialData가 있으면(수정 시) 그 값을 사용, 없으면(새글 작성 시) 빈 값으로 초기화
    const [post, setPost] = useState(initialData || {
        title: '',
        content: '',
        author: ''
    });

    // 폼 제출 처리 함수
    const onSubmit = (e) => {
        e.preventDefault();         // 기본 폼 제출 동작 방지
        handleSubmit(post);        // 상위 컴포넌트의 제출 함수 호출
        handleClose();             // 모달 창 닫기
    };

    return (
        // Dialog: 모달 창 컴포넌트
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                {initialData ? '게시글 수정' : '새 게시글 작성'}
            </DialogTitle>
            <DialogContent>
                {/* 폼 컴포넌트 */}
                <Box component="form" onSubmit={onSubmit} sx={{ mt: 2 }}>
                    {/* 제목 입력 필드 */}
                    <TextField
                        fullWidth
                        label="제목"
                        margin="normal"
                        value={post.title}
                        onChange={(e) => setPost({...post, title: e.target.value})}
                        required
                    />
                    {/* 내용 입력 필드 */}
                    <TextField
                        fullWidth
                        label="내용"
                        margin="normal"
                        multiline         // 여러 줄 입력 가능
                        rows={4}          // 4줄 높이
                        value={post.content}
                        onChange={(e) => setPost({...post, content: e.target.value})}
                        required
                    />
                    {/* 작성자 입력 필드 */}
                    <TextField
                        fullWidth
                        label="작성자"
                        margin="normal"
                        value={post.author}
                        onChange={(e) => setPost({...post, author: e.target.value})}
                        required
                    />
                </Box>
            </DialogContent>
            {/* 버튼 영역 */}
            <DialogActions>
                <Button onClick={handleClose}>취소</Button>
                <Button onClick={onSubmit} variant="contained" color="primary">
                    {initialData ? '수정하기' : '작성하기'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PostForm;