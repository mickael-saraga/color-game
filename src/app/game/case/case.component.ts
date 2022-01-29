import { Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css']
})
export class CaseComponent implements OnInit {
  @HostBinding() className: string = '';
  @Input() color: string|null = '';
  @Output() colorChange: EventEmitter<string|null> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.className = 'card';
  }

  selectColor() {
    this.color = prompt('Entrer une couleur comme par exemple "red" ou avec son code "#F00"');
    this.colorChange.emit(this.color);
  }

}
