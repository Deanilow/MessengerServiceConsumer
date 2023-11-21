// DOMAIN LAYER
// Has the userRepository as a dependency. The authService does not know
// nor does it care where the user models came from. This is abstracted away
// by the implementation of the repositories. It just calls the needed repositories
// gets the results and usually applies some business logic on them.
const errors = require('../../common/errors');

const {
  getRetryAfterSeconds,
} = require('../../common/utils/helper');

function init({
  authenticationRepository,
  usersRepository,

}) {
  async function register(options) {
    return usersRepository.createUser(options);
  }

  async function handleIncorrectLoginPassword() {
    try {
      throw new errors.Unauthorized('WRONG_PASSWORD');
    } catch (rlRejected) {
      if (rlRejected instanceof Error) {
        throw rlRejected;
      } else {
        const retryAfterSecs = getRetryAfterSeconds(rlRejected.msBeforeNext);
        throw new errors.TooManyRequests(`Too Many Requests. Retry after ${String(retryAfterSecs)} seconds`);
      }
    }
  }

  async function handleCorrectLoginPassword({
    user,
  }) {
    const token = await authenticationRepository.createUserToken(user);
    return {
      token,
      user,
    };
  }

  async function login({
    email,
    password,
  }) {
    const user = await usersRepository.getUser({
      email,
      password,
    });

    const isPasswordCorrect = await authenticationRepository.comparePassword(password, user.password)
      .catch((err) => {
        console.error(`Error in authentication of user with email: ${email}`, err);
        return undefined;
      });

    if (!isPasswordCorrect) {
      return handleIncorrectLoginPassword();
    }
    return handleCorrectLoginPassword({
      user,
    });
    // }
  }

  return {
    register,
    login,
  };
}

module.exports.init = init;
