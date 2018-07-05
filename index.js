module.exports = robot => {
  robot.log('Yay, the app was loaded!')
 robot.on('issues.opened', async context => {
   // `context` extracts information from the event, which can be passed to
   // GitHub API calls. This will return:
   //   {owner: 'yourname', repo: 'yourrepo', number: 123, body: 'Hello World!}
  context.log(context.payload)
 })
}