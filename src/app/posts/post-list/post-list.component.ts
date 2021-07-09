import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { AuthService } from 'src/app/core/auth.service';


import { Post } from '../post';
import { PostService } from '../post.service';

import {MatDialog} from '@angular/material/dialog';
// import { DialogBoxComponent } from 'src/app/dialog-box/dialog-box.component';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Observable<Post[]>

  constructor(private postService: PostService, public auth: AuthService, public dialog: MatDialog) { }
 
  ngOnInit() {
    this.posts = this.postService.getPosts();
    console.log(this);
  } 
  

  delete(id: string){
    this.postService.delete(id);
  }
  // openDialog() {
  //   const dialogRef = this.dialog.open(DialogBoxComponent);

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }
}
