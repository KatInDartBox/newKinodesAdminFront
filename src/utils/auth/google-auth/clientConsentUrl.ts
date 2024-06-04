import { encodeUrlParams } from "../encodeUrlParams";

type tParams = (
  clientId: string, //
  redirectUri: string,
  scope?: string
) => string;

export const getClientConsentUrl: tParams = (
  clientId, //
  redirectUri,
  scope = "profile email"
) => {
  const base_consent_url = "https://accounts.google.com/o/oauth2/v2/auth?";
  const client_id = clientId;
  const redirect_uri = redirectUri;
  const response_type = "code";

  const jointParams = encodeUrlParams({
    response_type,
    client_id,
    redirect_uri,
    scope,
  });

  return `${base_consent_url}${jointParams}`;
};
