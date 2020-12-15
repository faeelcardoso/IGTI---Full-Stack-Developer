import express from 'express'; 

const app = express();
app.use(express.json()); // notifying express I wanna use JSON

// Req all = understand any routes
app.all('/testAll', (req, res) => {
  res.send(req.method);
});

// Req route = looks like "all", but I choose routes
app.route('/testRoutes')
  .get((_, res) => {
    res.send('/testRoutes GET');
  })
  .post((_, res) => {
    res.send('/testRoutes POST');
  })
  .delete((_, res) => {
    res.send('/testRoutes DELETE');
  });

// Special characters

// Req ? = last letter optional
app.get('/teste?', (_, res) => { // I can put "test" or "teste", both of them works
  res.send("/teste?");
});

// Req + = last letter can be repeated a lot of times
app.get('/buz+', (_, res) => { // I can repeat "z" several times
  res.send('/buz+');
});

// Req * = I can put anything where the "*" is
app.get('/one*Blue', (req, res) => {
  res.send(req.path);
});

// Req () = I can put more letter together between the "()", and after the special caracter
app.post('/test(ing)+', (_, res) => {
  res.send("/test(ing)");
});

// Showing body, but like this isn't normal
app.post('/test(ing)?', (req, res) => {
  console.log(req.body);
  res.send('test(ing)? showing body');
});

// Showing body, params straight on the route. Normal.
app.get('/testParam/:id/:a?', (req, res) => {
  res.send(`${req.params.id} ${req.params.a}`);
});


// Now, more complicated, Regular Expression
app.get(/.*Red$/, (_, res) => { // It's regular expression means, anything before "Red", for example "carRed", will be right
  res.send("Regular Expression");
});

// Query Params
app.get('/testQuery', (req, res) => {
  res.send(req.query); // For params, for example: /testQuery?name=Raphael&age=20
});

// Next = Jump to the next req
app.get('/testMultipleHandlers', (req, res, next) => {
  console.log('Callback 1');
  next();
}, (_, res) => {
  console.log('Callback 2');
  // Here, I can put res.end() or res.sen() as well
  res.end();
});

// Now more productive, Next with array
const callback1 = (_, res, next) => {
  console.log('Callback 1');
  next();
}

const callback2 = (_, res, next) => {
  console.log('Callback 2');
  next();
}

const callback3 = (_, res) => {
  console.log('Final Callback');
  res.send('Finish!');
}

// Now just call the array functions
app.get('/testMultipleHandlersArray', [callback1, callback2, callback3]);

app.listen(3000, () => {
  console.log('API Started!');
});