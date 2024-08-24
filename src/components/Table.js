import React, { useState, useEffect } from "react";
import jsonData from "../data/data.json";
import resultData from "../data/dataResult.json";
import Modal from "./Modal";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const App = () => {
  const [data, setData] = useState([]);
  const [resultMap, setResultMap] = useState({});
  const [sortOption, setSortOption] = useState(null);

  useEffect(() => {
    // Remove duplicates from jsonData
    const uniqueData = Array.from(new Set(jsonData.map(JSON.stringify))).map(
      JSON.parse
    );

    // Create a map for quick lookup of results by company name
    const resultMap = resultData.reduce((acc, item) => {
      acc[item.companyName] = item.result;
      return acc;
    }, {});

    setData(uniqueData);
    setResultMap(resultMap);
  }, []);

  const sortData = (option) => {
    let sortedData = [...data];

    switch (option) {
      case "company":
        sortedData.sort((a, b) => a.companyName.localeCompare(b.companyName));
        break;
      case "salary-asc":
        sortedData.sort(
          (a, b) =>
            parseFloat(a.salaryCtc.replace(/,/g, "")) -
            parseFloat(b.salaryCtc.replace(/,/g, ""))
        );
        break;
      case "salary-desc":
        sortedData.sort(
          (a, b) =>
            parseFloat(b.salaryCtc.replace(/,/g, "")) -
            parseFloat(a.salaryCtc.replace(/,/g, ""))
        );
        break;
      case "startDate":
        sortedData.sort((a, b) => {
          const [dayA, monthA, yearA] = a.startDate.split("-").map(Number);
          const [dayB, monthB, yearB] = b.startDate.split("-").map(Number);
          return yearA - yearB || monthA - monthB || dayA - dayB;
        });
        break;
      default:
        break;
    }

    setData(sortedData);
    setSortOption(option);
  };

  const handleSortChange = (event) => {
    const selectedOption = event.target.value;
    sortData(selectedOption);
  };

  const displayResult = (companyName) => {
    const resultText = resultMap[companyName] || "No result available";
    alert(resultText); // This can be replaced with a modal
  };

  return (
    <div className="App container">
      <h1 className="my-4">Placement Data of IIT Kharagpur '24</h1>

      <div id="sort-container" className="d-flex mb-3">
        <select
          id="sort-select"
          className="form-select me-3"
          onChange={handleSortChange}
        >
          <option value="" disabled selected>
            Select Sort Option
          </option>
          <option value="company">Sort By Company Name (A-Z)</option>
          <option value="salary-asc">Sort By Salary (Low to High)</option>
          <option value="salary-desc">Sort By Salary (High to Low)</option>
          <option value="startDate">
            Sort By Start Date (Earliest to Latest)
          </option>
        </select>
      </div>

      <table id="results-table" className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Company Name</th>
            <th>Job Profile</th>
            <th>Salary/CTC</th>
            <th>Start Date</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.companyName}</td>
              <td>{item.jobProfile}</td>
              <td>{item.salaryCtc}</td>
              <td>{item.startDate}</td>
              <td>
                {resultMap[item.companyName] ? (
                  <button
                    onClick={() => displayResult(item.companyName)}
                    className="btn btn-info btn-sm"
                  >
                    View Result
                  </button>
                ) : (
                  <span className="no-result"></span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
