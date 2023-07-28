import { Input, Label, Button } from "./ContactForm.styled";
import { useDispatch } from "react-redux";
import { addContact } from "redux/operations";

const ContactForm = () => {
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { name, phone } = e.target.elements;
    console.log(name.value, phone.value);
    dispatch(addContact(name.value, phone.value));

    e.target.reset();
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <Label>
          Name
          <Input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
            required
          />
        </Label>
        <Label>
          Number
          <Input
            type="tel"
            name="phone"
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </Label>
        <Button type="submit">Add contact</Button>
      </form>
    </div>
  );
};

export default ContactForm;
