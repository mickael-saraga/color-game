import { AfterContentInit, Directive, ElementRef, OnInit, Renderer2 } from "@angular/core";

@Directive({
  selector: '[inputForControl]'
})
export class InputFormControlDirective implements OnInit, AfterContentInit {

  constructor(protected elementRef: ElementRef,
              protected renderer: Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
      this.renderer.addClass(this.elementRef.nativeElement, 'form-control');
  }

}
