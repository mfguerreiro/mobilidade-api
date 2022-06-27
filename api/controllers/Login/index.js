import valid from "../../helpers";

//import UserCad from "../../models/sql/User/UserCad";

//import UserPosition from "../../models/mongodb/User/geolocation";

import CacheService from "../../services/Cache";

/**
 * Preeencha comentários
 */
class Login {
  static async Teste(req, res) {
    try {

      //console.log(await UserCad.findAll());
      //console.log(await UserPosition.find());
      //console.log(await UserPosition.findAll());

      //console.log('clier', await CacheService.clearAll());
      //console.log(await new UserPosition({data:13123131}));

      function LoginRefs(){
        console.log('funcao de refresh data');
      }
      function delRefs(){
        console.log('funcao de del data');
      }

      if(req.query.insert){
        console.log(await CacheService.set('nome', {name:'valor', moeda: 124}, {useRedis:true}));
      }

      console.log(await CacheService.get('nome', {}, LoginRefs));



      res.send("true");
    } catch (tryerror) {
      console.error(tryerror);
      res.status(400).send(tryerror);
    }
  }
}

export default Login;
