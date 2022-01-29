import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  table: Array<Array<string|null>> = [];

  rowNumbers: number[] = [];
  colNumbers: number[] = [];

  rowsControl = new FormControl(3, [
      Validators.required,
      Validators.minLength(1)
  ]);
  colsControl = new FormControl(6, [
      Validators.required,
      Validators.minLength(1)
  ]);

  gridForm = new FormGroup({
    'rows': this.rowsControl,
    'cols': this.colsControl
  });

  constructor() { }

  ngOnInit(): void {
    this.gridForm.valueChanges.pipe(throttleTime(500))
                 .subscribe((grid: { rows: number, cols: number }) => {
                   if (this.gridForm.valid) {
                     this.drawGrid(grid);
                   }
                 });
  }

  drawGrid(grid: { rows: number, cols: number }) {
    this.table = [];
    this.rowNumbers = [...Array(grid.rows).keys()];
    this.colNumbers = [...Array(grid.cols).keys()];
    // this.table = [[...this.rowNumbers.map(n => n.toString())], [...this.colNumbers.map(n => n.toString())]];
    this.table = Array.from(Array(grid.rows), () => new Array(grid.cols));
  }

  onColorChange(event: any) {
    console.log(event)
  }

}
