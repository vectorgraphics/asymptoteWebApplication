// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%  NAME & IDENTIFIER VALIDATOR
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export function isValidName(name) {
  const emptyNameRegexp = /^\s*$/ig;
  const validNameRegexp = /^[^\d.][\w\d_]*$/ig;
  return (emptyNameRegexp.test(name))? false: validNameRegexp.test(name);
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  UNIQUE NAME VALIDATOR
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export function isUniqueName(name, nameCollection=[]) {
  const regExp = new RegExp(name, "g");
  return (nameCollection.length === 0)? true: !nameCollection.some((item) => regExp.test(item));
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  ASY PAIR VALIDATOR
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export function isValidAsyPair(value) {
  const regexp = /\s*\(\s*\S+\s*,\s*\S+\s*\)\s*/ig;
  return regexp.exec(value);
}

