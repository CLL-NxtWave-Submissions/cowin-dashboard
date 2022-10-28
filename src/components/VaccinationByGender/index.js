import {PieChart, Pie, Legend, Cell} from 'recharts'

import './index.css'

const VaccinationByGender = props => {
  const {genderBasedData} = props

  return (
    <div className="vaccination-by-gender-container">
      <h1 className="vaccination-by-gender-header">Vaccination by gender</h1>
      <PieChart width={1000} height={300}>
        <Pie
          dataKey="count"
          startAngle={180}
          endAngle={0}
          data={genderBasedData}
          cx="50%"
          cy="50%"
          outerRadius={150}
          innerRadius={80}
        >
          <Cell name="Male" fill="#f54394" />
          <Cell name="Female" fill="#5a8dee" />
          <Cell name="Others" fill="#2cc6c6" />
        </Pie>

        <Legend iconType="circle" align="center" verticalAlign="bottom" />
      </PieChart>
    </div>
  )
}

export default VaccinationByGender
