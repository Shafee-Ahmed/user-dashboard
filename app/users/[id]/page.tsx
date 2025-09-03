import { fetchUserById } from "@/utils/fetchUsers";
import { User } from "@/types/user";
import Link from "next/link";
import MotionLayout from "@/components/Motionlayout";


interface UserDetailsProps {
  params: { id: string };
}

export default async function UserDetailsPage({ params }: UserDetailsProps) {
  const userId = Number(params.id);
  const user: User | undefined = await fetchUserById(userId);

  if (!user) {
    return (
      <MotionLayout>
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
          <h2 className="text-xl font-bold mb-4 text-center">User not found</h2>
          <Link href="/users" className="text-blue-600 underline block text-center mt-4">
            Back to User List
          </Link>
        </div>
      </MotionLayout>
    );
  }

  return (
    <MotionLayout>
      <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
        {/* Sticky user info bar */}
        <div className="sticky top-0 z-10 bg-white flex items-center justify-between px-4 py-3 rounded-lg shadow mb-6">
          <div>
            <span className="font-bold text-lg">{user.name}</span>
            <span className="ml-2 text-gray-500">{user.email}</span>
          </div>
          <Link
            href="/users"
            className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            ← Back to Users
          </Link>
        </div>

        {/* Rest of user details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-bold text-lg mb-2">Personal Information</h3>
          <div className="mb-1"><span className="font-semibold">Username</span><br />@{user.username}</div>
          <div className="mb-1"><span className="font-semibold">Phone</span><br />{user.phone}</div>
          <div className="mb-1">
            <span className="font-semibold">Website</span><br />
            <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              {user.website}
            </a>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-bold text-lg mb-2">Address</h3>
          <div className="mb-1"><span className="font-semibold">Street</span><br />{user.address.street}</div>
          <div className="mb-1"><span className="font-semibold">Suite</span><br />{user.address.suite}</div>
          <div className="mb-1"><span className="font-semibold">City</span><br />{user.address.city}</div>
          <div className="mb-1"><span className="font-semibold">Zipcode</span><br />{user.address.zipcode}</div>
          <div className="mb-1"><span className="font-semibold">Geo Location</span><br />{user.address.geo.lat}, {user.address.geo.lng}</div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-bold text-lg mb-2">Company</h3>
          <div className="mb-1"><span className="font-semibold">Company Name</span><br />{user.company.name}</div>
          <div className="mb-1"><span className="font-semibold">Catch Phrase</span><br />{user.company.catchPhrase}</div>
          <div className="mb-1"><span className="font-semibold">Business</span><br />{user.company.bs}</div>
        </div>
      </div>
    </MotionLayout>
  );
}