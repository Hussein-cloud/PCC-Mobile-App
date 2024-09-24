// src/components/HomeContainer/utils/onRefresh.js
const onRefresh = (fetchData) => {
    return () => {
      setRefreshing(true);
      fetchData();
    };
  };
  
  export default onRefresh;
  