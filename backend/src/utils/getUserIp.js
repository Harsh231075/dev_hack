export const getUserIp = (req) => {
  return req.headers["x-forwarded-for"] || req.connection.remoteAddress;
}
