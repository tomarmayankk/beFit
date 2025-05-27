import Navbar from '../components/Navbar';
import { useAuthStore } from '../store/useAuthStore';

const ProfilePage = () => {
  const { authUser } = useAuthStore();

  return (
    <div className="min-h-screen bg-[#f3f0fa] font-sans text-[#240B42] flex items-center justify-center">
      <Navbar />

      <section style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
        <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className="text-4xl font-bold">Your Profile</h1>
          <p className="text-lg text-gray-600">Here is your account information</p>
        </header>

        <div
          className="bg-white rounded-2xl shadow-xl max-w-2xl mx-auto border border-[#e2d7fa] w-[600px]"
          style={{ padding: '2.5rem' }}
        >
          {[
            { label: 'Name', value: authUser?.name },
            { label: 'Email', value: authUser?.email },
            { label: 'Age', value: authUser?.age },
            { label: 'Gender', value: authUser?.gender, capitalize: true },
            { label: 'Weight', value: `${authUser?.bodyweight} kg` },
          ].map((item, index) => (
            <div
              key={index}
              style={{ padding: '0.5rem', marginBottom: '0.5rem' }}
              className="mb-6 p-4 bg-[#f9f7fd] rounded-lg border border-[#ded6f7] hover:shadow-md transition duration-200"
            >
              <h2 className="text-xl font-semibold mb-1">{item.label}:</h2>
              <p className={`text-lg text-gray-700 ${item.capitalize ? 'capitalize' : ''}`}>
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
