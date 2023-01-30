export default defineEventHandler(async event => {
  deleteCookie(event, 'access_token').catch(error => {
    throw createError({
      statusCode: 401,
      message: '登出授權失敗'
    });
  });

  return { status: 'success' };
});
