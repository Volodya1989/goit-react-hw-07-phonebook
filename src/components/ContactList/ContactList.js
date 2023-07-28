import ContactListItem from "components/ContactListItem";
import { List, Text, Span } from "./ContactList.styled";
import { FcContacts } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { deleteContact } from "redux/contactsSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getContacts } from "redux/contactsSlice";
import { getFilter } from "redux/filterSlice";

const ContactList = () => {
  const dispatch = useDispatch();

  const contactsMain = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const filteredContacts = contactsMain[0].filter((contact) =>
    contact.name.toLowerCase().includes(filter.value.toLocaleLowerCase())
  );

  return (
    <List>
      {filteredContacts.length > 0 ? (
        filteredContacts.map(({ name, number, id }) => {
          return (
            <ContactListItem
              key={id}
              name={name}
              number={number}
              onDelete={() => dispatch(deleteContact(id))}
            />
          );
        })
      ) : (
        <Text>
          <Span>
            <FcContacts />
          </Span>
          No contacts listed
        </Text>
      )}
    </List>
  );
};

export default ContactList;
