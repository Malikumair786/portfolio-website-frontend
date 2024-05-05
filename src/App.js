// import React, { useEffect } from "react";
// import { Routes, Route, BrowserRouter } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import Loader from "./components/Loader";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   hideLoading,
//   setCourseData,
//   setExperienceData,
//   setPortfolioData,
//   setProjectData,
//   showLoading,
// } from "./redux/rootSlice";
// import Admin from "./pages/AdminPage";
// function App() {
//   const { loading, courseData } = useSelector((state) => state.root);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     const getPortfolioData = async () => {
//       try {
//         // showLoading();
//         const adminResponse = await axios.get(
//           `${process.env.REACT_APP_API_URL}/admin/`
//         );
//         const courseResponse = await axios.get(
//           `${process.env.REACT_APP_API_URL}/courses`
//         );
//         const experienceResponse = await axios.get(
//           `${process.env.REACT_APP_API_URL}/experience`
//         );
//         const projectResponse = await axios.get(
//           `${process.env.REACT_APP_API_URL}/project`
//         );

//         dispatch(setPortfolioData(adminResponse.data));
//         dispatch(setCourseData(courseResponse.data));
//         dispatch(setExperienceData(experienceResponse.data));
//         dispatch(setProjectData(projectResponse.data));
//         // hideLoading()
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getPortfolioData();
//   }, []);

//   useEffect(() => {
//     console.log("course Data", courseData);
//   }, [courseData]);

//   return (
//     <BrowserRouter>
//       {loading ? <Loader /> : null}
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/admin" element={<Admin />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Loader from "./components/Loader";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  hideLoading,
  setCourseData,
  setExperienceData,
  setPortfolioData,
  setProjectData,
  showLoading,
} from "./redux/rootSlice";
import Admin from "./pages/AdminPage";

function App() {
  const { loading } = useSelector((state) => state.root);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(showLoading()); // Trigger loading state
        const urls = [
          `${process.env.REACT_APP_API_URL}/admin/`,
          `${process.env.REACT_APP_API_URL}/courses`,
          `${process.env.REACT_APP_API_URL}/experience`,
          `${process.env.REACT_APP_API_URL}/project`,
        ];

        // Using Promise.all to fetch all data concurrently
        const [admin, courses, experience, project] = await Promise.all(
          urls.map((url) => axios.get(url))
        );

        dispatch(setPortfolioData(admin.data));
        dispatch(setCourseData(courses.data));
        dispatch(setExperienceData(experience.data));
        dispatch(setProjectData(project.data));
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        dispatch(hideLoading()); // End loading state
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <BrowserRouter>
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
