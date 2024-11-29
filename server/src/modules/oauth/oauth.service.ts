// user signup
// return token stored in user dta
import {
    Injectable,
  } from "@nestjs/common";
import axios from "axios";
import { TokenRequestDto } from "./oauth.dto";

  @Injectable()
  export class OAuthService {
    constructor (
    ) {}
      async getToken(tokenRequestDto: TokenRequestDto) {
        switch(tokenRequestDto.type) {
            case 'linkedin':
                try {
                console.log("type confirmed")
                const code = tokenRequestDto.code;
                console.log(tokenRequestDto);
                const tokenUrl = 'https://www.linkedin.com/oauth/v2/accessToken';
                const params = new URLSearchParams();
                params.append('grant_type', 'authorization_code');
                params.append('code', code);
                params.append('redirect_uri', `http://localhost:3000/oauth/callback/linkedin`);
                params.append('client_id', '862eqspemtvr0p');
                params.append('client_secret', 'WPL_AP1.2r9MGgNk8psNnnOY.EBKcUw==');
                console.log(params);
                console.log("hitting api")
                const response = await axios.post(tokenUrl, params.toString(), {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                });
                console.log("done")
                return response.data.access_token;
            } catch (err) {
                console.log(err)
            }
            default:
                throw new Error("OAuth type not supported")
        }
      }
      async getGoogleUserInfo(accessToken: string) {   
            const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: 'application/json'
                }
            })

            return response.data;
      }
      async getLinkedinUserInfo(access_token: string) {
            const userUrl = 'https://api.linkedin.com/v2/userinfo';
          
            const response = await axios.get(userUrl, {
                headers: {
                  Authorization: `Bearer ${access_token}`,
                },
            });

            return response.data;
      }
  }
  