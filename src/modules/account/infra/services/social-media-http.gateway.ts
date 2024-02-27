import axios from "axios";
import { ISocialMediaGateway } from "../../domain/gateway/social-media.gateway";

export class SocialMediaHttpGateway implements ISocialMediaGateway {
  async findGoogleAccessTokenByToken(googleToken: string): Promise<any> {
    const https = await axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${googleToken}` },
      })
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err);
      });

    return https;
  }

  async findLinkedinAccessTokenByToken(linkedinToken: string): Promise<any> {
    const https = await axios({
      url: `https://api.linkedin.com/v2/userinfo`,
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${linkedinToken}`,
      },
    }).then((response) => response);

    return https;
  }

  async findLinkedinAccessTokenByPayload(
    redirectUri: string,
    code: string
  ): Promise<any> {
    console.log(code, redirectUri)
    const https = await axios({
      url: `https://linkedin.com/oauth/v2/accessToken`,
      method: "POST",
      headers: {
        "Content-Type": "x-www-form-urlencoded",
      },
      params: {
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
        grant_type: process.env.LINKEDIN_GRANT_TYPE,
        redirect_uri: redirectUri,
        code,
      },
    }).then((response) => response);

    return https;
  }
}
