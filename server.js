const app = require('./app');
const config = require('./utils/config');

const port = config.PORT || 5000;

// Server Listen
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

