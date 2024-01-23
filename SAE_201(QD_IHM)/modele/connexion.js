import * as APIsql from "../modele/sqlWeb.js";
APIsql.sqlWeb.init("http://127.0.0.1/vue/", "http://127.0.0.1/API/");
class Connexion {
    constructor() {
        this.init();
    }
    init() {
        // à adapter avec voter nom de base et vos identifiants de connexion
        APIsql.sqlWeb.bdOpen('127.0.0.1', '3306', 'infraction', 'root', '', 'utf8');
    }
}
let connexion = new Connexion;
export { connexion, APIsql };
//# sourceMappingURL=connexion.js.map