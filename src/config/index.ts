const serverPath = "http://localhost:5000/api/v1/admin";
//http://localhost:5000/api/v1/admin/auth/callback/google
//http://localhost:5000

const CONFIG = {
  isProd: false,
  GOOGLE_CLIENT_ID:
    "795143442795-l3fqj7anlmqilbkdb1hae1fubugj7b1l.apps.googleusercontent.com",
  apiGoogleCallback: serverPath + "/auth/callback/google",
  apiUserCsrf: serverPath + "/csrf",
  csrfLifeInHour: 1,
  dirtyTxt: `.#,'"@%&`,
  ...apiAds(),
};
export default CONFIG;

function apiAds() {
  return {
    apiAds: {
      get: serverPath + "/ads/get",
      update: serverPath + "/ads/update",
      remove: serverPath + "/ads/remove",
      add: serverPath + "/ads/add",
    },
  };
}
