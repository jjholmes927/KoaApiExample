module.exports = async (ctx, next) => {
  try {
    let auth = ctx.header.authorization;
    console.log("auth: " + auth);
    const [authType, token] = auth.split(' ');

    if (token === "secureheadbox123") {
      await next();
    } else {
      ctx.throw(401);
    }
  } catch (err) {
      ctx.throw(401);
  }
}