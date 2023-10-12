import { useState, useEffect } from "react";
import axios from "axios";
import "./ShelfPage.css";

function ShelfPage() {
  const [shelfList, setShelfList] = useState([]);
  const [itemName, setItemName] = useState('');
  const [image_url, setImage_url] = useState('');

  useEffect(() => {
    fetchShelf();
  }, []);

  const fetchShelf = () => {
    axios
      .get("/api/shelf")
      .then((response) => {
        setShelfList(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong.");
      });
  };

  const addItem = (e) => {
    e.preventDefault();
    axios
      .post("/api/shelf", { name: itemName, image_url: image_url })
      .then((response) => fetchShelf())
      .catch((error) => {
        console.error(error);
        alert("Something went wrong.");
      });
  };

  const deleteItem = (itemId) => {
    axios
      .delete(`/api/shelf/${itemId}`) 
      .then((response) => {
        fetchShelf();
      })
      .catch((error) => {
        console.error(error);
        alert("Something went wrong while deleting the item.");
      });
  };


  return (
    <div className="container">
      <h2>Add an Item</h2>
      <form onSubmit={addItem}>
        Name:{" "}
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <br />
        Image url:{" "}
        <input
          type="text"
          value={image_url}
          onChange={(e) => setImage_url(e.target.value)}
        />
        <br />
        <button>Submit</button>
      </form>
      <hr />
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>
      {shelfList.length === 0 && <div>No items on the shelf</div>}
      {shelfList.map((item) => {
        return (
          <div className="responsive" key={item.id}>
            <div className="gallery">
              <img src={item.image_url} alt={item.description} />
              <br />
              <div className="desc">{item.description}</div>
              <div className="username">{item.username}</div>
              <div style={{ textAlign: "center", padding: "5px" }}>
                <button onClick={() => deleteItem(item.id)} style={{ cursor: "pointer" }}>Delete</button>
              </div>
            </div>
          </div>
        );
      })}
      <div className="clearfix"></div>
    </div>
  );
}


export default ShelfPage;
