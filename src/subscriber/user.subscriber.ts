import {
	DataSource,
	EntitySubscriberInterface,
	EventSubscriber,
	InsertEvent,
} from 'typeorm';
import { UtilsService } from 'src/utils/utils.service';
import { User } from 'src/database/entities/User.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
	constructor(
		readonly dataSource: DataSource,
		private utilsService: UtilsService,
	) {
		dataSource.subscribers.push(this);
	}

	listenTo(): typeof User {
		return User;
	}

	async beforeInsert(event: InsertEvent<User>): Promise<User> {
		const user = event.entity;
		if (user.password) {
			user.password = await this.utilsService.encryptPassword(user.password);
		}

		return user;
	}
}
