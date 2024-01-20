import { useState, useRef } from "react";
import Image from "next/image";

const Avatar = () => {
  const [avatarCid, setAvatarCid] = useState("");
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(null);
  const inputFile = useRef(null);

  const showAvatar = (file) => {
    const reader = new FileReader(file);
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const uploadFile = async (file) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file, file.name);
      const res = await fetch("/api/files", {
        method: "POST",
        body: formData,
      });
      const ipfsHash = await res.text();
      setAvatarCid(ipfsHash);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file === undefined) return;

    showAvatar(file);
    uploadFile(file);
  };
  return (
    <div>
      <input
        type="file"
        id="file"
        accept="image/gif, image/jpeg, image/png"
        ref={inputFile}
        onChange={handleChange}
        style={{ display: "none" }}
      />
      {avatarCid === "" ? (
        image === null ? (
          <Image
            src={
              "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-26.jpg"
            }
            width={296}
            height={296}
            alt=""
            className="bg-white rounded-full cursor-pointer"
            onClick={() => inputFile.current.click()}
          />
        ) : (
          <Image
            src={image}
            alt=""
            width={296}
            height={296}
            className="rounded-full cursor-pointer"
            onClick={() => inputFile.current.click()}
          />
        )
      ) : (
        <Image
          src={`http://ipfs.io/ipfs/${avatarCid}/`}
          alt=""
          width={296}
          height={296}
          className="rounded-full cursor-pointer"
          onClick={() => inputFile.current.click()}
        />
      )}
    </div>
  );
};

export default Avatar;