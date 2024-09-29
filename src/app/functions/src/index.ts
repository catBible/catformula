import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const addUser = functions.https.onCall((data, context) => {
  const ip = context.rawRequest.ip;
  const userData = {
    user_id: data.user_id,
    user_name: data.user_name,
    user_phone: data.user_phone,
    user_mail: data.user_mail,
    user_login: new Date().toISOString(),
    user_logout: null,
    user_code: data.user_code,
    cookies: data.cookies,
    ipaddress: ip,
    user_password: data.user_password,
  };

  return admin.firestore().collection('user_login').add(userData)
    .then(() => {
      return { message: 'User added successfully' };
    })
    .catch(error => {
      throw new functions.https.HttpsError('unknown', error.message, error);
    });
});
