import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Query } from '../../models';
import { map } from 'rxjs/operators';

@Injectable()
export class CourseService {
  constructor(private apollo: Apollo) {}

  getAllCourses(searchTerm: string) {
    return this.apollo
      .watchQuery<Query>({
        pollInterval: 500,
        query: gql`
          query allCourses($searchTerm: String) {
            allCourses(searchTerm: $searchTerm) {
              id
              title
              author
              description
              topic
              voteCount
            }
          }
        `,
        variables: { searchTerm }
      })
      .valueChanges.pipe(map(result => result.data.allCourses));
  }

  upVoteCourse(id: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation UpVote($id: String!) {
          upVote(id: $id) {
            id
            title
            voteCount
          }
        }
      `,
      variables: { id }
    });
  }

  downVoteCourse(id: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation DownVote($id: String!) {
          downVote(id: $id) {
            id
            title
            voteCount
          }
        }
      `,
      variables: { id }
    });
  }
}
