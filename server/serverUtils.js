export const propagateErr = (err, info, next) => {
  if (err) {
    err.awa = info;
  }
  next(err);
}

export const objectToText = (dataObject) => {
  const {asn, asnOrganization, timeZones, continentCode, phoneCodes, isProxy, ...polished} = dataObject;
  let text = "";
  for (const element of Object.keys(polished)) {
    text += `${element}: ${polished[element]}\n`
  }
  text += "###########################################\n\n";
  return text;
}
