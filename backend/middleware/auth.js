const jwt = require("jsonwebtoken");

/* recuperationn du token dans notre header 
vérification du token 
recuperation du userId du token 
si on as un userId dans le corp de la requête et que celui-ci est different = erreur 
sinon, appel de next pour le prochain middleware

si il y à la moindre erreur avant, le catch vas nous le signaler 
*/

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
