import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
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
  constructor(private categoryService: CategoriesService){}

  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline'],        // Toggle buttons
      [{ 'header': 1 }, { 'header': 2 }],     // Custom dropdown
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image']                       // Link and image insertion
    ]
  };
  eplaceholder: string = "Enter your content here";
  ngOnInit(){
    this.categoryService.loadData().subscribe( val => {
      this.categories = val;
    })
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
}
