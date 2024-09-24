import { Component, OnInit } from '@angular/core';
import { TRANSITION_TEXT } from 'src/app/ui/animations/transitions/transitions.constants';

export interface IArticle {
  title: string;
  platform: string;
  link: string;
  id: string;
  styles: string;
  src: string;
}

@Component({
  selector: 'app-home-platforms',
  templateUrl: './home-platforms.component.html',
  styleUrls: ['./home-platforms.component.scss'],
  animations: [TRANSITION_TEXT],
})
export class HomePlatformsComponent implements OnInit {
  _mTriggerAnim? = 'false';
  public articleData: IArticle[] = [
    {
      id: '1',
      link: 'https://medium.com/stackademic/react-native-navigation-with-typescript-3ced47a7384d',
      platform: 'Medium',
      title: 'React Native Navigation With TypeScript',
      styles:
        'box-shadow: 10px 10px 5px rgba(190, 92, 255, 0.2); border-radius: 12px;',
      src: 'https://miro.medium.com/v2/resize:fit:1400/1*dHT84yUQq63bHPY7t5w-Ig.png',
    },
    {
      id: '2',
      link: 'https://medium.com/@dikkumburao/simplified-guide-to-react-hooks-empowering-functional-components-11b3a8cb007f',
      platform: 'Medium',
      title:
        'Simplified Guide to React Hooks: Empowering Functional Components',
      styles:
        'box-shadow: 10px 10px 5px  rgba(214, 219, 223, 0.2); border-radius: 12px;',
      src: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210714205336/Things-You-Should-Know-About-React-Hooks.png',
    },
    {
      id: '3',
      link: 'https://medium.com/@dikkumburao/exploring-mongodb-aggregation-975fdbf2cb10',
      platform: 'Medium',
      title: 'Exploring MongoDB Aggregation',
      styles:
        'box-shadow: 10px 10px 5px  rgba(24, 219, 223, 0.2); border-radius: 12px;',
      src: 'https://webimages.mongodb.com/_com_assets/cms/kuztefjfmcr54smwt-Meta_Blogs.png',
    },
  ];

  constructor() {}
  ngOnInit(): void {}
}
