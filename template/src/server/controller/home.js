const handleProxyError = require('@utils/server/handleProxyError')
const proxy = httpProxy.createProxyServer();
const proxyParams = config.proxyParams;

proxy.on('proxyRes', function (proxyRes, req, res) {
  proxyRes.headers['cache-control'] = 'public, max-age=' + 60 * 60 * 8;
});


async function handleProxy(ctx, next) {
    const target = proxyParams.target;
    if (!target) {
        return next();
    }

    const headers = {};
    headers.Host = url.parse(target).host;
    headers.Referer = proxyParams.Referer;

    ctx.respond = false;
    proxy.web(ctx.req, ctx.res, {
        target,
        headers
    }, handleProxyError.bind(null, ctx));
}

module.exports ={
    handleProxy
}