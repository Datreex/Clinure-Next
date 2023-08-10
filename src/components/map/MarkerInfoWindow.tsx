interface MarkerInfoWindowProps {
  name: string;
  adress: string;
  phone: string;
  website: string;
  email: string;
}

const MarkerInfoWindow: React.FC<MarkerInfoWindowProps> = ({
  name,
  adress,
  phone,
  website,
  email,
}) => {
  return (
    <div>
      <h1>{name}</h1>
      <h2>{adress} </h2>
      <h2>{phone} </h2>
    </div>
  );
};
export default MarkerInfoWindow;
