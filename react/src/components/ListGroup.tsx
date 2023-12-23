
function ListGroup() {
    let items = ['New York', 'San Franciso', 'Tokyo', 'London', 'Paris'];

    return (
        <>
            <h1>List</h1>
            {items.length === 0 && <p>No items found</p>}
            <ul className="list-group">
                {items.map(item => 
                    <li key={item} className="list-group-item" onClick={() => console.log(item)}>{item}</li>
                )}
            </ul>
        </>
    );
}

export default ListGroup;