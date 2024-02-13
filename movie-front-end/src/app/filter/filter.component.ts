import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Genre } from '../models/genre';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent implements OnInit{
  @Input()
  genres:Genre[]=[]; 

  @Input()
  selectedGenres:Set<string>=new Set<string>();
  
  ngOnInit(): void {
    
  }

  @Output() GenreEvent=new EventEmitter<Set<string>>();

  toggleCategory(genre:Genre){
    if(this.selectedGenres.has(genre.id)){
      this.selectedGenres.delete(genre.id);
    }
    else{
      this.selectedGenres.add(genre.id);
    }

    this.GenreEvent.emit(this.selectedGenres);
  }



}
