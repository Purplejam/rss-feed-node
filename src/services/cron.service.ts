import cron from 'node-cron'
import { fetch } from 'undici'

export const cronFunctionService = (): cron.ScheduledTask => {
	//request on every ten minutes
	return cron.schedule('*/10 * * * *', () => {
		fetch('https://rss-feed-node.onrender.com/api/v1/feed')
			.then((res) => res.json())
			.then((res) => console.log('Articles update!'))
			.catch((error) => console.log(error))
	})
}
