// import { Component, OnInit } from '@angular/core';
// import { Observable } from "rxjs";
// import { AuthService } from "src/app/core/auth.service";
// import { CommentService } from '../comment.service'
// import { PostService } from "../posts/post.service";
// import { AngularFireStorage } from "@angular/fire/storage";
// import { finalize } from "rxjs/operators";

// import { Comment } from '../comment'

// /**
//  * @title Dialog with header, scrollable content and actions
//  */
// @Component({
//   selector: 'app-dialog-box',
//   templateUrl: './dialog-box.component.html',
//   styleUrls: ['./dialog-box.component.css']
// })
// export class DialogBoxComponent {
//   title: string;
//   content: string;

//   boxButton: boolean = true;

//   comments: Observable<Comment[]>


//   constructor(
//     public auth: AuthService,
//     private commentService: CommentService,
//     private storage: AngularFireStorage,
//   ) {}

//   ngOnInit() {
//     this.comments = this.commentService.getComments();
//     console.log(this);
//   } 

//   createComment() {

//     const commentData = {
//       author: this.auth.authState.displayName || this.auth.authState.email,
//       authorId: this.auth.currentUserId,
//       content: this.content,
//       published: new Date()
//     };
//     this.commentService.createComment(commentData);
//     this.boxButton = !this.boxButton;
// }

//   toggleButton() {
//     this.boxButton = !this.boxButton;
//   }

// }