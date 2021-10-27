const redis = require("redis")

let redisHost, redisPort

if (process.env.NODE_ENV === 'production') {
	redisHost = process.env.REDIS_HOST
	redisPort = process.env.REDIS_PORT
} else {
	redisPort = 6379 // default redis port
	redisHost = '127.0.0.1'
}
const client = redis.createClient({
	host: redisHost,
	port: redisPort,
})

if (process.env.NODE_ENV == 'production') {
	client.auth(process.env.REDIS_PASSWORD)
}
client.on('error', (err) => {
	console.log(err)
})


module.exports = client
