import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {coverageData} = props

  return (
    <div className="vaccination-coverage-container">
      <h1 className="vaccination-coverage-header">Vaccination Coverage</h1>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart width={1000} height={300} data={coverageData}>
          <XAxis dataKey="vaccineDate" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="dose1" fill="#5a8dee" />
          <Bar dataKey="dose2" fill="#f54394" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationCoverage
