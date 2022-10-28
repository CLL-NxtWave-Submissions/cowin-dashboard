import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const cowinDataAPIResponseStates = {
  initial: 'UNINITIALIZED',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {
    cowinDataAPIResponseState: cowinDataAPIResponseStates.initial,
    cowinAPIResponseData: {},
  }

  componentDidMount() {
    this.getCowinData()
  }

  getCowinData = async () => {
    this.setState({
      cowinDataAPIResponseState: cowinDataAPIResponseStates.loading,
    })

    const cowinDataAPIRequestUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const cowinDataAPIResponse = await fetch(cowinDataAPIRequestUrl)
    let currentCowinDataAPIResponseState = null
    let cowinData = {}

    if (cowinDataAPIResponse.ok) {
      currentCowinDataAPIResponseState = cowinDataAPIResponseStates.success
      const fetchedCowinData = await cowinDataAPIResponse.json()

      const formattedCowinData = {
        last7DaysVaccination: fetchedCowinData.last_7_days_vaccination.map(
          dailyVaccinationData => ({
            vaccineDate: dailyVaccinationData.vaccine_date,
            dose1: dailyVaccinationData.dose_1,
            dose2: dailyVaccinationData.dose_2,
          }),
        ),
        vaccinationByAge: fetchedCowinData.vaccination_by_age.map(
          perAgeGroupData => ({
            age: perAgeGroupData.age,
            count: perAgeGroupData.count,
          }),
        ),
        vaccinationByGender: fetchedCowinData.vaccination_by_gender.map(
          perGenderData => ({
            count: perGenderData.count,
            gender: perGenderData.gender,
          }),
        ),
      }

      cowinData = formattedCowinData
    } else {
      currentCowinDataAPIResponseState = cowinDataAPIResponseStates.failure
    }

    this.setState({
      cowinDataAPIResponseState: currentCowinDataAPIResponseState,
      cowinAPIResponseData: cowinData,
    })
  }

  renderLoader = () => (
    <div>
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        className="failure-view-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure-view-msg">Something went wrong</h1>
    </div>
  )

  renderCowinDataVisualizationCharts = (
    last7DaysOfCowinData,
    cowinDataBasedOnAge,
    cowinDataBasedOnGender,
  ) => (
    <>
      <VaccinationCoverage coverageData={last7DaysOfCowinData} />
      <VaccinationByGender genderBasedData={cowinDataBasedOnGender} />
      <VaccinationByAge ageBasedData={cowinDataBasedOnAge} />
    </>
  )

  renderCowinUIBasedOnAPIResponseState = (
    apiResponseState,
    apiResponseData,
  ) => {
    let finalUI = null

    if (
      apiResponseState === cowinDataAPIResponseStates.initial ||
      apiResponseState === cowinDataAPIResponseStates.loading
    ) {
      finalUI = this.renderLoader()
    } else if (apiResponseState === cowinDataAPIResponseStates.success) {
      const {
        last7DaysVaccination,
        vaccinationByAge,
        vaccinationByGender,
      } = apiResponseData
      finalUI = this.renderCowinDataVisualizationCharts(
        last7DaysVaccination,
        vaccinationByAge,
        vaccinationByGender,
      )
    } else if (apiResponseState === cowinDataAPIResponseStates.failure) {
      finalUI = this.renderFailureView()
    }

    return finalUI
  }

  render() {
    const {cowinDataAPIResponseState, cowinAPIResponseData} = this.state

    return (
      <div className="cowin-dashboard-container">
        <div className="cowin-brand-container">
          <img
            className="cowin-brand-img"
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
          />
          <p className="cowin-brand-name">Co-WIN</p>
        </div>
        <h1 className="cowin-header">CoWIN Vaccination in India</h1>
        {this.renderCowinUIBasedOnAPIResponseState(
          cowinDataAPIResponseState,
          cowinAPIResponseData,
        )}
      </div>
    )
  }
}

export default CowinDashboard
