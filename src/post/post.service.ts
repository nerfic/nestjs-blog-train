import { Injectable } from '@nestjs/common';

const posts = [
  { id: '1', title: 'Premier post', content: 'Ceci est le premier article.' },
  { id: '2', title: 'Deuxième post', content: 'Un autre article intéressant.' },
];

@Injectable()
export class PostService {
  getPost(id: string) {
    return posts.find((post) => post.id === id);
  }
}
