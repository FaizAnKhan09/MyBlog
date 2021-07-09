import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";


import { Post } from "./posts/post";
import { map } from 'rxjs/operators'

import { Like } from './like';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  likesCollection: AngularFirestoreCollection<Like>;
  likeDoc: AngularFirestoreDocument<Like>;

  constructor(private afs: AngularFirestore) {
    this.likesCollection = this.afs.collection('likes', ref =>
      ref.orderBy('published', 'desc')
    );
   }

   getLikes() {
    return this.likesCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Like;
        const id = a.payload.doc.id;
        return { id, ...data };      
      })
    }))
  }

  createLike(data: Like){
    this.likesCollection.add(data);
  }

  getLike(id:string){
    return this.afs.doc<Like>(`likes/${id}`);
  }

  deleteLike(id: string){
    console.log(id);
    return this.getLike(id).delete();
  }
}
