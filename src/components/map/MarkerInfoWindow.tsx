import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { IconButton, Table } from "@mui/joy";
import Image from "next/image";
import { FacilityWithGeoCodingAndContacts } from "@/app/[lang]/patients/types";

const MarkerInfoWindow = ({
  facility,
}: {
  facility: FacilityWithGeoCodingAndContacts;
}) => {
  return (
    <div>
      <div>This will be the header</div>
      <Table id={"h"}>
        <thead>
          <tr>
            <th>Contact Name</th>
            <th>Contact Number</th>
            <th>Contact Email</th>
          </tr>
        </thead>
        <tbody>
          {facility.facility_contacts.map((contact) => (
            <tr key={contact.name + contact.email}>
              <td>{contact.name}</td>
              <td>{contact.phone}</td>
              <td>{contact.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default MarkerInfoWindow;
