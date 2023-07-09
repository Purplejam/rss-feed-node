import {connectDB} from './connectDB'
import {app} from './index'
import {cronFunctionService} from './services/cron.service'
import {fetch} from 'undici'

export const bootstrap = async (): Promise<void> => {
  const port = process.env.PORT || 5000
  try {
    await connectDB(process.env.MONGO_URI as string)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
    fetch('http://localhost:5000/api/v1/feed')
    .then(response => cronFunctionService())
    .catch(error => console.log(error))
  } catch (error) {
    console.log(error)
  }
}

bootstrap()