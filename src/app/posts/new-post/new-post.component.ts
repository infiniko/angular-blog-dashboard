import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms'; 
import { CategoriesService } from '../../services/categories.service';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent {

  permalink: string = '';
  imgSrc: any = '/assets/placeholder.png';
  selectedImg:any;
  categories: Array<any>;
  postForm: FormGroup;

  constructor(private categoryService: CategoriesService, private fb: FormBuilder){
    this.postForm = this.fb.group({
      title: ['',[Validators.required, Validators.minLength(5)]],
      permaLink: [{value:'',disabled:true}],
      excerpt: ['',[Validators.required, Validators.minLength(10)]],
      category: ['',Validators.required],
      postImg: ['',Validators.required],
      content: ['',Validators.required]
    })

  }

  eplaceholder: string = "Enter your content here";
  ngOnInit(){
    this.categoryService.loadData().subscribe( val => {
      this.categories = val;
    })
  }

    get fc(){
      return this.postForm.controls;    
    }
  onTitleChange($event){
    let title = $event.target.value;
    this.permalink = title.replace(/\s/g,'-');
  }

  showPreview($event: any){
    // read image through upload
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result
    }
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];
  }

  onSumbitForm(){
    
  }
}
