import cron from 'node-cron'
import {fetch} from 'undici'


export const cronFunctionService = () => {
	//request on every ten minutes
	return cron.schedule('*/10 * * * *', () => {
		fetch('http://localhost:5000/api/v1/feed')
		.then((res) => res.json())
		.then((res) => console.log('Articles update!'))
		.catch((error) => console.log(error))
	})
}