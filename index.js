module.exports = app => {
  app.log("Yay, the app was loaded!");
  app.on("issue_comment", async context => {
    // `context` extracts information from the event, which can be passed to
    // GitHub API calls. This will return:
    //   {owner: 'yourname', repo: 'yourrepo', number: 123, body: 'Hello World!}

    const s = "Can I work on this?";
    const t = "first-timers-only";
    let check = false;
    let labelArray = context.payload.issue.labels;
    if (context.payload.comment.body == s) {
      labelArray.forEach(function(elem) {
        if (elem.name == t) {
          check = true;
        }
      });
      if (check) context.log(context.payload.comment.body);
    }
  });
};
