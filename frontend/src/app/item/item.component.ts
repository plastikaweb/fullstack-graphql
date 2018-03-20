import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../models';
import { CourseService } from '../services';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() course: Course;

  constructor(private courseService: CourseService) {}

  ngOnInit() {}

  upvote(id: string) {
    this.courseService
      .upVoteCourse(id)
      .subscribe(
        data => console.log('upvoted', data),
        error => console.error('error on upvote: ', error)
      );
  }

  downvote(id: string) {
    this.courseService
      .downVoteCourse(id)
      .subscribe(
        data => console.log('downvote', data),
        error => console.error('error on downvote: ', error)
      );
  }
}
