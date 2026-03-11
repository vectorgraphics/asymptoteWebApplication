import path from "path";

export const reqAugmenter = (serverRoot) => {
  return (req, res, next) => {
    if (!req.appPaths) {
      req.appPaths = {
        root: path.resolve(serverRoot, "../"),
        server: path.resolve(serverRoot, "../server"),
        public: path.resolve(serverRoot, "../public"),
        clients: path.resolve(serverRoot, "../clients"),
      }
    }
    if (req.signedCookies && !req.appPaths.user) {
      req.appPaths.user = path.resolve(serverRoot, `../clients/user_${req.signedCookies.UUID}`);
    }
    next();
  }
}