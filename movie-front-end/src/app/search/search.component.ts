import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls:[ './search.component.css']
})
export class SearchComponent {
  @Output() searchQuery = new EventEmitter<string>();
  searchTerm: string = '';

  onSearch() {
    this.searchQuery.emit(this.searchTerm);
  }

}
