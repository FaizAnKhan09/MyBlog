import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/core/auth.service";
import { PostService } from "../post.service";
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-post-dashboard",
  templateUrl: "./post-dashboard.component.html",
  styleUrls: ["./post-dashboard.component.css"],
})
export class PostDashboardComponent implements OnInit {
  title: string;
  image: string = null;
  content: string;

  buttonText: string = "Create Post";

  uploadPercent: Observable<number>;
  downloadUrl: Observable<string>;

  constructor(
    private auth: AuthService,
    private postService: PostService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {}

  createPost() {
    const data = {
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.currentUserId,
      content: this.content,
      image: this.image,
      published: new Date(),
      title: this.title,
    };
    this.postService.create(data);
    this.title = "";
    this.content = "";
    this.buttonText = "Post Created!";
    setTimeout(() => (this.buttonText = "Create Post"), 3000);
  }

  uploadImage(event) {
    const file = event.target.files[0];
    const path = `posts/${file.name}`;
    // console.log(event.target.files);
    if (file.type.split("/")[0] !== "image") {
      return alert("Only Image Files!");
    } else {
      const task = this.storage.upload(path, file);
      console.log(task)
      const ref = this.storage.ref(path);
      this.uploadPercent = task.percentageChanges();
      console.log("Image Uploaded!");
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.downloadUrl = ref.getDownloadURL();
            this.downloadUrl.subscribe((url) => (this.image = url));
          })
        )
        .subscribe();

      this.uploadPercent = task.percentageChanges();
      console.log("Image Uploaded!");
      console.log(this.image);
    }
  }
}
