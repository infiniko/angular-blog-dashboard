import { Component } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

  categoryArray: Array<any>;
  formCategory: string;
  categoryId: string;
  formStatus: string = 'Add';
  constructor(private categoryService: CategoriesService){}

  ngOnInit(){
    this.categoryService.loadData().subscribe((val:any) => {
      this.categoryArray = val;
    } )
  }
  onSubmit(formData: NgForm) {
    let categoryData: Category = {
      category: formData.value.category
    }
    if(this.formStatus == 'Add'){
      this.categoryService.saveData(categoryData);
      formData.reset();
    }
    else if(this.formStatus == 'Edit'){
      this.categoryService.updateData(this.categoryId,categoryData);
      formData.reset();
      this.formStatus = 'Add';
    }
   
  }
  onEdit(category:string, id:string){
    this.formCategory = category;
    this.formStatus = 'Edit';
    this.categoryId = id;
  }

  onDelete(id:string){
    this.categoryService.deleteData(id);
    
  }
}
