import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    @Get('health')
    getHealth() {
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
            service: 'zuugnu-backend'
        };
    }

    @Get()
    getRoot() {
        return {
            message: 'Zuugnu API is running',
            version: '1.0.0',
            endpoints: {
                health: '/health',
                auth: '/auth/login'
            }
        };
    }
}
