import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  selectedFile: File | undefined;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }
  
    const formData: FormData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    console.log(formData);
  
    this.http.post('/fsacnotif/traitementfile', formData)
      .subscribe(
        (response) => {
          console.log('File uploaded successfully');
        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
  }
  
}
