import { AuthDto } from "./types/auth.dto";
import { sendsay } from "./sendsay-to-ts";
import { SendsayError, SendsaySuccess } from "./types/response";
import { SendsayRequest } from "./types/request";

export default class SendsayApi {
  private static _sendsay = sendsay;

  public static getAuthData(): AuthDto {
    const data: AuthDto = {
      login: localStorage.getItem("login") || "",
      sublogin: localStorage.getItem("sublogin") || "",
      password: localStorage.getItem("password") || "",
    };

    return data;
  }

  public static async loggedIn(): Promise<boolean> {
    try {
      await this._sendsay.request({
        action: "pong",
      });
      return true;
    } catch {
      return false;
    }
  }

  public static async login(dto: AuthDto): Promise<void> {
    return new Promise((resolve, reject) => {
      return this._sendsay
        .login(dto)
        .then(() => {
          localStorage.setItem("login", dto.login);
          localStorage.setItem("password", dto.password);
          localStorage.setItem("sublogin", dto.sublogin || "");

          document.cookie = `session_id=${this._sendsay.session}`;
          resolve();
        })
        .catch((err: SendsayError) => {
          reject(err);
        });
    });
  }

  public static async logout() {
    document.cookie = "session_id=none";
    localStorage.removeItem("login");
    localStorage.removeItem("password");
    localStorage.removeItem("sublogin");
  }

  public static async makeRequest(request: SendsayRequest) {
    return new Promise((resolve, reject) => {
      this._sendsay
        .request(request)
        .then((resp: SendsaySuccess) => {
          resolve(resp);
        })
        .catch((err: SendsayError) => reject(err));
    });
  }
}
