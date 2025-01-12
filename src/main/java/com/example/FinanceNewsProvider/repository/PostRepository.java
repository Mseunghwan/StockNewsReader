package com.example.FinanceNewsProvider.repository;


import com.example.FinanceNewsProvider.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Integer> {
    // JpaRepository에서 기본적인 CRUD 메서드를 제공합니다 개꿀입니다
    // findAll(), findById(), save(), deleteById() 등
}