import { useSession, signIn, signOut } from 'next-auth/react';

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="bg-gray-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center text-md">
        <h1 className="font-semibold">jtkw</h1>
        <div className="flex items-center gap-4">
          {status === 'loading' ? (
            <p>Loading...</p>
          ) : session ? (
            <>
              <span className="">
                signed in as {session.user?.email}
              </span>
              <button
                onClick={() => signOut()}
                className="bg-red-900 hover:bg-red-400 px-4 py-2 rounded-md text-sm font-medium cursor-pointer"
              >
                sign out
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn()}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
            >
              sign in
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
