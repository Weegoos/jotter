import bcrypt from 'bcryptjs';

export class UserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser(fullname, email, password) {
    if (!fullname || !email || !password) {
      throw new Error('All fields are required');
    }

    const cleanedEmail = email.trim().toLowerCase();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(cleanedEmail)) {
      throw new Error('Invalid mail format');
    }

    const [existingUser, existingFullname] = await Promise.all([
      this.userRepository.findOne('email', cleanedEmail),
      this.userRepository.findOne('fullname', fullname),
    ]);

    if (existingUser) {
      throw new Error('This email has already been registered');
    }

    if (existingFullname) {
      throw new Error('This name is already taken');
    }

    if (password.length < 6) {
      throw new Error('The password error');
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await this.userRepository.create(fullname, cleanedEmail, hashedPassword);

    return newUser;
  }
}
