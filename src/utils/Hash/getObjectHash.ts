// import crypto = require('crypto');

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const getObjectHash = async (obj: any): Promise
<string> => {
  const digest = await crypto.subtle.digest(
    "sha512",
    new TextEncoder().encode(JSON.stringify(obj))
  );
  return new TextDecoder().decode(new Uint8Array(digest));
};
