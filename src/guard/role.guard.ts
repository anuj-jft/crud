import { CanActivate, ExecutionContext, Type, mixin } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserTypes } from 'src/database/enums/user-type.enum';


const RoleGuard = (roles: UserTypes[]): Type<CanActivate> => {
	class RolesGuard implements CanActivate {
		constructor(private reflector: Reflector) { }
		canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
			const { currentUser } = context.switchToHttp().getRequest();
			return roles.some((reqRole) => currentUser.role.includes(reqRole));
		}
	}
	return mixin(RolesGuard);
}
export default RoleGuard;