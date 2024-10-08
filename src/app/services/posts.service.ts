import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  storage = inject(Storage);
  firestore = inject(Firestore);
  constructor(private toastr: ToastrService, private router: Router) { }

  uploadFile(file: any, postData: any) {
    const filePath = `postIMG/img_${Date.now()}`;
    if (file) {
      const storageRef = ref(this.storage, filePath);
      uploadBytesResumable(storageRef, file).then(() => {
        console.log("img uploaded");
        getDownloadURL(storageRef).then((url) => {
          postData.postImgPath = url;
          this.saveData(postData);
        })
      })
    }
  }

  saveData(postData: any) {
    const x = collection(this.firestore, 'posts');
    addDoc(x, postData).then((docref) => {
      this.toastr.success('Post saved successfully..');
      this.router.navigate(['/posts']);
    })
      .catch((err) => console.log(err));
  }

  loadData(){
    const x = collection(this.firestore, 'posts');
    const postCollection:any = collectionData(x, { idField: 'id' }) as Observable<any>;
    return postCollection;
  }

  loadOneDoc(id:any){
    const docRef = doc(this.firestore, `posts/${id}`);
    return docData(docRef);
  }

  updateData(id, postData){
    const docRef = doc(this.firestore, `posts/${id}`);
    updateDoc(docRef,postData).then( docRef => {
      this.toastr.success('Post updated successfully!');
    });
  }
}
