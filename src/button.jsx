export default function Button({color, value, number, onClick }) {
  return <button style={{background: color}} onClick={onClick}
  
  className="enter2">{value}{number} </button>;
}
