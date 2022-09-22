import { React, Component } from 'react';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';
import { nanoid } from 'nanoid';


const STATE = {
        name: '',
        number: '',
    }

class ContactForm extends Component {
    state = STATE;
    
    handleChangeForm = ({ target }) => {
        const { name, value } = target
        this.setState({ [name]: value })
    }

    handleFormSubmit = e => {
        e.preventDefault()

        const { name, number } = this.state;
        const { onAdd } = this.props;

        const isFormValid = this.validForm()

        if (!isFormValid) return
        onAdd({ id: nanoid(), name, number })
        this.resetForm()
    }

    validForm = () => {
        const { name, number } = this.state;
        const { checkUniqueName } = this.props
        if (!name || !number) {
            alert(`${name} is already in contacts`);
            return false
        }
        return checkUniqueName (name)
    }

    resetForm = () => this.setState(STATE)

    render() {
        const {name, number} = this.state
        return (
            <div className={s.phonebook}>
                <h2>Phonebook 📞</h2>
                <form onSubmit={this.handleFormSubmit}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder='Enter Name'
                        value={name}
                        onChange={this.handleChangeForm}
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                    />
                    <br />
                    <label htmlFor="number">Number</label>
                    <input
                        type="tel"
                        id="number"
                        name="number"
                        placeholder='Enter Phone Number'
                        value={number}
                        onChange={this.handleChangeForm}
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                    />
                    <button
                        type='submit'
                        onClick={() => { }}>Add Contact</button>
                    <br />
                </form>
            </div>
        )
    }
}

ContactForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

    export default ContactForm;