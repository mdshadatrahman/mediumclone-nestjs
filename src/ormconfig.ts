import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const config: TypeOrmModuleOptions = {
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: 'root',
	database: 'mediumclone',
	entities: [__dirname + '/**/*.entity.{js,ts}'],
	autoLoadEntities: true,
	synchronize: true,
};
