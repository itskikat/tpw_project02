import {Component, OnInit} from '@angular/core';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  submitSearchQuery(data?) {
    if (data)
      Emitters.searchEmitter.emit(data.search);
    else
      Emitters.searchEmitter.emit('');

  }
}
