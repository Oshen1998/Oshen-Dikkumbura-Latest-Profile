import { Component, OnInit } from '@angular/core';
import {
  ENTER_SCALE,
  TRANSITION_TEXT,
  TRANSITION_TEXT_ENTER,
} from 'src/app/ui/animations/transitions/transitions.constants';

@Component({
  selector: 'app-home-top',
  templateUrl: './home-top.component.html',
  styleUrls: ['./home-top.component.scss'],
  animations: [TRANSITION_TEXT, TRANSITION_TEXT_ENTER, ENTER_SCALE],
})
export class HomeTopComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
