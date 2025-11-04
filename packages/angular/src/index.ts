import { Directive, ElementRef, Input, NgModule, OnDestroy, OnInit } from "@angular/core";

import { enhanceButton } from "@chamfer/behavior";

@Directive({
  selector: "[chamferButton]",
  host: {
    "data-ch-component": "button",
    class: "ch-button"
  }
})
export class ChamferButtonDirective implements OnInit, OnDestroy {
  @Input() chamferRipple: boolean = true;
  private enhancement?: ReturnType<typeof enhanceButton>;

  constructor(private readonly elementRef: ElementRef<HTMLButtonElement>) {}

  ngOnInit(): void {
    if (this.chamferRipple !== false) {
      this.enhancement = enhanceButton(this.elementRef.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.enhancement?.destroy();
  }
}

@NgModule({
  declarations: [ChamferButtonDirective],
  exports: [ChamferButtonDirective]
})
export class ChamferButtonModule {}

export const CHAMFER_ANGULAR_VERSION = "0.0.0";
