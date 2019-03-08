import { Component,
  OnInit,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import { ExceptionHandlerService } from 'src/app/shared/exception-handler.service';

export interface PageOptions {
  limit?: number;
  page?: number;
}

export interface ErrorInfo {
  isError: boolean;
  message: string;
}

@Component({
  selector: 'grid-layout',
  templateUrl: './grid-layout.component.html',
  styleUrls: ['./grid-layout.component.scss']
})
export class GridLayoutComponent implements OnInit {

  private pageOptions: PageOptions;
  private currentPageCount: number;
  private currentPageLimit: number;

  @Output()
  public loadMoreAction: EventEmitter<PageOptions> = new EventEmitter<PageOptions>();

  @Input()
  set currentPage(value: number) {
    this.currentPageCount = value;
  }

  @Input()
  set pageLimit(value: number) {
    this.currentPageLimit = value;
  }

  @Input()
  public columnCount: number;

  public data: Array<object>;
  public errorInfo: ErrorInfo;
  public toggleLoadMoreBtn: Boolean = true;

  constructor(private api: ApiService,
    private exception: ExceptionHandlerService) { }

  ngOnInit() {
    this.errorInfo = {
      isError: false,
      message: ''
    };
    this.pageOptions = {
      page: this.currentPageCount || 1,
      limit: this.currentPageLimit || 12
    };
    this.columnCount = this.columnCount || 3;
    this.data = [];
    this.loadImages();
    this.exception.listen
    .pipe().subscribe((val: string) => {
      this.errorInfo.isError = true;
      this.errorInfo.message = val;
      this.toggleLoadMoreBtn = false;
    });
  }

  private loadImages() {
    const sub: Subscription =  this.api.fetchImages(this.pageOptions.page, this.pageOptions.limit)
    .subscribe(async (res: Array<object>) => {
      const chunkSize: number = Math.ceil(res.length / this.columnCount);
      const response = await this.generateLists(res, chunkSize) as Array<object>;
      const data: Array<object> = [];
      if (this.data.length === 0) {
        this.data = response;
      } else {
        this.data.forEach((item: Array<object>, index) => {
          const flattern: Array<object> = response[index] as Array<object>;
          flattern.forEach((list) => {
            item.push(list);
          });
        });
      }
      this.toggleLoadMoreBtn = false;
      sub.unsubscribe();
    });
  }

  private generateLists(res: Array<object>, size: number): Promise<object> {
    return new Promise((resolve, reject) => {
      if (res.length === 0 || size <= 0) {
        return reject(new Error('Invalid parameter'));
      }
      const splitArray: Array<object> = [];
      for (let i = 0; i < res.length; i += size) {
        splitArray.push(res.slice(i, i + size));
      }
      const result: Array<object> = [];
      resolve([...result, ...splitArray]);
    });
  }

  public loadMore(): void {
    this.toggleLoadMoreBtn = true;
    this.errorInfo.isError = false;
    this.errorInfo.message = '';
    this.pageOptions.page += 1;
    this.loadImages();
  }
}
