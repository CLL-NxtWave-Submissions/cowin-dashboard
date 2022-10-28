import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

import './index.css'

const VaccinationByAge = props => {
  const {ageBasedData} = props

  return (
    <div className="vaccination-by-age-container">
      <h1 className="vaccination-by-age-header">Vaccination by age</h1>
      <ResponsiveContainer width="100%" height={500}>
        <PieChart width={1000} height={300}>
          <Pie
            dataKey="count"
            data={ageBasedData}
            cx="50%"
            cy="50%"
            outerRadius={150}
          >
            <Cell name="18-44" fill="#2d87bb" />
            <Cell name="44-60" fill="#a3df9f" />
            <Cell name="Above 60" fill="#64c2a6" />
          </Pie>

          <Legend iconType="circle" align="center" verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationByAge
