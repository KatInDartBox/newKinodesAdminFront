import { OAuth2Client } from "google-auth-library";
import get from "lodash/get";

/**
 *
 * @typedef {{oid:string,photo_url:string,name:string,email:string}} tUser
 *
 */

/**
 *
 * @param {string} googleRespondCode
 * @param {string} clientId
 * @param {string} clientSecrete
 * @param {string} redirect_uri
 * @returns {[tUser,any|null]}
 */
export async function getGoogleUser(
  googleRespondCode,
  clientId, //
  clientSecrete,
  redirect_uri
) {
  const code = googleRespondCode || "";
  if (!code) {
    return [{}, "unauthorized"];
  }

  try {
    const accessToken = await getAccessToken(code, clientId, clientSecrete, redirect_uri);

    const data = await validateAccessTokenAndGetUserInfo(
      accessToken.id_token, //
      clientId
    );
    return [data, null];
  } catch (error) {
    if (error === null) error = "can not validate token";
    return [{}, error];
  }
}

/**
 * @description
 * read more at
 * https://developers.google.com/identity/sign-in/web/backend-auth
 * @param {string} idToken
 * @param {string} client_id
 * @returns {tUser}
 *
 */
async function validateAccessTokenAndGetUserInfo(idToken, client_id) {
  const client = new OAuth2Client(client_id);
  const ticket = await client.verifyIdToken({
    idToken,
    audience: client_id,
  });
  const payload = ticket.getPayload();

  // console.log(
  //   "google payload", //
  //   JSON.stringify(payload, null, 2)
  // );

  const user = {
    oid: get(payload, "sub", "").toString(),
    photo_url: payload.picture,
    name: payload.name,
    email: getUserEmail(payload.email),
  };
  return user;
}

/**
 * @description
 * it is not suitable for production,
 * google may limit request or throttled it
 * read more at
 * https://developers.google.com/identity/sign-in/web/backend-auth
 * @param {string} token
 * @param {string} access_token
 * @returns {tUser}
 */
async function getUserInfoByEndPoint(token, access_token) {
  const baseApi =
    "https://www.googleapis.com/oauth2/v3/userinfo?" + //
    "alt=json&access_token=" +
    access_token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  const authUser = await (await fetch(baseApi, config)).json();

  // console.log({
  //   config,
  //   authUser,
  // });
  const user = {
    oid: get(authUser, "sub", "").toString(),
    photo_url: authUser.picture,
    name: authUser.name,
    email: getUserEmail(authUser.email),
  };
  return user;
}

/**
 *
 * @param {string} code
 * @param {string} clientId
 * @param {string} clientSecrete
 * @returns {{access_token:string,expires_in:number,token_type:'Bearer',scope:string,refresh_token?:string,id_token?:string}} // bearer token
 */

async function getAccessToken(code, clientId, clientSecrete, redirect_uri) {
  const client_id = clientId || ""; // GITHUB_CLIENT_ID;
  const client_secret = clientSecrete || "";

  const bodyData = {
    client_id,
    client_secret,
    code,
    grant_type: "authorization_code",
    redirect_uri,
  };

  const accessTokenUrl = `https://oauth2.googleapis.com/token`;

  const resTokenObj = await (
    await fetch(accessTokenUrl, {
      method: "post",
      body: JSON.stringify(bodyData),
      headers: { Accept: "application/json", Accept: "application/json" },
    })
  ).json();
  // console.log(`from access token:\n`, resTokenObj);
  return resTokenObj;
}

/**
 *
 * @param {string|string[]} email
 * @returns {string}
 */
function getUserEmail(email) {
  if (typeof email === "string") {
    return email;
  }

  return Array.isArray(email) ? email[0] : "";
}
