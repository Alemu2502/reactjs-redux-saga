import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCatsFetch } from './catState'; // Import the action creator
import './App'; // Make sure to import the CSS file

export default function App() {
  const cats = useSelector((state) => state.cats.cats);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.cats.isLoading); // Add this line
  const [imageUrls, setImageUrls] = useState({}); // Add a state to store image URLs

  useEffect(() => {
    dispatch(getCatsFetch()); // Dispatch the action creator
  }, [dispatch]);

  useEffect(() => {
    // Fetch image URLs for each breed
    cats.forEach((cat) => {
      fetch(`https://api.thecatapi.com/v1/images/${cat.reference_image_id}`)
        .then((response) => response.json())
        .then((data) => {
          setImageUrls((prevImageUrls) => ({ ...prevImageUrls, [cat.id]: data.url }));
        });
    });
  }, [cats]);

  if (isLoading) {
    return <div>Loading...</div>; // Add a loading indicator
  }

  return (
    <div className="App">
      <h1>CAT SPECIES GALLERY</h1>
      <p>Images of different species of cats, lots of cats for your viewing pleasures.</p>
      <hr />
      <div className="gallery">
        {cats.map((cat) => (
          <div key={cat.id} className="row">
            <div className="column-left">
              <img
                alt={cat.name}
                src={imageUrls[cat.id]} // Use the fetched image URL
                height="200"
                width="200"
              />
            </div>
            <div className="column-right">
              <h2>{cat.name}</h2>
              <h5>{cat.temperament}</h5>
              <p>{cat.description}</p>
            </div>
          </div>
        ))}
        <button>View More Cats</button>
      </div>
    </div>
  );
}