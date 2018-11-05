import {Controller, Get, HttpService} from '@nestjs/common';

@Controller('client')
export class ConnectController {

    readonly credentials = {
        client: {
            id: 'client',
            secret: 'secret'
        },
        auth: {
            tokenHost: 'http://localhost:5001',
            tokenPath: '/connect/token'
        }
    };

    readonly tokenConfig = {
        scope: ['valuesApi'],
    };

    constructor(private readonly http: HttpService) {
    }

    @Get('connect')
    public async connect() {

        //https://github.com/lelylan/simple-oauth2
        const oauth2 = require('simple-oauth2').create(this.credentials);

        try {

            const result = await oauth2.clientCredentials.getToken(this.tokenConfig);

            const headers = {headers: {'Authorization': `Bearer ${result.access_token}`}};

            const response = await this.http.get(`http://localhost:5002/api/values`, headers).toPromise();

            return response.data;

        } catch (error) {
            console.log('Access Token error', error.message);
        }

        return 'fail';
    }
}
