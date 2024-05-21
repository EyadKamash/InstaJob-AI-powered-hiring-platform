import { useState, useEffect, useCallback } from "react";

const UseJobFilter = (jobs) => {
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [filter, setFilter] = useState("");
  const [showRemote, setShowRemote] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");

  const filterJobs = useCallback(
    (title, remote, country) => {
      let filtered = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(title.toLowerCase()) &&
          (!remote ||
            (remote &&
              job.location &&
              job.location.toLowerCase().includes("remote"))) &&
          (country !== ""
            ? job.location &&
              job.location.toLowerCase().includes(country.toLowerCase())
            : true)
      );
      setFilteredJobs(filtered);
    },
    [jobs]
  );

  useEffect(() => {
    filterJobs(filter, showRemote, selectedCountry);
  }, [filter, showRemote, selectedCountry, filterJobs]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleRemoteChange = (e) => {
    setShowRemote(e.target.checked);
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  return {
    filteredJobs,
    filter,
    showRemote,
    selectedCountry,
    handleFilterChange,
    handleRemoteChange,
    handleCountryChange,
  };
};

export default UseJobFilter;
