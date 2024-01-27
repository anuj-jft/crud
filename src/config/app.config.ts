import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

interface IAppOptions {
	appName?: string;
	environment?: string;
	description?: string;
}

export const SwaggerSetup = (app: INestApplication, appOptions?: IAppOptions): void => {
	const swaggerConfig = new DocumentBuilder()
		.setTitle(`${appOptions?.appName || 'Employee Management Service'} | ${appOptions?.environment || 'Development'}`)
		.setDescription(appOptions?.description || 'Jellyfish Technologies | One platform for all employees ')
		.setVersion('1.0.0')
		.addTag('Base')
		.build();
	const document = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup('api', app, document);
};