import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';

import { Post } from '../post';
import { AuthService } from 'src/app/core/auth.service';

import { CommentService } from './../../comment.service';
import { LikeService } from './../../like.service';
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";

import { Observable } from "rxjs";

import { Comment } from './../../comment';
import { Like } from './../../like';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  post: Post;

  comments: Observable<Comment[]>

  likes : Observable<Like[]>

  // getLike= this.likes.subscrbe

  editing: boolean = false;

  title: string;
  content: string;
  postId: string;

  boxButton: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    public auth: AuthService,
    private commentService: CommentService,
    private likeService: LikeService
    ) { }

  ngOnInit() {
    this.getPost()
    console.log(this);  

    this.comments = this.commentService.getComments();
    console.log(this);
    
  }

  getPost() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.postId = id;
    console.log(this.postId);
    
    return this.postService.getPostData(id).subscribe(data => this.post = data)
  }

  updatePost(){
    const formData = {
      content: this.post.content
    }
    const id = this.route.snapshot.paramMap.get('id');
    this.postService.update(id, formData);
    this.editing = false;
  }

  delete() {
    const id = this.route.snapshot.paramMap.get('id');
    this.postService.delete(id);
    this.router.navigate(["/blog"])
  }

  createComment() {

    const commentData = {
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.currentUserId,
      postId: this.postId,
      content: this.content,
      published: new Date()
    };
    this.commentService.createComment(commentData);
    this.content = '';
    this.boxButton = !this.boxButton;
}

  toggleButton() {
    this.boxButton = !this.boxButton;
  }

  deleteComment(id:string) {
    // const commentId = this.route.snapshot.paramMap.get('id');
    this.commentService.deleteComment(id);
    console.log(id);
  }

  createLike(){
    const likeData = {
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.currentUserId,
      postId: this.postId
    };
    this.likeService.createLike(likeData);
    this.content = '';
    this.boxButton = !this.boxButton;
  }

  deleteLike(id:string) {
    // const commentId = this.route.snapshot.paramMap.get('id');
    this.likeService.deleteLike(id);
    console.log(id);
  }

}
