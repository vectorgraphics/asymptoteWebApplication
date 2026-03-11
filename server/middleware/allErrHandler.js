import { customAlphabet } from "nanoid";

const alphaNumerics = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
const nanoid = customAlphabet(alphaNumerics, 3);

const errFlags = new Map([
  ["550", "Server internal error!"],
  ["551", "Server internal error!"],
  ["552", "Server internal error!"],
  ["553", "Server internal error!"],
  ["554", "Server internal error!"],
  ["560", "Error while fetching result!"],
  ["561", "Error while downloading!"],
  ["590", "Compilation terminated unexpectedly!"],
  ["591", "Asymptote compilation error!"],
])

export const allErrHandler = () => {
  return (err, req, res, next) => {
    if (err) {
      res.json({
        recentOperation: `${req.query.action}`,
        operationStatus: `failure-${nanoid()}`,
        generatedFile: null,
        serverResponse: {
          error: {
            errText: errFlags.get(`${err.awa.code}`),
            errMessage: err.message,
            errStack: err.errStack
          },
          stdObj : (err.extra)? err.stdObj: null,
        },
      })
    }
  }
}