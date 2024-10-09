import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { Post } from '../../models/post';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent {

  permalink: string = '';
  imgSrc: any = '/assets/placeholder.png';
  selectedImg: any;
  categories: Array<any>;
  postForm: FormGroup;
  editPost: any;
  formStatus: string = 'Add new';
  docId: any;

  constructor(
    private categoryService: CategoriesService,
    private fb: FormBuilder,
    private postsService: PostsService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((val) => {

      this.docId = val.id;

      ///Edit
      if (val.id) {
        this.postsService.loadOneDoc(val.id).subscribe(post => {

          this.editPost = post;
          this.postForm = this.fb.group({
            title: [this.editPost.title, [Validators.required, Validators.minLength(5)]],
            permalink: [{ value: this.editPost.permalink, disabled: true }],
            excerpt: [this.editPost.excerpt, [Validators.required, Validators.minLength(10)]],
            category: [`${this.editPost.category.category}--${this.editPost.category.categoryId}`, Validators.required],
            postImg: ['', Validators.required],
            content: [this.editPost.content, Validators.required]
          })

          this.imgSrc = this.editPost.postImgPath;
          this.formStatus = 'Edit';
        })
      }
      else {
        /// Add 
        this.postForm = this.fb.group({
          title: ['', [Validators.required, Validators.minLength(5)]],
          permalink: [{ value: '', disabled: true }],
          excerpt: ['', [Validators.required, Validators.minLength(10)]],
          category: [``, Validators.required],
          postImg: ['', Validators.required],
          content: ['', Validators.required]
        })
      }

    })
  }

  eplaceholder: string = "Enter your content here";
  ngOnInit() {
    this.categoryService.loadData().subscribe(val => {
      this.categories = val;
    })
  }

  get fc() {
    return this.postForm.controls;
  }

  //// creating permalink without spaces
  onTitleChange($event) {
    let title = $event.target.value;
    this.permalink = title.replace(/\s/g, '-');
  }

  showPreview($event: any) {
    // read image through upload
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result
    }
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];
  }

  onSubmitForm() {

    let splitValue = this.postForm.value.category.split('--');
    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: splitValue[1],
        category: splitValue[0]
      },
      postImgPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'NEW',
      createdAt: new Date()
    }

    this.postsService.uploadFile(this.selectedImg, postData, this.formStatus, this.docId);
    this.postForm.reset();
    this.imgSrc = '/assets/placeholder.png';
  }
}
