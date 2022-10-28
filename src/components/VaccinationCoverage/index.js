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

  const CountDataFormatter = countValue => {
    let formattedCountString = ''
    if (countValue > 1000) {
      formattedCountString = `${countValue / 1000}k`
    } else {
      formattedCountString = `${countValue}`
    }

    return formattedCountString
  }

  return (
    <div className="vaccination-coverage-container">
      <h1 className="vaccination-coverage-header">Vaccination Coverage</h1>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart width={1000} height={300} data={coverageData}>
          <XAxis dataKey="vaccineDate" />
          <YAxis tickFormatter={CountDataFormatter} />
          <Tooltip />
          <Legend />
          <Bar dataKey="dose1" name="Dose1" fill="#5a8dee" />
          <Bar dataKey="dose2" name="Dose2" fill="#f54394" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationCoverage
