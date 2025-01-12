package com.example.FinanceNewsProvider.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data               // getter, setter, toString 등을 자동으로 생성
@Entity             // JPA 엔티티임을 나타냄
@Table(name = "posts") // 실제 DB 테이블 이름 지정
@Builder            // 빌더 패턴 구현
@NoArgsConstructor  // 매개변수 없는 생성자
@AllArgsConstructor // 모든 필드를 매개변수로 받는 생성자
public class Post {
    @Id // 기본키 지정
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본키 생성 전략 설정
    private Integer id;

    @Column(length=255, nullable=false) // 칼럼 속성 정의
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(length=255, nullable = false)
    private String author;

    @Column(name="created_at")
    private LocalDateTime createdAt;
}
