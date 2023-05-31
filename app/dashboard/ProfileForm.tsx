"use client";

import { User } from "@prisma/client";

type ProfileFormProps = User;

const ProfileForm = ({ name, bio, age, image }: ProfileFormProps) => {
  const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const body = {
      name: formData.get("name"),
      bio: formData.get("bio"),
      age: formData.get("age"),
      image: formData.get("image"),
    };

    console.log("my body", body);

    const result = await fetch("/api/user", {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    console.log("RESULT", result);
  };

  return (
    <div>
      <h2>Edit your profile</h2>
      <form onSubmit={updateUser}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" defaultValue={name || ""} />
        <label htmlFor="bio">Bio</label>
        <textarea name="bio" cols={30} rows={10} defaultValue={bio || ""} />
        <label htmlFor="age">Age</label>
        <input type="text" name="age" defaultValue={age || 0} />
        <label htmlFor="image">Profile Image URL</label>
        <input type="text" name="image" defaultValue={image || ""} />

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ProfileForm;
