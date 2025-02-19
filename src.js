// Main App Component
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import NotificationList from './components/Notifications/NotificationList';
import ChatWindow from './components/Chat/ChatWindow';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="notifications" element={<NotificationList />} />
            <Route path="chat" element={<ChatWindow />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;

// Layout Component with Sidebar
const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// Dashboard Component with Task List
const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Task
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Tasks" count={tasks.length} icon="check-circle" />
        <StatCard 
          title="In Progress" 
          count={tasks.filter(t => t.status === 'In Progress').length} 
          icon="clock" 
        />
        <StatCard 
          title="Completed" 
          count={tasks.filter(t => t.status === 'Completed').length} 
          icon="check-square" 
        />
        <StatCard title="Team Members" count={12} icon="users" />
      </div>

      <div className="bg-white rounded-lg shadow">
        <TaskList tasks={tasks} onTaskUpdate={fetchTasks} />
      </div>

      <AddTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onTaskAdded={fetchTasks} 
      />
    </div>
  );
};

const StatCard = ({ title, count, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{count}</p>
      </div>
      <div className="p-3 bg-blue-100 rounded-full">
        <i className={feather-${icon} h-6 w-6 text-blue-600} />
      </div>
    </div>
  </div>
);

export default App;