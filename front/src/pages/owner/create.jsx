import React, { useState } from "react";
import "./create.css";

const CreatePostPage = () => {
  const [formData, setFormData] = useState({
    photo: "",
    title: "",
    location: "",
    description: "",
    contact: ""
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Post créé :", formData);
    alert("Post créé avec succès !");
  };

  return (
    <div className="post-wrapper">
      <h1 className="post-title">📢 Créer une Annonce</h1>
      <form className="post-form" onSubmit={handleSubmit}>
        <label>
          Photo :
          <input type="file" name="photo" accept="image/*" onChange={handleChange} />
        </label>

        {formData.photo && (
          <img src={formData.photo} alt="preview" className="preview-img" />
        )}

         <label>Titre :
           <input type="text" name="title" value={formData.title} onChange={handleChange} required />
         </label>
 
         <label>location :
           <input type="text" name="location" value={formData.location} onChange={handleChange} required />
         </label>
 
 
         <label>Prix :
           <input type="text" name="price" value={formData.price} onChange={handleChange} required />
         </label>
 
         <label>description :
           <textarea name="description" value={formData.description} onChange={handleChange} required />
         </label>
 
         <label>Moyen de contact :
           <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />
         </label>

        <button type="submit" className="submit-btn">Publier</button>
      </form>
    </div>
  );
};

export default CreatePostPage;
