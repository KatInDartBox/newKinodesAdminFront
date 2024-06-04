import CONFIG from "@/src/config";
import { getClientConsentUrl } from "@/src/utils/auth/google-auth/clientConsentUrl";
import { ButtonProps } from "@mui/material";
import Button from "@mui/material/Button";
import MyImage from "./myImg";

type tProps = ButtonProps;

export default function LoginGoogle(props: tProps) {
  const clientConsentUrl = getClientConsentUrl(
    CONFIG.GOOGLE_CLIENT_ID,
    CONFIG.apiGoogleCallback,
  );

  return (
    <a href={clientConsentUrl}>
      <Button
        {...props}
        style={{ width: 225 }}
        size="large"
        variant="contained"
        color="success"
      >
        <MyImage alt="google" size={21} src={"/google.svg"} />
        <span className="uppercase ml-2 text-sm">login with google</span>
      </Button>
    </a>
  );
}
