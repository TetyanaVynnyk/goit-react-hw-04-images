import { Component } from "react";

import PropTypes from "prop-types";

import styles from "./searchform.module.css"

class SearchForm extends Component {

  state = {
    search: "",
}

handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
}

handleSubmit = (e) => {
    e.preventDefault();
    const {onSubmit} = this.props;
    onSubmit({...this.state});
    this.reset()
}

reset(){
    this.setState({
        search: "",
    })
}

    render(){
      const {search} = this.state;
        const {handleChange, handleSubmit} = this;

        return(
            <header className={styles.searchbar}> 
            <form className={styles.form} onSubmit={handleSubmit}>
              <button type="submit" className={styles.button}>
                <span className={styles.buttonLabel}>Search</span>
              </button>
          
              <input
                className={styles.input}
                value={search} onChange={handleChange} name="search"
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
              />
            </form>
          </header>
        )
            
        }
    }

export default SearchForm;

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}