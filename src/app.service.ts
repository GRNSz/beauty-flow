import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';   
  }

  getTestServer(): string {
    return 'O servidor está funcionando corretamente!';
  }
}
