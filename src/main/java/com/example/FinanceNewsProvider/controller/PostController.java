package com.example.FinanceNewsProvider.controller;

import com.example.FinanceNewsProvider.entity.Post;
import com.example.FinanceNewsProvider.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController                 // REST API 컨트롤러임을 나타냄 --> 차후 글 작성
@RequestMapping("/api/posts")   // 기본 URL 경로 설정
@RequiredArgsConstructor        // final 필드에 대한 생성자 자동 생성
@CrossOrigin(origins = "http://localhost:3000") // React 앱과의 CORS 설정
public class PostController {
    private final PostService postService;


    // 게시글 생성 기능
    @PostMapping
    public ResponseEntity<Post> createpost(@RequestBody Post post) {
        Post createdPost = postService.createdPost(post);
        return new ResponseEntity<>(createdPost, HttpStatus.CREATED);
    }

    // 모든 게시글 조회 기능
    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }

    // 특정 게시글 조회 기능
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Integer id){
        Post post = postService.getPostById(id);
        return ResponseEntity.ok(post);
    }

    // 게시글 수정 기능
    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable Integer id,
                                           @RequestBody Post post) {
        Post updatedPost = postService.updatePost(id, post);
        return ResponseEntity.ok(updatedPost);
    }

    // 게시글 삭제 기능
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Integer id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }
}
