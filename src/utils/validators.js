// ====================================  IDENTIFIER VALIDATOR
// ==========================================================
export const isValidIdentifier = (identifier, testType="full") => {
  const emptyRegexp = /^\s*$/ig;
  const validRegexp = /^[A-Z,a-z,_][\w]*$/ig;

  switch (testType) {
    case "full":
      return (emptyRegexp.test(identifier))? false: validRegexp.test(identifier);
    case "nonEmpty":
      return emptyRegexp.test(identifier);
    case "alphaNumeric":
      return validRegexp.test(identifier);
    default:
        console.warn("Invalid test type!");
      break;
  }
};