import React from 'react'

const DesiredResponse = ({ data }) => {
  const [jsonData, setJsonData] = React.useState(JSON.stringify(data, null, 2));

  const handleChange = (event) => {
    setJsonData(event.target.value);
  };

  return (
    <div>
      <textarea
        value={jsonData}
        onChange={handleChange}
        rows={10}
        cols={50}
      />
    </div>
  );
}

export default DesiredResponse