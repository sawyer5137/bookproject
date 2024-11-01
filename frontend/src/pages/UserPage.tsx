import { useParams } from "react-router";
import MainLayout from "../layouts/MainLayout";
import { useEffect, useState } from "react";
import { getUserById } from "../utilities/data-access";
import { User } from "../models";

export const UserPage = () => {
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (params.userId) {
      getUserById(parseInt(params.userId))
        .then((user) => {
          setUser(user);
        })
        .catch((error) => {
          console.error("Failed to fetch user:", error);
        });
    }
  }, [params.userId]);

  return (
    <>
      <MainLayout>
        {user ? (
          <div className="flex flex-col items-center">
            <h3 className="text-2xl mt-3">{user.username}'s books</h3>
          </div>
        ) : (
          <h2 className="flex flex-col item-center">User not found</h2>
        )}
      </MainLayout>
    </>
  );
};
