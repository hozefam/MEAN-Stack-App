import { PostsService } from './../../posts/posts.service';
import { Post } from './../post.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  public isLoading = false;
  private postsSub: Subscription;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService.getPosts();
    this.isLoading = true;
    this.postsSub = this.postsService
      .getPostsUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  onDelete(postId) {
    this.postsService.deletePost(postId);
  }
}
