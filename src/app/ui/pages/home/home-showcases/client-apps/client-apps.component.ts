import { ScrollDispatcher, ViewportRuler } from '@angular/cdk/scrolling';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDialog } from '@angular/material/dialog';
import {
  distinctUntilChanged,
  map,
  Observable,
  ReplaySubject,
  scan,
  startWith,
  switchMap,
  takeUntil,
  takeWhile,
} from 'rxjs';
import {
  TRANSITION_TEXT,
  TRANSITION_IMAGE_SCALE,
} from 'src/app/ui/animations/transitions/transitions.constants';
import { UiUtilsView } from 'src/app/ui/utils/views.utils';
import { AppItemDialog } from '../modal/app-item-dialog';

@Component({
  selector: 'app-client-apps',
  templateUrl: './client-apps.component.html',
  styleUrls: ['./client-apps.component.scss'],
  animations: [TRANSITION_TEXT, TRANSITION_IMAGE_SCALE],
})
export class ClientAppsComponent implements OnInit {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  mOnceAnimated = false;
  _mTriggerAnim? = 'false';
  _mThreshold = 0.4;
  @ViewChild('animRefView') vAnimRefView?: ElementRef<HTMLElement>;

  constructor(
    public el: ElementRef,
    private _ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    public mediaObserver: MediaObserver,
    private scroll: ScrollDispatcher,
    private viewPortRuler: ViewportRuler
  ) {}

  ngOnInit(): void {}

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
        // Makes sure to dispose on destroy
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
        // Distinct the resulting triggers
        distinctUntilChanged(),
        // Stop taking the first on trigger when aosOnce is set
        takeWhile((trigger) => {
          // console.info("app-item  !trigger || !this.mOnceAnimated",
          //   !trigger || !this.mOnceAnimated)

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

  _mClientApps = [
    {
      id: 'LOLC',
      name: 'LOLC One Click',
      image: 'assets/projects/lolcHome.png',
      link: 'https://play.google.com/store/apps/details?id=com.pepstudy.pepplus',
      tab: 'Android & iOS',
      color: '#ffffff',
    },

    {
      id: 'ASSESSOR',
      name: 'WhichOne Shop: Amazon Flipkart',
      image: 'assets/projects/insureHome.png',
      link: 'https://play.google.com/store/apps/details?id=com.whichone',
      tab: 'Flutter',
    },
    {
      id: 'INSURE',
      name: 'Aabboo - Anonymous Chat Rooms',
      image: 'assets/projects/assessorHome.png',
      link: 'https://play.google.com/store/apps/details?id=com.aabboo.social',
      tab: 'Android',
    },
    {
      id: 'LIFE',
      name: 'Aabboo - Anonymous Chat Rooms',
      image: 'assets/projects/lifeAppHome.png',
      link: 'https://play.google.com/store/apps/details?id=com.aabboo.social',
      tab: 'Android',
    },
  ];
}
