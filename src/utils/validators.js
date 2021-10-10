// %%%%%%%%%%%%%%%%%%%%%%%%%%  FILE & VARIABLE NAME VALIDATOR
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export function isValidName(name) {
  const emptyNameRegexp = /^\s*$/ig;
  const validNameRegexp = /^[^\d.][\w\d_]*$/ig;
  return (emptyNameRegexp.test(name))? false: validNameRegexp.test(name);
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  ASY PAIR VALIDATOR
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export function isValidAsyPair(value) {
  const regexp = /\s*\(\s*\S+\s*,\s*\S+\s*\)\s*/ig;
  return regexp.exec(value);
}

