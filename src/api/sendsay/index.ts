import { AuthDto } from "./types/auth.dto";
import { sendsay } from "./sendsay-to-ts";
import { SendsayError, SendsaySuccess } from "./types/response";

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

  public static async login(dto: AuthDto): Promise<SendsaySuccess> {
    return new Promise((resolve, reject) => {
      return this._sendsay
        .login(dto)
        .then(() => {
          localStorage.setItem("login", dto.login);
          localStorage.setItem("password", dto.password);
          localStorage.setItem("sublogin", dto.sublogin || "");

          document.cookie = `session_id=${this._sendsay.session}`;
          resolve({ code: 200 });
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
}
