exports.healthCheck = function (ctx, next) {
    return ctx.body = 'healthy';
};
