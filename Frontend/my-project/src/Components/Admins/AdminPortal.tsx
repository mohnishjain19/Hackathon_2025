import  { useEffect, useState } from "react";
// @ts-ignore
import { db } from "../Config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

interface UserForm {
  id: string;
  name: string;
  phone: string;
  scheme: string;
}

export const AdminPortal = () => {
  const [userForms, setUserForms] = useState<UserForm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "userForms"));
        const forms: UserForm[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || "",
            phone: data.phone || "",
            scheme: data.scheme || "",
          };
        });
        setUserForms(forms);
      } catch (error) {
        console.error("Error fetching user forms:", error);
        alert("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-8 transition duration-500">
      <h1 className="text-3xl font-bold mb-6 text-center">Submitted User Forms</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : userForms.length === 0 ? (
        <p className="text-center">No submissions yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-black text-black dark:text-white rounded-lg shadow-md border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-900">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-semibold">Name</th>
                <th className="py-3 px-6 text-left text-sm font-semibold">Phone</th>
                <th className="py-3 px-6 text-left text-sm font-semibold">Scheme</th>
              </tr>
            </thead>
            <tbody>
              {userForms.map((form) => (
                <tr
                  key={form.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="py-3 px-6 text-sm">{form.name}</td>
                  <td className="py-3 px-6 text-sm">{form.phone}</td>
                  <td className="py-3 px-6 text-sm">{form.scheme}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
