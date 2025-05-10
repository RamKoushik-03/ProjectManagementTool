import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useUserAuth } from '../../hooks/useUserAuth';
import { UserContext } from '../../context/UserContext';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import moment from 'moment';
import TaskListTable from '../../components/layouts/TaskListTable';
import { addThousandsSeparator } from '../../utils/helper';
import InfoCard from '../../components/cards/InfoCard';
import { LuArrowRight } from 'react-icons/lu';
import CustomPieChart from '../../components/Charts/CustomPieChart';
import CustomBarChart from '../../components/Charts/CustomBarChart';

import { FaBell } from 'react-icons/fa';

const COLORS = ['#3A7CA5', '#50C878', '#FFD700'];

const UserDashboard = () => {
  useUserAuth();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const prepareChartData = (data) => {
    const taskDistribution = data?.taskDistribution || {};
    const taskPriorityLevels = data?.taskPriorityLevels || {};

    // Prepare data for Pie Chart

    const taskDistributionData = [
      { status: 'Pending', count: taskDistribution.Pending || 0 },
      { status: 'In Progress', count: taskDistribution.InProgress || 0 },
      { status: 'Completed', count: taskDistribution.Completed || 0 },
    ];

    const PriorityLevelData = [
      { priority: 'Low', count: taskPriorityLevels.Low || 0 },
      { priority: 'Medium', count: taskPriorityLevels.Medium || 0 },
      { priority: 'High', count: taskPriorityLevels.High || 0 },
    ];
    setPieChartData(taskDistributionData);
    setBarChartData(PriorityLevelData);
  };

  const getDashboardData = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_USER_DASHBOARD_DATA
      );
      if (response.data) {
        setDashboardData(response.data);
        prepareChartData(response.data.charts || {});
      }
    } catch (error) {
      console.error('Error fetching dashboard data', error);
    }
  }, []);

  const onSeeMore = () => {
    navigate('/admin/tasks');
  };

  useEffect(() => {
    getDashboardData();
  }, [getDashboardData]);

  return (
    <DashboardLayout activeMenu="Dashboard">
      {/* Welcome + Stats Card with Bell Icon and Task Summary */}
      <div className="card p-6 mb-6 relative">
        {/* Bell Icon Top Right */}
        <button
          onClick={() => navigate('/notifications')}
          className="absolute top-4 right-4 text-gray-600 hover:text-primary transition-colors"
        >
          <FaBell size={24} />
        </button>

        {/* Welcome Message */}
        <h2 className="text-xl md:text-2xl font-semibold">
          Welcome {user?.name}
        </h2>
        <p className="text-xs md:text-sm text-gray-400 mt-1.5">
          {moment().format('dddd Do MMMM YYYY')}
        </p>

        {/* Task Summary Cards Inside Welcome Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <InfoCard
            label="Total Tasks"
            value={addThousandsSeparator(
              dashboardData?.statistics?.totalTasks || 0
            )}
            color="bg-primary"
            statusColor="#6B46C1"
          />
          <InfoCard
            label="Pending Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.Pending || 0
            )}
            color="bg-violet-500"
            statusColor="#8D51FF"
          />
          <InfoCard
            label="In Progress Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.InProgress || 0
            )}
            color="bg-cyan-500"
            statusColor="#00B8DB"
          />
          <InfoCard
            label="Completed Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.Completed || 0
            )}
            color="bg-lime-500"
            statusColor="#7BCED0"
          />
        </div>
      </div>

      {/* Charts and Recent Tasks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pie Chart */}
        <div className="card p-6">
          <h5 className="font-medium text-center mb-4">Task Distribution</h5>
          <CustomPieChart data={pieChartData} label="Tasks" colors={COLORS} />
        </div>

        {/* Bar Chart */}
        <div className="card p-6">
          <h5 className="font-medium text-center mb-4">Task Priority Levels</h5>
          <CustomBarChart data={barChartData} />
        </div>

        {/* Recent Tasks (spans two columns) */}
        <div className="md:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-semibold">Recent Tasks</h2>
            <button className="card-btn flex items-center" onClick={onSeeMore}>
              See All <LuArrowRight className="ml-2 text-base" />
            </button>
          </div>
          <TaskListTable tableData={dashboardData?.recentTasks || []} />
        </div>
      </div>
    </DashboardLayout>
  );
};
export default UserDashboard;
