import express from 'express';

import roleRoutes from './routes/role.routes';
import documentTypeRoutes from './routes/document_type.routes';
import taskStatusRoutes from './routes/task_status.routes';
import accessRoutes from './routes/access.routes';
import userRoutes from './routes/user.routes';
import taskRoutes from './routes/task.routes';

const app = express();
const API_PREFIX = '/api/v1';

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Ostras chaval!');
});

app.use(`${API_PREFIX}/roles`, roleRoutes);
app.use(`${API_PREFIX}/document-types`, documentTypeRoutes);
app.use(`${API_PREFIX}/task-status`, taskStatusRoutes);
app.use(`${API_PREFIX}/accesses`, accessRoutes);
app.use(`${API_PREFIX}/users`, userRoutes);
app.use(`${API_PREFIX}/tasks`, taskRoutes);

export default app;