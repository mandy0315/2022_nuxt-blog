export default defineEventHandler(async event => {
  deleteCookie(event, 'access_token');

  return { status: 'success' };
});
