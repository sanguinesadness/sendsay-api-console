import Sendsay from "sendsay-api";

export const sendsay = new Sendsay();
sendsay.setSessionFromCookie("session_id");
