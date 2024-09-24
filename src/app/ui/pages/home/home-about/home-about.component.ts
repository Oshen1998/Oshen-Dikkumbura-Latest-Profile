import { ScrollDispatcher, ViewportRuler } from '@angular/cdk/scrolling';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import {
  takeUntil,
  startWith,
  map,
  scan,
  distinctUntilChanged,
  takeWhile,
  switchMap,
  Observable,
  ReplaySubject,
} from 'rxjs';
import {
  ENTER_SCALE,
  TRANSITION_AREA_SLIDE,
  TRANSITION_IMAGE_SCALE,
  TRANSITION_TEXT,
} from 'src/app/ui/animations/transitions/transitions.constants';
import { UiUtilsView } from 'src/app/ui/utils/views.utils';
import '@google/model-viewer';

@Component({
  selector: 'app-home-about',
  templateUrl: './home-about.component.html',
  styleUrls: ['./home-about.component.scss'],
  animations: [
    TRANSITION_TEXT,
    TRANSITION_AREA_SLIDE,
    TRANSITION_IMAGE_SCALE,
    ENTER_SCALE,
  ],
})
export class HomeAboutComponent implements OnInit {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  mOnceAnimated = false;
  public experienceYears = 2;
  cameraOrbit = '45deg 55deg 3.5m';
  src = 'https://models.readyplayer.me/66f1847d738da8b76e5de0fc.glb';
  src2 = 'assets/glb/oshen.glb';

  _mTriggerAnim? = 'false';

  _mTriggerImage? = 'false';

  _mThreshold = 0.2;

  @ViewChild('animRefView') vAnimRefView?: ElementRef<HTMLElement>;

  constructor(
    public el: ElementRef,
    private _ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    public mediaObserver: MediaObserver,
    private scroll: ScrollDispatcher,
    private viewPortRuler: ViewportRuler
  ) {}

  ngOnInit(): void {
    this.experienceYears = this.calculateExp(new Date('2021-08-30'));
  }

  private calculateExp(birthday: Date): number {
    const ageDifMs: number = Date.now() - birthday.getTime();
    const ageDate: Date = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  ngAfterViewInit(): void {
    this.setupAnimation();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  public setupAnimation() {
    if (!this.vAnimRefView) return;

    this.scroll
      .ancestorScrolled(this.vAnimRefView, 100)
      .pipe(
        takeUntil(this.destroyed$),
        startWith(0),
        map(() => {
          if (this.vAnimRefView != null) {
            var visibility = UiUtilsView.getVisibility(
              this.vAnimRefView,
              this.viewPortRuler
            );
            return visibility;
          }
          return 0;
        }),
        scan<number, boolean>(
          (acc: number | boolean, val: number) =>
            val >= this._mThreshold || (acc ? val > 0 : false)
        ),
        distinctUntilChanged(),
        takeWhile((trigger) => {
          return !trigger || !this.mOnceAnimated;
        }, true),
        switchMap(
          (trigger) =>
            new Observable<number | boolean>((observer) =>
              this._ngZone.run(() => observer.next(trigger))
            )
        )
      )
      .subscribe((val) => {
        if (this.mOnceAnimated) {
          return;
        }

        if (val) {
          this.mOnceAnimated = true;
          this._mTriggerAnim = 'true';
          this.cdr.detectChanges();
        }
      });
  }
}
