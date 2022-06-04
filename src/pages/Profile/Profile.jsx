import React, { useState, useEffect } from "react";
import Camera from '../../assets/svg/Camera';
import spike from '../../assets/spike_pic.jpg';
import { storage, db, auth } from "../../firebase";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { Delete } from "../../assets/svg/Delete";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar/Navbar";
import './Profile.scss';

const Profile = () => {
  const [img, setImg] = useState("");
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    });

    if (img) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${img.name}`
        );
        try {
          if (user.avatarPath) {
            await deleteObject(ref(storage, user.avatarPath));
          }
          const snap = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

          await updateDoc(doc(db, "users", auth.currentUser.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath,
          });

          setImg("");
        } catch (err) {
          console.log(err.message);
        }
      };
      uploadImg();
    }
  }, [img, user.avatarPath]);

  const deleteImage = async () => {
    try {
      const confirm = window.confirm("Delete avatar?");
      if (confirm) {
        await deleteObject(ref(storage, user.avatarPath));

        await updateDoc(doc(db, "users", auth.currentUser.uid), {
          avatar: "",
          avatarPath: "",
        });
        navigate("/");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return user ? (
    <div className="profile">
      <div className="profile__container">
        <div className="profile__container__img">
          <img src={user.avatar || spike} alt="avatar" className="img"/>
          <div className="overlay">
            <div>
              <label htmlFor="photo">
                <Camera />
              </label>
              {user.avatar ? <Delete id="delete" deleteImage={deleteImage} /> : null}
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="photo"
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div>
          </div>
        </div>
        <div className="profile__container__text">
          <h3>Nickname:</h3>
          <h4>{user.name}</h4>
          <h3>Email:</h3>
          <h4>{user.email}</h4>
          <h3>Присоединился:</h3>
          <h4>{user.createdAt.toDate().toDateString()}</h4>
        </div>
      </div>
    </div>
  ) : null;
};

export default Profile;