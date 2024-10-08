import { inject, Injectable } from '@angular/core';
import { collection, Firestore, doc, addDoc, collectionData, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  firestore = inject(Firestore);
  constructor(private toastr: ToastrService) { }

  saveData(data: any){
    const x = collection(this.firestore, 'categories');
    addDoc(x, data).then((docref) => {
      console.log(docref);
      this.toastr.success('Data inserted successfully..');
    })
      .catch((err) => console.log(err));
  }

  loadData(){
    const x = collection(this.firestore, 'categories');
    const categoryCollection:any = collectionData(x, { idField: 'id' }) as Observable<any>;
    return categoryCollection;
  }

  updateData(id:string,editData:object){
    const docRef = doc(this.firestore, `categories/${id}`);
    updateDoc(docRef,editData).then( docRef => {
      this.toastr.success('Entry updated successfully!');
    });
  }

  deleteData(id:string){
    const docRef = doc(this.firestore, `categories/${id}`);
    deleteDoc(docRef).then( docRef => {
      this.toastr.success('Entry deleted!');
    })
  }
}
