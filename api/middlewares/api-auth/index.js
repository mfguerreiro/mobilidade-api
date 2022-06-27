import jwt from "jsonwebtoken";
import moment from "moment";
import axios from "axios";

const internalToken = "&ZzXEDQ2D++Pgbh+";
const dataToken = "7y$hPG_a&@Px7&hf";
const startPass = "StarttoHaven";
const algorithm = "HS384";
const hoursLimit = 2;

var refeshTokenApi =
  "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdXRlbnRpYyI6IlN0YXJ0dG9IYXZlbiIsImlhdCI6MTYzMDM3NTIwMn0.bINpEqzhD1M7-f0hV6ttqU6p9Byz06UO2iR8ykTY4pkq8bn8ZKImuujAoCgRBBUYbBjcqAvBRi_6gTdkEp6GTg";
var TokenApi =
  "eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJyZWZyZXNoU3RhcnQiOiJTdGFydHRvSGF2ZW4iLCJpYXQiOjE2MzAzNzUzNzJ9.6hNfoiK5mml3M3Jmct43OPzCK8mVo32zpC0zNnPREP0MYFducd5rnX7VXAbh2qUm";

const apiList = {};
apiList.teste = "http://localhost:3100";

//import * as twofactor from 'node-2fa';

//const newSecret = twofactor.generateSecret({ name: "My Awesome App", account: "johndoe" });

//console.log(newSecret);
//console.log(twofactor.generateToken("T5JWQ4PUVM23TQ43EHLFY2YNWJVFHSUP"));

//console.log(twofactor.verifyToken("T5JWQ4PUVM23TQ43EHLFY2YNWJVFHSUP", "751469", 10));
//console.log(twofactor.verifyToken("T5JWQ4PUVM23TQ43EHLFY2YNWJVFHSUP", "971695", 10));


class ApiComunication {
  static AuthApi() {
    return function CheckAuthorization(req, res, next) {
      let token = req.headers["x-access-token"] || req.headers.authorization;
      if (!token)
        return res.status(403).send("Access denied. No token provided.");

      if (!token.includes("Bearer"))
        return res.status(403).send("Access denied. Malformed token.");

      token = token.split(" ").pop().trim();
      if (token === refeshTokenApi) {
        const valToken = {
          limitDate: moment().add(hoursLimit, "hours").format(),
          now: moment().format(),
        };
        return res
          .status(200)
          .send({
            refresh: true,
            status: true,
            token: jwt.sign(valToken, internalToken, { algorithm: algorithm }),
          });
      }

      try {
        const decoded = jwt.verify(token, internalToken, {
          algorithm: algorithm,
        });
        req.api = decoded;

        const { refreshStart } = decoded;
        if (refreshStart === startPass) {
          return res.status(206).send({ refresh: true, status: false });
        }

        const { limitDate } = decoded;

        if (
          typeof limitDate == "string" &&
          moment().isAfter(moment(limitDate))
        ) {
          return res.status(403).send("Access denied. Token expired.");
        }

        next();
      } catch (ex) {
        res.status(400).send("Invalid token.");
      }
    };
  }

  //static Generate(value, algo){

  //    return jwt.sign(value, internalToken, { algorithm: algo})

  //}

  static axiosRule(status) {
    return status >= 200 && status < 400;
  }

  static async refresh(api, url) {
    try {
      const result = await axios.get(apiList[api] + url, {
        headers: { Authorization: `Bearer ${refeshTokenApi}` },
      });

      if (result.status == 200 && result.data.refresh && result.data.status) {
        TokenApi = result.data.token;

        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  }

  static async delete(api, url, config = {}) {
    try {
      if (typeof config.headers !== "object") {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${TokenApi}`;
      config.validateStatus = ApiComunication.axiosRule;

      const result = await axios.delete(apiList[api] + url, config);

      if (
        result.status == 206 &&
        result.data.refresh &&
        result.data.status == false
      ) {
        if ((await ApiComunication.refresh(api, url)) == null) {
          throw "Not Refresh";
        }

        return ApiComunication.delete(api, url, config);
      }

      return result;
    } catch (error) {
      console.error(error);
    }

    return null;
  }

  static async get(api, url, config = {}) {
    try {
      if (typeof config.headers !== "object") {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${TokenApi}`;
      config.validateStatus = ApiComunication.axiosRule;

      const result = await axios.get(apiList[api] + url, config);

      if (
        result.status == 206 &&
        result.data.refresh &&
        result.data.status == false
      ) {
        if ((await ApiComunication.refresh(api, url)) == null) {
          throw "Not Refresh";
        }

        return ApiComunication.get(api, url, config);
      }

      return result;
    } catch (error) {
      console.error(error);
    }

    return null;
  }

  static async post(api, url, params = {}, config = {}) {
    try {
      if (typeof config.headers !== "object") {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${TokenApi}`;
      config.validateStatus = ApiComunication.axiosRule;

      const result = await axios.post(apiList[api] + url, params, config);

      if (
        result.status == 206 &&
        result.data.refresh &&
        result.data.status == false
      ) {
        if ((await ApiComunication.refresh(api, url)) == null) {
          throw "Not Refresh";
        }

        return ApiComunication.post(api, url, params, config);
      }

      return result;
    } catch (error) {
      console.error(error);
    }

    return null;
  }

  static async put(api, url, params = {}, config = {}) {
    try {
      if (typeof config.headers !== "object") {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${TokenApi}`;
      config.validateStatus = ApiComunication.axiosRule;

      const result = await axios.put(apiList[api] + url, params, config);

      if (
        result.status == 206 &&
        result.data.refresh &&
        result.data.status == false
      ) {
        if ((await ApiComunication.refresh(api, url)) == null) {
          throw "Not Refresh";
        }

        return ApiComunication.put(api, url, params, config);
      }

      return result;
    } catch (error) {
      console.error(error);
    }

    return null;
  }
}

export default ApiComunication;
