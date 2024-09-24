import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import { UiUtilsView } from '../../utils/views.utils';
import { MediaObserver } from '@angular/flex-layout';
import { ScrollDispatcher, ViewportRuler } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  mOnceAnimated = false;
  _mTriggerAnim? = 'false';
  _mTriggerImage? = 'false';
  _mThreshold = 0.2;

  public _id: string = '';
  public _platform: string = '';
  public _link: string = '';
  public _styles: string = '';
  public _title: string = '';
  public _imgSrc: string = '';

  @Input('id') set id(data: string) {
    if (data) {
      this._id = data;
    }
  }
  @Input('platform') set platform(data: string) {
    if (data) {
      this._platform = data;
    }
    this._platform = 'Medium';
  }
  @Input('imgSrc') set imgSrc(data: string) {
    if (data) {
      this._imgSrc = data;
    }
  }
  @Input('title') set title(data: string) {
    if (data) {
      this._title = data;
    }
  }
  @Input('link') set link(data: string) {
    if (data) {
      this._link = data;
    }
  }
  @Input('styles') set styles(data: string) {
    if (data) {
      this._styles = data;
    }
    this._styles =
      'box-shadow: 10px 10px 5px rgba(190, 92, 255, 0.2); border-radius: 12px';
  }

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
}
