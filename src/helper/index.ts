import * as bcrypt from 'bcrypt';

const HashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const VerifyPassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export { HashPassword, VerifyPassword };
