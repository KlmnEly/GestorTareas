import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Ostras chaval!');
});

export default app;