import { Directive, ElementRef, Input, NgModule, OnDestroy, OnInit } from "@angular/core";
import { enhanceButton } from "@chamfer/behavior";

@Directive({
  selector: "[chamferButton]"
})
export class ChamferButtonDirective implements OnInit, OnDestroy {
  @Input() chamferRipple = true;
  private enhancement?: ReturnType<typeof enhanceButton>;

  constructor(private readonly elementRef: ElementRef<HTMLButtonElement>) {}

  ngOnInit(): void {
    if (this.chamferRipple) {
      this.enhancement = enhanceButton(this.elementRef.nativeElement, {
        ripple: this.chamferRipple
      });
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
