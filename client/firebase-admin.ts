// import admin from 'firebase-admin';
// import dotenv from 'dotenv';
// dotenv.config();

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert({
//     //   type: "",
//       projectId: "your-project-id",
//       privateKeyId: "your-private-key-id",
//       private_key: process.env.FIREBASE_API_KEY?.replace(/\\n/g, '\n') ?? '',
//       client_email: "your-client-email",
//       client_id: "your-client-id",
//       auth_uri: "https://accounts.google.com/o/oauth2/auth",
//       token_uri: "https://oauth2.googleapis.com/token",
//       auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//       client_x509_cert_url: "your-client-x509-cert-url"
//     }),
//     storageBucket: "your-project-id.appspot.com"
//   });
// }

// const storage = admin.storage();

// export { storage };
