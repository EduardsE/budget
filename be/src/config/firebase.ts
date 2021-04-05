import admin from 'firebase-admin';

import { project_id, client_email, private_key } from '../../firebase.json';

export const initFirebase = () => {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: project_id,
      clientEmail: client_email,
      privateKey: private_key,
    }),
  });
};
