import { useEffect } from "react";
import { fetchContacts } from "redux/operations";
import { getContacts } from "redux/selectors";
import ContactListItem from "components/ContactListItem";
import { List, Text, Span } from "./ContactList.styled";
import { FcContacts } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { deleteContact } from "redux/operations";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getFilter } from "redux/selectors";

const ContactList = () => {
  const dispatch = useDispatch();
  const { items, isLoading, error } = useSelector(getContacts);

  const filter = useSelector(getFilter);
  console.log("filter", useSelector(getFilter));

  const filteredContacts = items.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLocaleLowerCase())
  );
  console.log("filteredContacts", filteredContacts.length);
  useEffect(() => {
    console.log(dispatch(fetchContacts()));
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <List>
      {isLoading && <b>Loading tasks...</b>}
      {error && <b>{error}</b>}
      {filteredContacts.length > 0 ? (
        items.map(({ name, phone, id }) => {
          return (
            <ContactListItem
              key={id}
              name={name}
              number={phone}
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