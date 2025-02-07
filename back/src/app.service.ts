import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(name: string): string {
    return `Hello, ${name}!`;  // Ce n'est pas forcément nécessaire ici pour la gestion des films
  }
}
