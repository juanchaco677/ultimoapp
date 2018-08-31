import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'page-facebook',
  templateUrl: 'facebook.html'
})
export class FacebookPage {
  my_url: any;
  url:string;
  constructor(private sanitize: DomSanitizer) {
   
  }  
  urlpaste(){
    this.url = "https://www.facebook.com/";
    return this.sanitize.bypassSecurityTrustResourceUrl(this.url);
  }
}
