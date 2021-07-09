import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";


import { Post } from "./posts/post";
import { map } from 'rxjs/operators'

import { Comment } from './comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  commentsCollection: AngularFirestoreCollection<Comment>;
  commentDoc: AngularFirestoreDocument<Comment>;
  constructor(private afs: AngularFirestore) {
    this.commentsCollection = this.afs.collection('comments', ref =>
      ref.orderBy('published', 'desc')
    );
  }

  getComments() {
    return this.commentsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Comment;
        const id = a.payload.doc.id;
        return { id, ...data };      
      })
    }))
  }

  createComment(data: Comment){
    this.commentsCollection.add(data);
  }

  getComment(id:string){
    return this.afs.doc<Comment>(`comments/${id}`);
  }

  deleteComment(id: string){
    console.log(id);
    
    return this.getComment(id).delete();
  }
}
