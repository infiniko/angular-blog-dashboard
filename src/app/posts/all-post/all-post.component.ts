import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrl: './all-post.component.css'
})
export class AllPostComponent {

  postArray: Array<any>;
  constructor(private postsService: PostsService){}

  ngOnInit(){
    this.postsService.loadData().subscribe( val => {
      console.log(val);
      this.postArray = val;
    })
  }
}
