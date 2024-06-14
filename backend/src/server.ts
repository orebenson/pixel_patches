import app from './app';

// start app
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});


