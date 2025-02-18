// "use client";

// import { useState, useEffect } from "react";
// import { useAuth } from "@clerk/nextjs";
// import { UserResource } from "@clerk/types";

// const UsersTable = () => {
//   const [users, setUsers] = useState<UserResource[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//    const use
//         const token = await getToken(); // Get the user's auth token

//         const response = await fetch("https://api.clerk.dev/v1/users", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) throw new Error("Failed to fetch users");

//         const data = await response.json();
//         setUsers(data);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   if (loading) return <p>Loading users...</p>;

//   return (
//     <div className="overflow-x-auto p-4">
//       <h2 className="text-xl font-bold mb-4">All Users</h2>
//       <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="px-4 py-2 border">ID</th>
//             <th className="px-4 py-2 border">Name</th>
//             <th className="px-4 py-2 border">Email</th>
//             <th className="px-4 py-2 border">Created At</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id} className="border-b">
//               <td className="px-4 py-2 border">{user.id}</td>
//               <td className="px-4 py-2 border">{user.fullName || "N/A"}</td>
//               <td className="px-4 py-2 border">
//                 {user.emailAddresses[0]?.emailAddress || "N/A"}
//               </td>
//               <td className="px-4 py-2 border">
//                 {new Date(user.createdAt).toLocaleDateString()}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UsersTable;
