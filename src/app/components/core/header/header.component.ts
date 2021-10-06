import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public cours : any = [
    {
      id:1,
      title:"",
      description:"",
      date_start:"",
      duration:"",
      ended:false,
      classe:{
        id:"",
        title:""
      },
      subject:{

      },
      owner:{

      }
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
