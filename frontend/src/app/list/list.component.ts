import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Course } from '../models';
import { CourseService } from '../services';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnChanges {
  @Input() searchTerm: string;
  courses$: Observable<Course[]>;

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.courses$ = this.courseService.getAllCourses(this.searchTerm);
  }

  ngOnChanges() {
    this.courses$ = this.courseService.getAllCourses(this.searchTerm);
  }
}
