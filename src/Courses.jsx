import React, { useEffect, useState } from "react";
import api from "./api";  

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ name: "", code: "", credits: 0, status: "required" });

  const fetchCourses = async () => {
    try {
      const response = await api.get("/courses"); 
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const addCourse = async () => {
    try {
      await api.post("/courses", newCourse);
      fetchCourses(); 
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <h1>Courses</h1>
      <ul>
        {courses.map((course) => (
          <li key={course._id}>{course.name} ({course.code}) - {course.credits} credits</li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
