import React from 'react'
import { Button, Col, Row } from 'react-materialize'

import CalculatorForm from './CalculatorForm'
import Chart from './Chart.jsx'
import AddScenario from './AddScenario'

export default class Calculator extends React.Component {

  constructor() {
    super()
    this.state = {
      currentAge: '26',
      retireAge: '65',
      lifespanAge: '90',
      salary: '50000',
      salaryIncrease: '3',
      retireSpending: '40000',
      marketReturn: '4',
      savings: '25',
      currentSavings: '0',
      graphData: [],
      numScenarios: 1,
      finalAmount: '0',
      amtAtRetire: '0'
    }

    this.handleCurrentAge = this.handleCurrentAge.bind(this)
    this.handleRetirementAge = this.handleRetirementAge.bind(this)
    this.handleLifespanAge = this.handleLifespanAge.bind(this)
    this.handleCurrentSavings = this.handleCurrentSavings.bind(this)
    this.handleAddScenario = this.handleAddScenario.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){
    this.computeData()
  }

  computeData() {
    const state = {} = this.state
    let currentAge = +state.currentAge
    const salarySaved = (state.salary / 100) * state.savings
    const salaryIncrease = +state.salaryIncrease
    const yearsToRetirement = +state.retireAge - currentAge
    const yearsToEnd = +state.lifespanAge - currentAge
    const retireSpending = +state.retireSpending
    let accumulatedSavings = +state.currentSavings
    let retiredBool = false
    let arrOfData = [];

    let scenario = 1;
    if(state.numScenarios === 2) {
      scenario = 2
    } else if(state.numScenarios === 3) {
      scenario = 3
    }


    for(let i = 0; i <= yearsToEnd; i++) {
      accumulatedSavings += (accumulatedSavings/100) * state.marketReturn
      arrOfData.push({
        [scenario]: accumulatedSavings,
        age: `${currentAge}`,
      })
      currentAge += 1;
      if(i >= yearsToRetirement && !retiredBool) {
        retiredBool = true;
        this.setState({
          amtAtRetire: accumulatedSavings
        })
      }
      if(!retiredBool) {
        accumulatedSavings += salarySaved
      } else {
        accumulatedSavings -= retireSpending;
      }
    }


    //this is for concating scenarios
    //do this later
    //arrOfData = state.graphData.concat(arrOfData)

    this.setState({
      finalAmount: accumulatedSavings,
      graphData: arrOfData
    })
  }

  handleCurrentAge(evt) {
    const age = +evt.target.value

    if(Number.isNaN(age)) return

    if(age < 0) {
      console.error('cant be negative')
      //display warning for can't be negative
      this.setState({
        currentAge: '1'
      }, () => this.computeData())
    } else if(age >= +this.state.retireAge) {
      console.error(`age can't be greater than retire age`)
      //you have to change retirement age!
      this.setState({
        currentAge: `${age}`,
        retireAge: `${age + 1}`
      }, () => this.computeData())

    } else {
      this.setState({
        currentAge: `${age}`
      }, () => this.computeData())
    }
  }

  handleRetirementAge(evt) {
    const retireAge = +evt.target.value

    if(Number.isNaN(retireAge)) return

    if(retireAge < 0) {
      //display no negatives error
      this.setState({
        retireAge: '1'
      }, () => this.computeData())
    } else if(retireAge <= +this.state.currentAge) {
      console.log('less than')
      this.setState({
        //this might produce a bug, keep an eye out
        retireAge: `${retireAge}`,
        currentAge: `${retireAge - 1}`
      }, () => this.computeData())
    } else {
      this.setState({
        retireAge: `${retireAge}`,
      }, () => this.computeData())
    }
  }

  handleLifespanAge(evt) {
    const ageAtDeath = +evt.target.value

    //validations
    if(Number.isNaN(ageAtDeath)) return

    if(ageAtDeath < +this.state.currentAge){
      this.setState({
        lifespanAge: `${ageAtDeath}`,
        currentAge: `${ageAtDeath-1}`
      }, () => {
        this.computeData()
      })
    } else {
      this.setState({
        lifespanAge: `${ageAtDeath}`
      }, () => {
        this.computeData()
      })
    }
  }

  handleCurrentSavings(evt) {
    const value = +evt.target.value
    console.log(value)
    if(isNaN(value) && evt.target.value !== '-') return
    this.setState({
      currentSavings: evt.target.value
    }, () => this.computeData() )
  }

  handleChange(evt) {
    const value = +evt.target.value
    if(isNaN(value)) return

    //check that value is not negative
    if(value < 0) {
      console.error('cannot be negative')
      return
    }
    console.log('name', evt.target.name)
    this.setState({
      [evt.target.name]: `${value}`
    }, () => this.computeData())
  }

  handleAddScenario(){
    let num = this.state.numScenarios
    if(num >= 3) {
      console.log('can only have 3 scenarios')
      return
    }
    num++
    this.setState({
      numScenarios: num
    })
  }

  render() {
    const props = {
      handleCurrentAge: this.handleCurrentAge,
      handleRetirementAge: this.handleRetirementAge,
      handleLifespanAge: this.handleLifespanAge,
      handleCurrentSavings: this.handleCurrentSavings,
      handleChange: this.handleChange,
      state: {...this.state}
    }

    const forms = []
    for(let i = 0; i < this.state.numScenarios; i++) {
      forms.push(
        <Col m={ 12/this.state.numScenarios } key={ i}>
          <CalculatorForm { ...props } />
        </Col>
      )
    }

    //need to connect calculator form and make container since will pass info to rechart
    return (
      <div>
        <Chart { ...props.state }/>
          <Row>
          {forms}
          <AddScenario
            num={ props.state.numScenarios }
            handle={ this.handleAddScenario }
          />
          </Row>
      </div>
    )
  }
}


//also, make this connected component have all of the on change stuff from here.
// this way, in this container, we can "render"/create the appropriate amount of these
//containers according to number of scenarios. Once

//then, these three containers will on change to this container which will choose
//then how to render the chart or send in data.


// in order to have 3 scenarios, will need to have distinct datakeys for each
// scenario that can be identified by chart


