import ListGroup from "./components/ListGroup"
import Alert from "./components/Alert"
import Button from "./components/Button"
import './App.css'

function App(){
  //let items = ['New York', 'San Franciso', 'Tokyo', 'London', 'Paris'];

  const handleSelectItem = (item: string) => {
    console.log(item)
  }
  //return <div><ListGroup items={items} heading="Cities" onSelectItem={handleSelectItem}/></div>
  return (
    <>
    <ListGroup heading="Test Heading" items={["Item 1", "Item 2", "Item 3", "Item 4"]} onSelectItem = {handleSelectItem}></ListGroup>
    </>
  )
}

export default App