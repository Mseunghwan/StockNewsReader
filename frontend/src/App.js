// 메인 컴포넌트 파일 App.js
import React from 'react';
// Material-UI 테마 관련 import
import { ThemeProvider, createTheme } from '@mui/material/styles';
// Material-UI 컴포넌트들 import
import {
    Container,
    CssBaseline,    // CSS 초기화
    AppBar,         // 상단 네비게이션 바
    Toolbar,        // AppBar 내부 컨텐츠 영역
    Typography,     // 텍스트 표시 컴포넌트
    Box            // div와 비슷한 레이아웃 컴포넌트
} from '@mui/material';
import PostList from './components/PostList';  // 게시글 목록 컴포넌트

// Material-UI 기본 테마 생성
const theme = createTheme();

function App() {
    return (
        // ThemeProvider로 테마 적용
        <ThemeProvider theme={theme}>
            {/* CssBaseline: CSS 초기화 */}
            <CssBaseline />
            {/* Box: 전체 레이아웃을 감싸는 컨테이너 */}
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                {/* AppBar: 상단 네비게이션 바 */}
                <AppBar position="static">
                    <Toolbar>
                        {/* Typography: 텍스트 스타일링 */}
                        <Typography variant="h6">
                            게시판
                        </Typography>
                    </Toolbar>
                </AppBar>
                {/* Container: 내용을 중앙에 배치하는 컨테이너 */}
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <PostList />  {/* 게시글 목록 표시 */}
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default App;  // 다른 파일에서 import할 수 있도록 내보내기
