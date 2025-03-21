import React from "react";
import { Routes, Route } from "react-router-dom";
import Lectures from '../../pages/liveclasses/Lectures'
import Attendance from "../../pages/attendance/Attandance";
import NoticeBoard from "../../pages/announcements/NoticeBoard"
import Assessment from "../../pages/Assessment/Assessment";


const BatchRoutes = () => {
  return (
    <Routes>
      <Route path="lectures" element={<Lectures />} />
      <Route path="attendance" element={<Attendance />} />
      <Route path="notice-board" element={<NoticeBoard />} />
      <Route path="assessment" element={<Assessment />} />
    </Routes>
  );
};

export default BatchRoutes;
