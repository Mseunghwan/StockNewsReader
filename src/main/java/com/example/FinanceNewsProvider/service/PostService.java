package com.example.FinanceNewsProvider.service;

import com.example.FinanceNewsProvider.entity.Post;
import com.example.FinanceNewsProvider.repository.PostRepository;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;

    @Transactional
    public Post createdPost(Post post){
        post.setCreatedAt(LocalDateTime.now());
        return postRepository.save(post);
    }

    @Transactional(readOnly=true)
    public List<Post> getAllPosts(){
        return postRepository.findAll();
    }

    @Transactional(readOnly=true)
    public Post getPostById(Integer id){
        return postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
    }

    @Transactional
    public Post updatePost(Integer id, Post postDetails){
        Post post = getPostById(id);
        post.setTitle(postDetails.getTitle());
        post.setContent(postDetails.getContent());
        post.setCreatedAt(LocalDateTime.now());
        return postRepository.save(post);
    }

    @Transactional
    public void deletePost(Integer id){
        postRepository.deleteById(id);
    }

}

