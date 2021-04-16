import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest'
import './AutoSugest.css';



const getSuggestionValue = (suggestion) => suggestion.name
const renderSuggestion = (suggestion) => (<span>{suggestion.name}</span>)


class AutoSugeest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            suggestions: [],
            getSearchData: []
        }

    }

    onChange = (event, { newValue, method }) => {
        this.setState({ value: newValue });
      }
    
      onSuggestionsFetchRequested = ({ value }) => {
          const  escapedValue = value.trim();
          if(escapedValue === '') {
              return []
          }
        fetch(`https://rickandmortyapi.com/api/character/?name=${escapedValue}`)
        .then(response => response.json())
        .then(data => {
            console.log("data ==>", data);
            if(data.error){
                this.setState({ suggestions: [] })
            }
            else {
                this.setState({ suggestions: data.results });
            }
        });
      }
    
      onSuggestionsClearRequested = () => {
        this.setState({
          suggestions: []
        });
      };
    


    render() {
        const {value, suggestions} = this.state;
        const inputProps = {
            placeholder: "Type 'rick' ",
            value,
            onChange: this.onChange
        };
        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                id="auto-suggestion"
            />
            
        )
    }
}

export default AutoSugeest
