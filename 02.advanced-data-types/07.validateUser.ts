type User = {
  id: number | string;
  username: string;
  passwordHash: string | string[];
  status: 'Locked' | 'Unlocked' | 'Deleted';
  email?: string;
};

function validateUser(user: User): boolean {
  if (
    ('id' in user &&
      ((typeof user.id == 'number' && user.id > 100) ||
        (typeof user.id == 'string' && user.id.length == 14))) == false
  ) {
    return false;
  }
  if (
    ('username' in user &&
      typeof user.username == 'string' &&
      user.username.length >= 4 &&
      user.username.length <= 10) == false
  ) {
    return false;
  }
  if (
    ('passwordHash' in user &&
      ((typeof user.passwordHash == 'string' && user.passwordHash.length == 20) ||
        (Array.isArray(user.passwordHash) &&
          user.passwordHash.every((el) => typeof el == 'string' && el.length == 8) &&
          user.passwordHash.length == 4))) == false
  ) {
    return false;
  }
  if (
    'status' in user &&
    (user.status == 'Locked' || user.status == 'Unlocked') == false
  ) {
    return false;
  }
  return true;
}

console.log(
  validateUser({
    id: 1344,
    username: 'wow123',
    passwordHash: '123456-123456-1234567',
    status: 'Locked',
    email: 'something@abv.bg',
  })
);
