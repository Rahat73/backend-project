import config from '../app/config';
import { USER_ROLE } from '../app/modules/user/user.constant';
import { User } from '../app/modules/user/user.model';

const superUser = {
  id: '0001',
  email: 'rahat.ashik.18@gmail.com',
  password: config.super_admin_password,
  needsPasswordChange: false,
  role: USER_ROLE.superAdmin,
  status: 'in-progress',
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  //when database is connected, we will check is there any user who is super admin
  const isSuperAdminExits = await User.findOne({ role: USER_ROLE.superAdmin });

  if (!isSuperAdminExits) {
    await User.create(superUser);
  }
};

export default seedSuperAdmin;
