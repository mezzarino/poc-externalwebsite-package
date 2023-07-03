module.exports = {
    async rewrites() {
        return [
            {
                source: "/api/exchangerates",
                destination: "https://poc-multisite-apis-b9bv5jrfb-mezzarino.vercel.app/api/exchangerates"
            }
        ]
    }
};