import cookies from 'js-cookie';
import crypto from 'crypto';

const USER_UID: string = 'user_uid';

/**
 * Get user uid using cookies
 */
const getUserUid = () => {
  return cookies.get(USER_UID);
};

/**
 * Set user uid using cookies
 */
const setUserUid = () => {
  let getUser: any = cookies.get(USER_UID);

  //If user already exists
  if (getUser) return getUser;

  //Create a new user and return
  return cookies.set(USER_UID, crypto.randomBytes(15).toString('hex'));
};

const SessionUser = {
  set: setUserUid,
  get: getUserUid,
};

export default SessionUser;
