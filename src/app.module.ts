import {HttpModule, Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConnectController} from './connect/connect.controller';

@Module({
    imports: [HttpModule],
    controllers: [AppController, ConnectController],
    providers: [AppService],
})
export class AppModule {
}
