import { inject, Injectable } from '@angular/core';
import { ref, Storage, uploadBytesResumable } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  storage = inject(Storage);
  constructor() { }

  uploadFile(file: any) {
    // if (!input.files) return

    const filePath = `postIMG/${Date.now()}`;
    console.log(filePath);
    // const files: FileList = input.files;
    console.log(file);
    console.log(file.name);

    if (file) {
      const storageRef = ref(this.storage, filePath);
      uploadBytesResumable(storageRef, file);
    }

  }
}
