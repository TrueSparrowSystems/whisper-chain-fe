const securityHeaders = [
    {
        key: 'Access-Control-Allow-Origin',
        value: process.env.W_DOMAIN
    }
];

module.exports = securityHeaders;
