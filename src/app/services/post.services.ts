import { Subject } from "rxjs";
import * as firebase from "firebase";
import DataSnapshot = firebase.database.DataSnapshot;


export class Post {
    title: string;
    content: string;
    loveIts: number;
    created_at: Date
  
    constructor(){
      this.created_at = new Date();
    }
  }

export class PostServices {

    arrayPosts: Post[] = [];
    postsSubject = new Subject<any[]>();

    constructor(){
        this.getPosts();
    }
    
    emitPost(){
        this.postsSubject.next(this.arrayPosts);
    }
    savePosts() {
        firebase.database().ref('/posts').set(this.arrayPosts);
    }
    getPosts() {
        firebase.database().ref('/posts').on('value', (list: DataSnapshot) => {
            this.arrayPosts = list.val() ? list.val() : [];
            this.emitPost();
        });
    }

    onLove(i: number){
        this.arrayPosts[i].loveIts += 1;
        this.savePosts();
        this.emitPost();
    }
    onDLove(j: number){
        this.arrayPosts[j].loveIts -= 1;
        this.savePosts();
        this.emitPost();
    }

    addPost(newTitle: string, newContent: string){
        const newPost = new Post();
        newPost.title = newTitle;
        newPost.content = newContent;
        newPost.loveIts = 0;
        this.arrayPosts.push(newPost);
        this.savePosts();
        this.emitPost();
    }
    deletePost(id: number){
        const index = this.arrayPosts.indexOf(this.arrayPosts[id]);
        if(index > 0 && index < this.arrayPosts.length - 1){
            const arrayPosts1 = this.arrayPosts.slice(0,id);
            const arrayPosts2 = this.arrayPosts.slice(id + 1,this.arrayPosts.length);
            this.arrayPosts = arrayPosts1.concat(arrayPosts2);
        }
        else if(index == 0){
            this.arrayPosts = this.arrayPosts.slice(1,this.arrayPosts.length);
        }
        else if(index == this.arrayPosts.length - 1){
            this.arrayPosts = this.arrayPosts.slice(0,this.arrayPosts.length - 1);
        }
        else{}
        this.savePosts();
        this.emitPost();
    }

}