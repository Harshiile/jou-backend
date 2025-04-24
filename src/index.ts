import app from './app/app'
const port = process.env.PORT
port ? app.listen(port, () => { console.log(`Server Runs on ${port}`) }) : console.log('Can\'t find any entry point')