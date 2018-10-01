import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostServices } from "../services/post.services";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-post-list-component',
  templateUrl: './post-list-component.html',
  styleUrls: ['./post-list-component.scss'],
})
export class PostListComponent implements OnInit, OnDestroy {

  arrayPosts: any[];
  arrayPostsSubscription: Subscription;

  constructor(private postService: PostServices) { }

  ngOnInit() {
    this.arrayPostsSubscription = this.postService.postsSubject.subscribe(
      (arrayPosts: any[])=>{
        this.arrayPosts = arrayPosts;
      }
    );
    this.postService.emitPost();
  }
  
  love(a: number){
    this.postService.onLove(a);
  }
  dLove(b: number){
    this.postService.onDLove(b);
  }
  delPost(c: number){
    if(confirm("Attention, vous allez supprimer définitivement ce post !!!\nVoulez-vous continuer ?")){
      this.postService.deletePost(c);
    }
  }

  ngOnDestroy(){
    this.arrayPostsSubscription.unsubscribe();
  }
}
