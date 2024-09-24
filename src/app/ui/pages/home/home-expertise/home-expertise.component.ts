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
  ReplaySubject,
  takeUntil,
  startWith,
  map,
  scan,
  distinctUntilChanged,
  takeWhile,
  switchMap,
  Observable,
} from 'rxjs';
import {
  TRANSITION_IMAGE_SCALE,
  TRANSITION_TEXT,
} from 'src/app/ui/animations/transitions/transitions.constants';
import { UiUtilsView } from 'src/app/ui/utils/views.utils';

@Component({
  selector: 'app-home-expertise',
  templateUrl: './home-expertise.component.html',
  styleUrls: ['./home-expertise.component.scss'],
  animations: [TRANSITION_TEXT, TRANSITION_IMAGE_SCALE],
})
export class HomeExpertiseComponent implements OnInit {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  mOnceAnimated = false;
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

  _mTools = [
    {
      id: '91210',
      name: 'React Native',
      logo: 'assets/img/tools/android.svg',
      link: 'https://reactnative.dev/',
      tab: 'android',
      color: '#232565',
    },
    {
      id: '9116',
      name: 'Kotlin',
      logo: 'assets/img/tools/kotlin-logo.png',
      link: 'https://kotlinlang.org/',
      tab: 'android',
    },
    {
      id: '8101',
      name: 'Angular',
      logo: 'assets/img/tools/angular.png',
      link: 'https://angular.io/',
      tab: 'web',
      color: '#FF4369',
    },
    {
      id: '7121',
      name: 'Express',
      logo: 'assets/img/tools/express.png',
      link: 'https://expressjs.com/',
      tab: 'back-end',
    },
    {
      id: '7122',
      name: 'Sequelize',
      logo: 'assets/img/tools/sequelize.png',
      link: 'http://docs.sequelizejs.com/',
      tab: 'back-end',
    },
    {
      id: '7126',
      name: 'NodeJs',
      logo: 'assets/img/tools/nodejs.png',
      link: 'https://nodejs.org/en/',
      tab: 'back-end',
    },
    {
      id: '6121',
      name: 'Firebase',
      logo: 'assets/img/tools/firebase.svg',
      link: 'https://firebase.google.com/',
      tab: 'cloud',
    },
  ];
}
