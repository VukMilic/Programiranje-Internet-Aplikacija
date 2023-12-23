import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ucenik',
  templateUrl: './ucenik.component.html',
  styleUrls: ['./ucenik.component.css']
})
export class UcenikComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

}
