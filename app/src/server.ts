import express from 'express';
import cors from 'cors';

import roleRoutes from './routes/role.routes';
import documentTypeRoutes from './routes/document_type.routes';
import taskStatusRoutes from './routes/task_status.routes';
import accessRoutes from './routes/access.routes';
import userRoutes from './routes/user.routes';
import taskRoutes from './routes/task.routes';
import groupTaskRoutes from './routes/group_task.routes';
import authRoutes from './routes/auth.routes';

const app = express();
const API_PREFIX = '/api/v1';

app.use(cors());
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
app.use(`${API_PREFIX}/group-tasks`, groupTaskRoutes);
app.use(`${API_PREFIX}/auth`, authRoutes); 

export default app;